// facingMode chooses a direction, NOT a lens. A phone can expose several
// `environment` cameras and satisfy that constraint with a telephoto camera.
// Prefer an enumerated primary / 1x / wide rear camera by exact deviceId.
// Labels and camera indices are vendor hints, not a standard lens identity;
// preserve enumeration order when hints are absent. Never log device IDs.

export type CameraFacing = 'user' | 'environment';

export interface CameraDevice {
  deviceId: string;
  label: string;
  facingMode?: CameraFacing;
}

function normalizedLabel(label: string) {
  return label.normalize('NFKC').toLowerCase().replace(/[_–—‑]/g, ' ');
}

export function describeCamera(device: MediaDeviceInfo): CameraDevice {
  let facingMode: CameraFacing;
  try {
    const modes = (device as InputDeviceInfo).getCapabilities?.().facingMode;
    // A virtual camera exposing both directions is not a known front/rear lens.
    if(modes?.length === 1 && (modes[0] === 'user' || modes[0] === 'environment')) facingMode = modes[0];
  } catch(e) {} // Some browsers expose the method but reject it.
  if(!facingMode) {
    const label = normalizedLabel(device.label || '');
    if(/\b(front|user|facetime)\b|фронтал|передн/.test(label)) facingMode = 'user';
    else if(/\b(back|rear|environment)\b|задн/.test(label)) facingMode = 'environment';
  }
  return {deviceId: device.deviceId, label: device.label || '', facingMode};
}

function primaryLensScore(camera: CameraDevice) {
  const label = normalizedLabel(camera.label);
  // Explicit auxiliary-lens hints take precedence over the word "wide" inside
  // "ultrawide", and over misleading vendor labels containing "main" too.
  if(/tele(photo)?|periscope|ultra\s*wide|super\s*wide|macro|depth|теле|ультра|макро/.test(label) ||
    /(?:^|\s)(?:[2-9](?:[.,]\d+)?|1[.,][1-9])\s*[x×](?:\b|$)/.test(label)) return -100;
  if(/\b(main|primary|standard)\b|основн/.test(label)) return 100;
  if(/(?:^|[^\d.])1(?:[.,]0)?\s*[x×](?:\b|$)/.test(label)) return 90;
  if(/\bwide(?:\s*angle)?\b|ширококут/.test(label)) return 70;
  // Android commonly labels its primary rear lens "camera2 0, facing back".
  // This is a last-resort hint, not a claim about every Android camera HAL.
  if(/\bcamera2\s+0\b|\bcamera\s*[:#]?\s*0\b/.test(label)) return 40;
  return 0;
}

export default function preferredCamera(
  devices: CameraDevice[],
  facing: CameraFacing,
  {currentDeviceId, preferredDeviceId, oppositeDeviceId}: {
    currentDeviceId?: string;
    preferredDeviceId?: string;
    oppositeDeviceId?: string;
  } = {}
): CameraDevice | undefined {
  const available = devices.filter((device) => device.deviceId && device.deviceId !== currentDeviceId &&
    device.deviceId !== oppositeDeviceId && (!device.facingMode || device.facingMode === facing));
  const remembered = available.find((device) => device.deviceId === preferredDeviceId);
  if(remembered) return remembered;
  const known = available.filter((device) => device.facingMode === facing);
  const candidates = known.length ? known : available;
  if(facing === 'user') return candidates[0];
  // Sort a copy; the browser's default-first enumeration order breaks ties.
  return [...candidates].sort((a, b) => primaryLensScore(b) - primaryLensScore(a))[0];
}
