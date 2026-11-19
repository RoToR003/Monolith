import {mkdtempSync, writeFileSync, mkdirSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {resolveBuildApiConfig, publicApiConfiguration, verifyClientApiConfiguration} from '../../scripts/monolith-api-config.mjs';

const fakeId = '1234567';
const fakeHash = 'a'.repeat(32);
const valid = {MONOLITH_API_CREDENTIAL_SOURCE: 'repository-secrets', VITE_API_ID: fakeId, VITE_API_HASH: fakeHash};

describe('Monolith application build configuration', () => {
  test('keeps the default development configuration explicit', () => {
    expect(resolveBuildApiConfig({})).toEqual({source: 'upstream-development'});
    expect(publicApiConfiguration().ownApiCredentialsConfigured).toBe(false);
  });

  test('accepts and trims the app identity without printing it', () => {
    expect(resolveBuildApiConfig({...valid, VITE_API_ID: ` ${fakeId}\n`, VITE_API_HASH: `\n${fakeHash} `}))
    .toEqual({source: 'repository-secrets', apiId: fakeId, apiHash: fakeHash});
  });

  test.each(['', '0', '-1', '1.5', 'NaN', '2147483648', '"1234567"'])('rejects a missing or invalid app ID (%s)', (value) => {
    expect(() => resolveBuildApiConfig({...valid, VITE_API_ID: value})).toThrow(/TELEGRAM_API_ID is missing or malformed/);
  });

  test.each(['', 'abc', 'g'.repeat(32), `"${fakeHash}"`, 'a'.repeat(15) + ' ' + 'a'.repeat(16)])('rejects a missing or invalid application hash', (value) => {
    expect(() => resolveBuildApiConfig({...valid, VITE_API_HASH: value})).toThrow(/TELEGRAM_API_HASH is missing or malformed/);
  });

  test('recognizes explicit local API environment without claiming repository secrets', () => {
    expect(resolveBuildApiConfig({VITE_API_ID: fakeId, VITE_API_HASH: fakeHash}).source).toBe('local-environment');
    expect(publicApiConfiguration('local-environment').ownApiCredentialsConfigured).toBe(true);
  });

  test('never includes supplied values in a validation error', () => {
    const supplied = 'do-not-display-this-value';
    try {
      resolveBuildApiConfig({...valid, VITE_API_HASH: supplied});
      throw new Error('Validation unexpectedly succeeded');
    } catch(error) {
      expect(String(error)).not.toContain(supplied);
      expect(String(error)).not.toContain(fakeId);
    }
  });

  test('does not allow unknown configuration sources', () => {
    expect(() => resolveBuildApiConfig({...valid, MONOLITH_API_CREDENTIAL_SOURCE: 'unknown'})).toThrow(/Unsupported/);
  });

  test('public metadata contains provenance, never the ID/hash', () => {
    const info = publicApiConfiguration('repository-secrets');
    expect(info.apiConfigurationSource).toBe('repository-secrets');
    expect(info.ownApiCredentialsConfigured).toBe(true);
    expect(JSON.stringify(info)).not.toContain(fakeId);
    expect(JSON.stringify(info)).not.toContain(fakeHash);
  });

  test('verifies that the intended app configuration reached a nested bundle', () => {
    const dir = mkdtempSync(join(tmpdir(), 'monolith-api-test-'));
    try {
      mkdirSync(join(dir, 'nested'));
      writeFileSync(join(dir, 'nested', 'worker.js'), `const appHash="${fakeHash}";`);
      expect(verifyClientApiConfiguration(dir, valid)).toEqual({source: 'repository-secrets', ownConfigurationVerified: true});
    } finally { rmSync(dir, {recursive: true, force: true}); }
  });

  test('fails instead of silently publishing a bundle without the intended configuration', () => {
    const dir = mkdtempSync(join(tmpdir(), 'monolith-api-test-'));
    try {
      writeFileSync(join(dir, 'index.js'), 'const noCredentials=true;');
      expect(() => verifyClientApiConfiguration(dir, valid)).toThrow(/does not contain the expected application configuration/);
    } finally { rmSync(dir, {recursive: true, force: true}); }
  });
});
