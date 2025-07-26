import { ISeoParams } from '../types'

export function generateSeoString (schema: ISeoParams, { isPretty = false }: { isPretty?: boolean } = {}) {
    const result = []
    if (schema.title) {
        result.push(`<title>${schema.title}</title>`)
    }
    if (schema.multipleAttributesTag?.length) {
        schema.multipleAttributesTag.forEach(({ attributes }) => {
            const metaTag: string[] = ['<meta ']
            attributes.forEach(({ attributeName, attributeValue }) => {
                const metaAttributes = `${attributeName}="${attributeValue}" `
                metaTag.push(metaAttributes)
            })
            metaTag.push(`>`)
            const a = metaTag.join('')
            result.push(a)
        })
    }
    Object.entries(schema).forEach(([key, value]) => {
        if (key !== 'multipleAttributesTag' && typeof value === 'string' && key !== 'title') {
            const metaTag = `<meta ${key}="${value}">`
            result.push(metaTag)
        }
    })
    const separator = isPretty ? '\n' : ''
    return result.join(separator)
}