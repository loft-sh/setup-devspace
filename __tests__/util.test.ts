import {expect, test} from '@jest/globals'

import {binaryName, isWindows} from '../src/util'

test('isWindows(platform: string)', () => {
  expect(isWindows('win32')).toEqual(true)
  expect(isWindows('darwin')).toEqual(false)
  expect(isWindows('linux')).toEqual(false)
})

test('binaryName(platform: string, name: string)', () => {
  expect(binaryName('win32', 'devspace')).toEqual('devspace.exe')
  expect(binaryName('darwin', 'devspace')).toEqual('devspace')
  expect(binaryName('linux', 'devspace')).toEqual('devspace')
})
