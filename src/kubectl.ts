import * as core from '@actions/core'
import {getExecOutput} from '@actions/exec'
import {which} from '@actions/io'
import {cacheFile, downloadTool, find} from '@actions/tool-cache'
import {chmodSync} from 'fs'
import fetch from 'node-fetch'
import {join} from 'path'

import {
  binaryName,
  getArchitecture,
  getGitVersion,
  getPlatform,
  isWindows
} from './util'

export async function binaryUrl(
  platform: string,
  architecture: string,
  version: string
): Promise<string> {
  let sanitizedArchitecture
  try {
    sanitizedArchitecture = getArchitecture(architecture)
  } catch (error) {
    throw new Error(`Unsupported architecture ${architecture}`)
  }

  let sanitizedPlatform
  try {
    sanitizedPlatform = getPlatform(platform)
  } catch (error) {
    throw new Error(
      `Unsupported operating system ${platform} - kubectl is only released for Darwin, Linux and Windows`
    )
  }

  const sanitizedVerson = getGitVersion(version)

  return `https://dl.k8s.io/release/${sanitizedVerson}/bin/${sanitizedPlatform}/${sanitizedArchitecture}/${binaryName(
    platform,
    'kubectl'
  )}`
}

export async function getLatestVersion(): Promise<string> {
  const response = await fetch(
    'https://storage.googleapis.com/kubernetes-release/release/stable.txt'
  )
  return response.text()
}

async function getInstalledVersion(): Promise<string> {
  try {
    const {stdout} = await getExecOutput(
      `kubectl version --client --output json`
    )
    const {
      clientVersion: {gitVersion}
    } = JSON.parse(stdout)
    return getGitVersion(gitVersion)
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.debug(`determining kubectl version failed: ${error.message}`)
    }
    throw error
  }
}

export async function installKubectl(
  platform: string,
  architecture: string,
  version: string
): Promise<string> {
  const cliName = binaryName(platform, 'kubectl')

  let sanitizedVerson = version
  if (version === 'latest') {
    sanitizedVerson = await getLatestVersion()
  }
  sanitizedVerson = getGitVersion(sanitizedVerson)

  core.info(`Checking for installed kubectl: ${sanitizedVerson}`)
  const existingCliPath = await which(cliName)
  if (existingCliPath !== '') {
    const installedVersion = await getInstalledVersion()
    core.info(`Found installed kubectl: ${installedVersion}`)

    const requestedVersion = getGitVersion(sanitizedVerson)
    if (installedVersion === requestedVersion) {
      return existingCliPath
    }
  }

  core.info(`Checking for cached kubectl: ${sanitizedVerson}`)
  const cachedDir = find(cliName, sanitizedVerson)
  if (cachedDir) {
    core.info(`Found cached kubectl: ${sanitizedVerson}`)
    core.addPath(cachedDir)
    return join(cachedDir, cliName)
  }

  core.info(`Downloading kubectl:`)
  core.info(`- platform:     ${platform}`)
  core.info(`- architecture: ${architecture}`)
  core.info(`- version:      ${sanitizedVerson}`)
  const kubectlUrl = await binaryUrl(platform, architecture, sanitizedVerson)
  const downloadDir = await downloadTool(kubectlUrl)
  const cliDir = await cacheFile(
    downloadDir,
    cliName,
    cliName,
    sanitizedVerson,
    architecture
  )

  const cliPath = join(cliDir, cliName)
  if (!isWindows(platform)) {
    chmodSync(cliPath, 0o555)
  }

  core.info(`Successfully downloaded kubectl: ${sanitizedVerson}`)
  core.addPath(cliDir)
  return join(cliDir, cliName)
}
