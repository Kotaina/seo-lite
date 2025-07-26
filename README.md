# SEO-lite

## ⚡️ Tiny SEO helper for vanilla JS + SSR

SEO-lite is a **dependency-free helper** for managing SEO tags both on the client and server side.

## ✨  Features
- 🧑‍💻 **Client:** Set `<title>` and `<meta>` tags directly in the DOM
- 🖥 **Server:** Generate SEO tag strings for SSR/templates
- 🌲 Treeshaking: Import only what you need—client or server
- ⚡️ Zero dependencies: Lightweight and portable
- 🟦 TypeScript support: Full typings and autocompletion
- 🏷️ Open Graph autocomplete: Common OG meta attributes included

## 🚀 Getting Started

### 1. Install

```bash
npm install seo-lite
# or
yarn add seo-lite
```
### 2. Import
**Client-side**
```javascript
import { setSeo, cleanUp } from 'seo-lite/client'
```

**Server side**

```javascript
import { generateSeoString } from 'seo-lite/server'
```

**Universal**
```javascript
import { setSeo, cleanUp, generateSeoString } from 'seo-lite'
```

**CommonJS:**
```javascript
const { generateSeoString } = require('seo-lite/server')
```

### 3. API Overview
All functions use a shared schema for SEO tags:

**Schema:**
```javascript
{
    title: string,
    "og:description": string,
    customMetaTagName: string,
    multipleAttributesTag: [
      {
        attributes: [
          {
            attributeName: string,
            attributeValue: string,
          },
          {
            attributeName: string,
            attributeValue: string,
          }
        ]
      }
    ]
  }
```

Here is:\
```title``` - Page title\
```og:description``` - Open Graph or any custom meta name\
```customMetaTagName``` - Any custom meta tag\
```multipleAttributesTag```  - Array of meta tags, each with any attributes

**Example for multiple meta attributes:**
``` javascript
multipleAttributesTag: [
      {
        attributes: [ // array of tag attributes
          {
            attributeName: 'attribute_name_1', // tag name
            attributeValue: 'attribute value', // tag value
          },
          {
            attributeName: 'attribute_name_2',
            attributeValue: 'attribute value',
          }
        ]
```

### Provided Functions
- **cleanUp()** \
```cleanUp(schema)```\
Removes tags matching the schema from the DOM.\
- **setSeo()**\
```setSeo(schema, { isAutoClean: boolean })```\
Sets SEO tags in the DOM. If isAutoClean is true (by default), previous tags described in schema are removed via cleanUp().\
- **generateSeoString()**\
```generateSeoString(schema, { isPretty: boolean })```\
Generates a string of HTML tags for SSR use.\
When isPretty is true (by default), tags are separated by newlines (\n).
