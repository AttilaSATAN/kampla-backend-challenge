export function isValidDateTimeString(dateString: string) {
    return !isNaN(Date.parse(dateString))
}
