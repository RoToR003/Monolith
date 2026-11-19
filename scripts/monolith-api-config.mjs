// GPL-3.0-only. Added 2026-11-19: validate build configuration without logging it.
import {readFileSync, readdirSync} from 'node:fs';
import {join, resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

export const API_SOURCES = ['upstream-development', 'repository-secrets', 'local-environment'];

export function credentialSource(value = 'upstream-development') {
  if(!API_SOURCES.includes(value)) throw new Error('Unsupported application API configuration source.');
  return value;
}

export function resolveBuildApiConfig(env = process.env) {
  const source = credentialSource(env.MONOLITH_API_CREDENTIAL_SOURCE ||
    (env.VITE_API_ID || env.VITE_API_HASH ? 'local-environment' : 'upstream-development'));
  if(source === 'upstream-development') return {source};
  const apiId = String(env.VITE_API_ID || '').trim();
  const apiHash = String(env.VITE_API_HASH || '').trim();
  const number = Number(apiId);
  if(!/^[1-9][0-9]*$/.test(apiId) || !Number.isSafeInteger(number) || number > 2147483647) {
    throw new Error('TELEGRAM_API_ID is missing or malformed. Save only the positive numeric app ID in the repository secret.');
  }
  if(!/^[a-fA-F0-9]{32}$/.test(apiHash)) {
    throw new Error('TELEGRAM_API_HASH is missing or malformed. Save only the 32-character application hash in the repository secret.');
  }
  return {source, apiId, apiHash};
}

export function publicApiConfiguration(source = 'upstream-development') {
  source = credentialSource(source);
  return {
    apiConfigurationSource: source,
    ownApiCredentialsConfigured: source !== 'upstream-development',
    credentials: source === 'repository-secrets' ?
      'Project application API configuration supplied by repository secrets at build time; no user session included.' :
      source === 'local-environment' ? 'Application API configuration supplied by local build environment; no user session included.' :
      'Public upstream development API defaults; no personal session included.'
  };
}

export function verifyClientApiConfiguration(directory, env = process.env) {
  const configuration = resolveBuildApiConfig(env);
  if(configuration.source === 'upstream-development') {
    return {source: configuration.source, ownConfigurationVerified: false};
  }
  let found = false;
  function scan(dir) {
    for(const entry of readdirSync(dir, {withFileTypes: true})) {
      if(entry.isSymbolicLink()) throw new Error('Unexpected symlink in the client build.');
      const file = join(dir, entry.name);
      if(entry.isDirectory()) scan(file);
      else if(entry.name.endsWith('.js') && readFileSync(file, 'utf8').includes(configuration.apiHash)) found = true;
    }
  }
  scan(resolve(directory));
  if(!found) throw new Error('The client bundle does not contain the expected application configuration. Nothing will be deployed.');
  return {source: configuration.source, ownConfigurationVerified: true};
}

if(process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const command = process.argv[2] || 'validate';
    if(command === 'validate') {
      const {source} = resolveBuildApiConfig();
      console.log(source !== 'upstream-development' ?
        'Application API secrets are present and have the expected format. Values are not printed.' :
        'Using upstream development API configuration; this is not an own-API release.');
    } else if(command === 'verify-bundle' && process.argv[3]) {
      console.log(JSON.stringify(verifyClientApiConfiguration(process.argv[3]), null, 2));
    } else {
      throw new Error('Usage: node scripts/monolith-api-config.mjs [validate|verify-bundle DIRECTORY]');
    }
  } catch(error) {
    // Validation errors never interpolate credential values or environment objects.
    console.error(error.message);
    process.exitCode = 1;
  }
}
