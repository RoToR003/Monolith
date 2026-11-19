// GPL-3.0-only. Synthetic recorder checks only: no Telegram connection, account,
// credentials, real microphone/camera input, saved storage, or QR screenshots.
// Run with Node 24 after: pnpm exec playwright install --with-deps chromium
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const esbuild = require('esbuild');
const {chromium} = require('@playwright/test');

const root = path.resolve(__dirname, '..');
const output = path.resolve(root, '.cache/monolith-media-smoke');

async function bundle() {
  const entry = `
    import NativeVoiceRecorder from './src/helpers/voiceRecorder/nativeVoiceRecorder';
    import NativeVideoRecorder from './src/helpers/videoRecorder/nativeVideoRecorder';
    import OggOpusWriter from './src/helpers/voiceRecorder/oggOpusWriter';
    import {mediaPlaybackTime} from './src/helpers/mediaPlaybackTime';
    import finalizeRoundVideo from './src/components/chat/bubbleParts/finalizeRoundVideo';
    window.MediaLab = {NativeVoiceRecorder, NativeVideoRecorder, OggOpusWriter, mediaPlaybackTime, finalizeRoundVideo};
  `;
  const result = await esbuild.build({
    stdin: {contents: entry, resolveDir: root, loader: 'ts'},
    bundle: true, write: false, format: 'esm', target: 'es2022',
    plugins: [{name: 'no-telegram-test-boundary', setup(build) {
      build.onResolve({filter: /^@lib\/calls\/helpers\/getStream$/}, () => ({path: 'getStream', namespace: 'synthetic'}));
      build.onResolve({filter: /^@lib\/calls\/helpers\/acquireStream$/}, () => ({path: 'acquireStream', namespace: 'synthetic'}));
      build.onResolve({filter: /^@environment\/userAgent$/}, () => ({path: 'userAgent', namespace: 'synthetic'}));
      build.onLoad({filter: /.*/, namespace: 'synthetic'}, (args) => ({loader: 'js', contents:
        args.path === 'getStream' ? 'export default c => navigator.mediaDevices.getUserMedia(c);' :
          args.path === 'userAgent' ? 'export const IS_APPLE_MOBILE=false, IS_SAFARI=false;' :
            `export default function(c) {
              let disposed=false,stream;
              const promise=navigator.mediaDevices.getUserMedia(c).then(s=>{
                stream=s;if(disposed){s.getTracks().forEach(t=>t.stop());return;}return s;
              });
              return {promise,dispose(){disposed=true;stream?.getTracks().forEach(t=>t.stop());}};
            }`
      }));
    }}]
  });
  return result.outputFiles[0].contents;
}

(async() => {
  const code = await bundle();
  const server = http.createServer((request, response) => {
    if(request.url === '/lab.js') {
      response.setHeader('Content-Type', 'application/javascript');response.end(code);
    } else if(request.url === '/') {
      response.setHeader('Content-Type', 'text/html; charset=utf-8');
      response.end('<!doctype html><title>Synthetic media tests — no account</title><script type="module" src="/lab.js"></script>');
    } else {response.statusCode = 404;response.end();}
  });
  await new Promise((resolve) => server.listen(0, '0.0.0.0', resolve));
  let browser;
  try {
    browser = await chromium.launch({headless: true, args: [
      '--no-sandbox', '--disable-dev-shm-usage', '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'
    ]});
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.waitForFunction(() => !!window.MediaLab);
    const binding = await page.evaluate(() => {
      const element = document.createElement('div');
      element.message = {mid: -1};element.dataset.isOutgoing = '1';
      const sent = {mid: 27, peerId: 'synthetic', media: {document: {id: 999}}};
      let actual;
      element.onLoad = () => actual = element.message;
      window.MediaLab.finalizeRoundVideo(element, sent);
      const times = [NaN, Infinity, -Infinity, 0].map((duration) => window.MediaLab.mediaPlaybackTime({duration, currentTime: 2}, 8));
      return {finalIdentityUsed: actual === sent, finalMid: element.dataset.mid, outgoingCleared: !element.dataset.isOutgoing, times};
    });
    assert.equal(binding.finalIdentityUsed, true);
    assert.equal(binding.outgoingCleared, true);
    assert.equal(binding.finalMid, '27');
    assert.ok(binding.times.every((time) => time.duration === 8 && time.remaining === 6 && time.progress === 0.25));

    const audio = await page.evaluate(async() => {
      const {NativeVoiceRecorder, OggOpusWriter} = window.MediaLab;
      const rate = 48000, frames = 2048, length = frames * 120;
      const original = Float32Array.from({length}, (_, i) => {
        const t = i / rate;
        return .24 * Math.sin(2 * Math.PI * (300 * t + 85 * t * t)) + .08 * Math.sin(2 * Math.PI * 1811 * t);
      });
      const recorder = new NativeVoiceRecorder();recorder.state = 'recording';
      recorder.writer = new OggOpusWriter({channels: 1, inputSampleRate: rate});
      let packets = 0;
      recorder.encoder = new AudioEncoder({output: (chunk, metadata) => {
        packets++;recorder.onEncoderChunk(chunk, metadata);
      }, error: (error) => {throw error;}});
      recorder.encoder.configure({codec: 'opus', sampleRate: rate, numberOfChannels: 1, bitrate: 32000});
      for(let i = 0; i < length; i += frames) recorder.onWorkletMessage(original.slice(i, i + frames));
      await recorder.encoder.flush();recorder.encoder.close();
      const ogg = recorder.writer.finalize();
      const context = new AudioContext({sampleRate: rate});
      const decoded = await context.decodeAudioData(ogg.buffer.slice(0));
      const pcm = decoded.getChannelData(0);
      let correlation = -1, bestLag = 0;
      for(let lag = -800; lag <= 800; lag++) {
        let dot = 0, a2 = 0, b2 = 0;
        for(let i = 2000; i < Math.min(length, pcm.length) - 2000; i += 7) {
          const a = original[i], b = pcm[i + lag] || 0;
          dot += a * b;a2 += a * a;b2 += b * b;
        }
        const value = dot / Math.sqrt(a2 * b2);
        if(value > correlation) {correlation = value;bestLag = lag;}
      }
      let signal = 0, error = 0;
      for(let i = 2000; i < Math.min(length, pcm.length) - 2000; i++) {
        signal += original[i] ** 2;error += (original[i] - (pcm[i + bestLag] || 0)) ** 2;
      }
      await context.close();
      return {sourceDuration: length / rate, decodedDuration: decoded.duration, packets, bytes: ogg.length, correlation, snrDb: 10 * Math.log10(signal / error)};
    });
    assert.ok(audio.correlation > 0.94 && audio.snrDb > 10, 'Synthetic PCM must survive Opus/OGG encode/decode without strong distortion');
    assert.ok(Math.abs(audio.sourceDuration - audio.decodedDuration) < 0.05);

    const video = await page.evaluate(async() => {
      const acquire = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      const cameraRequests = [];
      navigator.mediaDevices.getUserMedia = async(constraints) => {
        if(constraints.audio === false && constraints.video?.facingMode?.exact) {
          const facingMode = constraints.video.facingMode.exact;cameraRequests.push(facingMode);
          const stream = await acquire({video: {width: 400, height: 400}, audio: false});
          const track = stream.getVideoTracks()[0], settings = track.getSettings.bind(track);
          track.getSettings = () => ({...settings(), facingMode});return stream;
        }
        return acquire(constraints);
      };
      const recorder = new window.MediaLab.NativeVideoRecorder();let emitted = 0;
      const blobPromise = new Promise((resolve) => recorder.ondataavailable = (blob) => {emitted++;resolve(blob);});
      await recorder.start();
      const mic = recorder.stream.getAudioTracks()[0], id = mic.id;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const rear = await recorder.switchCamera(), rearMode = recorder.facingMode;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const front = await recorder.switchCamera(), frontMode = recorder.facingMode;
      await new Promise((resolve) => setTimeout(resolve, 500));
      const micPreserved = recorder.stream.getAudioTracks()[0].id === id && mic.readyState === 'live';
      recorder.stop();const blob = await blobPromise;recorder.releaseStream();
      const element = document.createElement('video');element.muted = true;element.playsInline = true;
      document.body.append(element);element.src = URL.createObjectURL(blob);
      await element.play();await new Promise((resolve) => setTimeout(resolve, 500));
      const result = {rear, front, rearMode, frontMode, cameraRequests, micPreserved, emitted, type: blob.type, bytes: blob.size, duration: element.duration, currentTime: element.currentTime, width: element.videoWidth, height: element.videoHeight, playing: !element.paused, microphoneReleased: mic.readyState === 'ended'};
      element.pause();URL.revokeObjectURL(element.src);return result;
    });
    assert.equal(video.rear && video.front && video.micPreserved && video.microphoneReleased, true);
    assert.deepEqual(video.cameraRequests, ['environment', 'user']);
    assert.equal(video.emitted, 1);
    assert.ok(Number.isFinite(video.duration) && video.duration > 1.3 && video.currentTime > 0 && video.playing);
    assert.equal(video.width, 400);assert.equal(video.height, 400);
    assert.deepEqual(errors, []);
    const report = {
      testedAt: new Date().toISOString(), authenticated: false,
      scope: 'Desktop Chromium; synthetic PCM and fake camera/mic. Camera facing modes simulated. No real Android capture or signed-in chat test.',
      binding, audio, video, errors,
      limitations: ['Passing synthetic audio does NOT reproduce or resolve the owner-reported OnePlus voice recording corruption.']
    };
    fs.mkdirSync(output, {recursive: true});
    fs.writeFileSync(path.join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report, null, 2));
  } finally {
    if(browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => {console.error(error);process.exitCode = 1;});
