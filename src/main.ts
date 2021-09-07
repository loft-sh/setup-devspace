import * as core from '@actions/core'
import * as os from 'os'

import {installDevspace} from './install'
import {installPlugin, LOFT_PLUGIN_URL} from './plugin'

async function run(): Promise<void> {
  try {
    core.startGroup('Install DevSpace CLI')
    const version: string = core.getInput('version') || 'latest'
    const runnerPlatform: string = os.platform()
    const architecture: string = os.arch()
    await installDevspace(runnerPlatform, architecture, version)
  } catch (error) {
    core.setFailed(error.message)
  } finally {
    core.endGroup()
  }

  const loftPluginEnabled = core.getBooleanInput('loft-plugin-enabled') || false
  if (loftPluginEnabled) {
    try {
      core.startGroup('Install DevSpace Loft Plugin')
      const loftPluginVersion = core.getInput('loft-plugin-version')
      await installPlugin(LOFT_PLUGIN_URL, loftPluginVersion)
    } catch (error) {
      core.setFailed(error.message)
    } finally {
      core.endGroup()
    }
  }
}

run()
