import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'

const platformUrlMapping: {[key: string]: string} = {
  linux: 'linux',
  darwin: 'darwin',
  win32: 'windows'
}

const architectureMapping: {[key: string]: string} = {
  amd64: 'amd64',
  arm64: 'arm64',
  x64: 'amd64'
}

export function isWindows(platform: string): boolean {
  return platform.startsWith('win')
}

export function binaryName(platform: string): string {
  return isWindows(platform) ? 'devspace.exe' : 'devspace'
}

export async function binaryUrl(
  platform: string,
  architecture: string,
  version: string
): Promise<string> {
  if (!(platform in platformUrlMapping)) {
    throw new Error(
      `Unsupported operating system ${platform} - DevSpace is only released for Darwin, Linux and Windows`
    )
  }

  if (!(architecture in architectureMapping)) {
    throw new Error(`Unsupported architecture ${platform}`)
  }

  let sanitizedVerson = version
  if (version === 'latest') {
    sanitizedVerson = await getLatestVersion()
  }

  if (!sanitizedVerson.startsWith('v')) {
    sanitizedVerson = `v${sanitizedVerson}`
  }

  const sanitizedArchitecture = architectureMapping[architecture]
  const sanitizedPlatform = platformUrlMapping[platform]
  const binaryExt = isWindows(platform) ? '.exe' : ''
  return `https://github.com/loft-sh/devspace/releases/download/${sanitizedVerson}/devspace-${sanitizedPlatform}-${sanitizedArchitecture}${binaryExt}`
}

export async function getLatestVersion(): Promise<string> {
  const response = await fetch(
    'https://github.com/loft-sh/devspace/releases/latest',
    {
      redirect: 'manual'
    }
  )
  const redirectUrl = response.headers.get('location')
  if (redirectUrl == null) {
    throw new Error('Error fetching latest version')
  }

  const matches = /\/tag\/(.*)$/.exec(redirectUrl)
  if (!matches || matches?.length !== 2) {
    throw new Error('Error fetching latest version')
  }

  const latestVersion = matches[1].replace('v', '')
  return latestVersion
}

export async function installDevspace(
  platform: string,
  architecture: string,
  version: string
): Promise<string> {
  const cliName = binaryName(platform)

  core.info(`Checking for cached devspace: ${version}`)
  const cachedDir = tc.find(cliName, version)
  if (cachedDir) {
    core.info(`Cached devspace found: ${version}`)
    core.addPath(cachedDir)
    return path.join(cachedDir, cliName)
  }

  core.info(`Downloading devspace:`)
  core.info(`- platform:     ${platform}`)
  core.info(`- architecture: ${architecture}`)
  core.info(`- version:      ${version}`)
  const devspaceUrl = await binaryUrl(platform, architecture, version)
  const downloadDir = await tc.downloadTool(devspaceUrl)
  const cliDir = await tc.cacheFile(
    downloadDir,
    cliName,
    cliName,
    version,
    architecture
  )

  const cliPath = path.join(cliDir, cliName)
  if (!isWindows(platform)) {
    fs.chmodSync(cliPath, 0o555)
  }

  core.info(`Successfully downloaded devspace: ${version}`)
  core.addPath(cliDir)
  return path.join(cliDir, cliName)
}
