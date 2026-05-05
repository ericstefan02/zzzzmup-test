export const formatDateSerbian = (
  dateString: string,
  locale: string = 'sr-Latn',
) => {
  const date = new Date(dateString)
  const bcp47 = locale === 'sr-Cyrl' ? 'sr-Cyrl-RS' : 'sr-Latn-RS'
  return date.toLocaleDateString(bcp47, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
