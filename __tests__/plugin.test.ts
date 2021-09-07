import {describe, expect, test} from '@jest/globals'

import {getAddPluginCommand, LOFT_PLUGIN_URL} from '../src/plugin'

describe('getAddPluginCommand(url: string, version: string)', () => {
  test('with empty url', () => {
    expect(() => getAddPluginCommand('', 'foo')).toThrowError(
      'No plugin url provided'
    )
  })

  test('with invalid url', () => {
    expect(() => getAddPluginCommand('$url', 'foo')).toThrowError(
      'Invalid plugin url provided'
    )
  })

  test('with empty version', () => {
    expect(getAddPluginCommand(LOFT_PLUGIN_URL, '')).toEqual(
      `devspace add plugin ${LOFT_PLUGIN_URL}`
    )
  })

  test('with null version', () => {
    expect(getAddPluginCommand(LOFT_PLUGIN_URL, undefined)).toEqual(
      `devspace add plugin ${LOFT_PLUGIN_URL}`
    )
  })

  test('with version', () => {
    expect(getAddPluginCommand(LOFT_PLUGIN_URL, 'foo')).toEqual(
      `devspace add plugin ${LOFT_PLUGIN_URL} --version foo`
    )
  })
})
