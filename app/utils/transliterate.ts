// Normalizacija teksta za pretragu: ćirilica i latinica (sa dijakriticima)
// se svode na prostu ASCII latinicu, pa "мамографија", "mamografija" i
// "mamografija" kucana bez kvačica daju isti rezultat. Radi i u Workers runtime-u.

const CYR_TO_LAT: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  ђ: 'dj',
  е: 'e',
  ж: 'z',
  з: 'z',
  и: 'i',
  ј: 'j',
  к: 'k',
  л: 'l',
  љ: 'lj',
  м: 'm',
  н: 'n',
  њ: 'nj',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  ћ: 'c',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'c',
  џ: 'dz',
  ш: 's',
}

const LAT_FOLD: Record<string, string> = {
  č: 'c',
  ć: 'c',
  š: 's',
  ž: 'z',
  đ: 'dj',
}

export const normalizeSearch = (input: string): string => {
  let out = ''
  for (const ch of input.toLowerCase()) {
    out += CYR_TO_LAT[ch] ?? LAT_FOLD[ch] ?? ch
  }
  return out
}
