export function escapeAttributeName(value: string) {
    return value.replace(/([:.])/g, '\\$1')
}