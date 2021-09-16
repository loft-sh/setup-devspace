export function isWindows(platform: string): boolean {
  return platform.startsWith('win')
}

export function binaryName(platform: string, name: string): string {
  return isWindows(platform) ? `${name}.exe` : name
}

const platformUrlMapping: {[key: string]: string} = {
  linux: 'linux',
  darwin: 'darwin',
  win32: 'windows'
}

export function getPlatform(platform: string): string {
  if (!(platform in platformUrlMapping)) {
    throw new Error(`platform ${platform} is not supported`)
  }
  return platformUrlMapping[platform]
}

const architectureMapping: {[key: string]: string} = {
  amd64: 'amd64',
  arm64: 'arm64',
  x64: 'amd64'
}

export function getArchitecture(architecture: string): string {
  if (!(architecture in architectureMapping)) {
    throw new Error(`architecture ${architecture} is not supported`)
  }
  return architectureMapping[architecture]
}

export function getGitVersion(version: string): string {
  if (!version.startsWith('v')) {
    return `v${version}`
  }
  return version
}
