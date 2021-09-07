import * as core from '@actions/core'
import {exec} from '@actions/exec'
import {URL} from 'url'

export const LOFT_PLUGIN_URL = 'https://github.com/loft-sh/devspace-plugin-loft'

export function getAddPluginCommand(url: string, version = ''): string {
  if (url === '') {
    throw new Error('No plugin url provided')
  }

  try {
    new URL(url)
  } catch (error) {
    throw new Error('Invalid plugin url provided')
  }

  return version !== ''
    ? `devspace add plugin ${url} --version ${version}`
    : `devspace add plugin ${url}`
}

export async function installPlugin(
  url: string,
  version?: string
): Promise<void> {
  try {
    await exec(getAddPluginCommand(url, version))
  } catch (error) {
    core.debug(`Add plugin command failed:
- command:  ${error.cmd}
- exitCode: ${error.code}
- stdout:   ${error.stdout}
- stderr:   ${error.stderr}
`)
    throw error
  }
}
