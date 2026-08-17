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

// Prava (prikazna) transliteracija ćirilica → latinica, sa dijakriticima.
// Srpska latinica je 1:1 preslikavanje, pa sadržaj koji stigne ćirilicom
// (statički moduli sad, API kasnije za ne-API delove) ne mora da se unosi duplo.
const CYR_TO_LAT_DISPLAY: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  ђ: 'đ',
  е: 'e',
  ж: 'ž',
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
  ћ: 'ć',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'č',
  џ: 'dž',
  ш: 'š',
}

export const toLatin = (input: string): string => {
  let out = ''
  for (const ch of input) {
    const lower = ch.toLowerCase()
    const rep = CYR_TO_LAT_DISPLAY[lower]
    if (rep === undefined) {
      out += ch
      continue
    }
    // Veliko slovo: Љ → Lj (digraf se ne kapitalizuje ceo)
    out += ch === lower ? rep : rep[0]!.toUpperCase() + rep.slice(1)
  }
  return out
}
