import { escapeAttributeName } from '../utils'
import { ISeoParams } from '../types'


function setSeoTags(tagName: string, tagValue: string) {
    let element = document.createElement(tagName)
    element.textContent = tagValue
    document.head.appendChild(element)
}

function setMetaTag(params: { attributeName: string, attributeValue: string }[]) {
    let element = document.createElement('meta')
    params.forEach(({ attributeName, attributeValue }) => {
        element.setAttribute(attributeName, attributeValue)
    })
    document.head.appendChild(element)
}

export function setSeo (schema: ISeoParams, { isAutoClean = true }: { isAutoClean?: boolean } = {}) {
    if (isAutoClean) {
        cleanUp(schema)
    }
    if (schema.title) {
        setSeoTags('title', schema.title)
    }
    if (schema.multipleAttributesTag?.length) {
        schema.multipleAttributesTag.forEach(({ attributes }) => setMetaTag(attributes))
    }
    Object.entries(schema).forEach(([key, value]) => {
        if (key !== 'multipleAttributesTag' && typeof value === 'string' && key !== 'title') {
            setMetaTag([{
                attributeName: key,
                attributeValue: value
            }])
        }
    })
}

export function cleanUp (schema: ISeoParams) {
    const result = {...schema}
    let elementsToClear = []
    if (result.title) {
        const elements = [...document.getElementsByTagName('title')]
        elementsToClear.push(...elements)
        delete result.title
    }
    if (result.multipleAttributesTag?.length) {
        result.multipleAttributesTag.forEach(({ attributes }) => {
            const query = attributes.reduce((acc, tag) => {
                const formattedKey = escapeAttributeName(tag.attributeName)
                acc = acc + '[' +formattedKey + '="' + tag.attributeValue + '"]'
                return acc
            }, 'meta')
            const elements = document.querySelectorAll(query)
            elementsToClear.push(...elements)
        })
        delete result.multipleAttributesTag
    }
    const otherKeys = Object.entries(result)
    if (otherKeys.length) {
        otherKeys.forEach(([ key, value ]) => {
            const formattedKey = escapeAttributeName(key)
            const query = 'meta[' + formattedKey + '="' + value + '"]'
            const elements = [...document.querySelectorAll(query)]
            elementsToClear.push(...elements)
            delete result[key]
        })
    }
    elementsToClear.forEach((element) => element.remove())
    elementsToClear = []
}
