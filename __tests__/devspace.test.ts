import {expect, test} from '@jest/globals'

import {binaryUrl} from '../src/devspace'

test('binaryUrl(platform: string, architecture: string, version: string)', async () => {
  await expect(binaryUrl('darwin', 'arm64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-darwin-arm64'
  )
  await expect(binaryUrl('darwin', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-darwin-amd64'
  )
  await expect(binaryUrl('darwin', 'x64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-darwin-amd64'
  )
  await expect(binaryUrl('darwin', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-darwin-amd64'
  )
  await expect(binaryUrl('darwin', 'amd64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-darwin-amd64'
  )

  await expect(binaryUrl('linux', 'arm64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-linux-arm64'
  )
  await expect(binaryUrl('linux', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-linux-amd64'
  )
  await expect(binaryUrl('linux', 'x64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-linux-amd64'
  )
  await expect(binaryUrl('linux', 'amd64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-linux-amd64'
  )

  await expect(binaryUrl('win32', 'amd64', '5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-windows-amd64.exe'
  )
  await expect(binaryUrl('win32', 'amd64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-windows-amd64.exe'
  )
  await expect(binaryUrl('win32', 'x64', 'v5.14.4')).resolves.toEqual(
    'https://github.com/loft-sh/devspace/releases/download/v5.14.4/devspace-windows-amd64.exe'
  )
})
