import * as core from '@actions/core'
import * as os from 'os'

import {installDevspace} from './install'

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
}

run()
