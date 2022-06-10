import * as core from '@actions/core'
import * as os from 'os'

import {installDevspace} from './devspace'
import {installKubectl} from './kubectl'

async function run(): Promise<void> {
  const runnerPlatform: string = os.platform()
  const architecture: string = os.arch()

  try {
    core.startGroup('Install DevSpace CLI')
    const version: string = core.getInput('version') || 'latest'
    await installDevspace(runnerPlatform, architecture, version)
  } catch (error: unknown) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  } finally {
    core.endGroup()
  }

  const kubectlInstallEnabled = core.getBooleanInput('kubectl-install') != false
  if (kubectlInstallEnabled) {
    try {
      core.startGroup('Install kubectl')
      const kubectlVersion = core.getInput('kubectl-version') || 'latest'
      await installKubectl(runnerPlatform, architecture, kubectlVersion)
    } catch (error: unknown) {
      if (error instanceof Error) {
        core.setFailed(error.message)
      }
    } finally {
      core.endGroup()
    }
  }
}

run()
