'use strict'
import { merge as _extend } from 'lodash'

export const stringify = (object) => { return JSON.stringify(object) }

export const parseJSON = (object) => { return JSON.parse(object) }

export const clone = (object) => { return parseJSON(stringify(object)) }

export const extend = (source, destination) => { return _extend(source, destination) }

export const replacePlaceholderValues = (placeholder, values, regex, limit) => {
  if (!placeholder) return ''

  if (typeof placeholder !== 'string') throw new TypeError('invalid placeholder or placeholder is not an string', placeholder)
  // eslint-disable-next-line no-useless-escape
  if (regex && !(regex instanceof RegExp)) throw new TypeError('invalid regex: the regex is not a properly formatted regular expression i.e. /{\d}/g ', regex)
  values = values instanceof Array ? values : [values]
  regex = regex || /{\d}|{\d,\d}|{\d,\d-\d}/g

  // trim the placeholder to size base on the array of values length
  let index = -1
  const count = values.length
  const tag = `{${count - 1}}` // placeholder tags start at index 0
  const nextTag = `{${count}}` // detect if next tag exists
  const tagExistsInPlaceholder = placeholder.indexOf(tag) > -1
  const nextTagExistsInPlaceholder = placeholder.indexOf(nextTag) > -1
  const trimToIndex = placeholder.indexOf(tag) + tag.length
  placeholder = (limit) ? placeholder.substring(0, (tagExistsInPlaceholder && nextTagExistsInPlaceholder) ? trimToIndex : placeholder.length) : placeholder

  // insert values in placeholder tags
  let result = placeholder.replace(regex, (match) => {
    // introducing index based string manipulation (damn you Tommmmmmmmm)
    const substring = match.substring(1, match.length - 1).split(',') // [..., x-y]
    const substringStartIndex = (substring.length === 1) ? 0 : substring[1].split('-')[0] // check substring values
    const substringLength = (substring.length === 1) ? undefined : substring[1].split('-')[1] // declare substring length
    const manipulated = (++index < count) ? (values[index] !== undefined ? values[index].toString().substring(substringStartIndex, substringLength) : null) : match
    return manipulated
  })

  return result
}

export const replaceObjectValues = (model, values, regex) => {
  if (!model) return {}

  if (typeof model !== 'object' && model.constructor === Object) throw new TypeError('invalid model or model is not an object', model)
  // eslint-disable-next-line no-useless-escape
  if (regex && !(regex instanceof RegExp)) throw new TypeError('invalid regex: the regex is not a properly formatted regular expression i.e. /{\d}/g ', regex)
  values = values instanceof Array ? values : [values]
  regex = regex || /"{\d}"/g

  let index = -1
  let stringified = stringify(model)
  let result = stringified.replace(regex, (match) => { return (index++ < values.length) ? stringify(values[index]) : match })

  return parseJSON(result)
}

export const urlParams = (url, keys = []) => {
  if (!url || typeof url !== 'string') throw new TypeError('invalid url', url)
  if (!(keys instanceof Array)) keys = [keys] // ensure keys is an array
  if (keys.length) keys = keys.map((index, item) => { return item.toString().toLowerCase() }) // lowercase all keys

  const startIndex = url.indexOf('?')
  let params = url.substring(startIndex + 1)
  let kvps = params.split('&')
  let result = {}

  // nothing found
  if (!kvps.length) return result

  // pacakage params
  for (var i = 0; i < kvps.length; i++) {
    const kvp = kvps[i].split('=')
    const key = kvp[0].toLowerCase()
    const value = kvp[1]

    if (!keys.length || keys.indexOf(key) > -1) result[key] = value
  }

  // return result
  return result
}

export default { stringify, parseJSON, clone, extend, replacePlaceholderValues, replaceObjectValues, urlParams }
