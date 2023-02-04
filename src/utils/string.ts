export function isEnglishLetter(str: string) {
  return str.length === 1 && str.match(/[A-Za-z]/);
}

export function isChineseLetter(str: string) {
  return str.match(/[\u3400-\u9FBF]/);
}

export function caseInsensitiveCompare(strA: string, strB: string) {
  return !isEnglishLetter(strA) && !isChineseLetter(strA)
    ? 1
    : strA.toLowerCase().localeCompare(strB.toLowerCase());
}
