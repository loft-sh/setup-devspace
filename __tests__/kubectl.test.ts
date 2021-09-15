import {expect, test} from '@jest/globals'

import {binaryUrl} from '../src/kubectl'

test('binaryUrl(platform: string, architecture: string, version: string)', async () => {
  await expect(binaryUrl('darwin', 'arm64', '1.23.0-alpha.2')).resolves.toEqual(
    'https://dl.k8s.io/release/v1.23.0-alpha.2/bin/darwin/arm64/kubectl'
  )
  await expect(binaryUrl('darwin', 'amd64', '1.23.0-alpha.2')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.23.0-alpha.2/bin/darwin/amd64/kubectl`
  )
  await expect(binaryUrl('darwin', 'x64', 'v1.23.0-alpha.2')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.23.0-alpha.2/bin/darwin/amd64/kubectl`
  )
  await expect(binaryUrl('darwin', 'amd64', '1.23.0-alpha.2')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.23.0-alpha.2/bin/darwin/amd64/kubectl`
  )
  await expect(
    binaryUrl('darwin', 'amd64', 'v1.23.0-alpha.2')
  ).resolves.toEqual(
    `https://dl.k8s.io/release/v1.23.0-alpha.2/bin/darwin/amd64/kubectl`
  )

  await expect(binaryUrl('linux', 'arm64', '1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/linux/arm64/kubectl`
  )
  await expect(binaryUrl('linux', 'amd64', '1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/linux/amd64/kubectl`
  )
  await expect(binaryUrl('linux', 'x64', '1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/linux/amd64/kubectl`
  )
  await expect(binaryUrl('linux', 'amd64', 'v1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/linux/amd64/kubectl`
  )

  await expect(binaryUrl('win32', 'amd64', '1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/windows/amd64/kubectl.exe`
  )
  await expect(binaryUrl('win32', 'amd64', 'v1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/windows/amd64/kubectl.exe`
  )
  await expect(binaryUrl('win32', 'x64', 'v1.21.0')).resolves.toEqual(
    `https://dl.k8s.io/release/v1.21.0/bin/windows/amd64/kubectl.exe`
  )
})
