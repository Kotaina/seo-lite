export type openGraphAttribute =
    'og:title'
    | 'og:description'
    | 'og:type'
    | 'og:image'
    | 'og:url'
    | 'og:site_name'
    | 'og:determiner'
    | 'og:locale'
    | 'og:locale:alternate'
    | 'og:audio'
    | 'og:audio:title'
    | 'og:audio:artist'
    | 'og:audio:album'
    | 'og:audio:type'
    | 'og:video'
    | 'og:video:url'
    | 'og:video:secure_url'
    | 'og:video:type'
    | 'og:video:width'
    | 'og:video:height'
    | 'og:image:url'
    | 'og:image:secure_url'
    | 'og:image:type'
    | 'og:image:width'
    | 'og:image:height'
    | 'og:image:alt'

type OgMetaMapped = {
    [K in openGraphAttribute]?: string
}

export interface MetaTag {
    attributes: {
        attributeName: string
        attributeValue: string
    }[]
}

interface IDefaultSeoTags extends OgMetaMapped {
    title?: string
    multipleAttributesTag?: MetaTag[]
}

export interface ISeoParams extends IDefaultSeoTags {
    [key: string]: string | MetaTag[] | undefined
}