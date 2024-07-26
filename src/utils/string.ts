

export const hasSameChar = (text: string) => {
  for ( let i = 0; i <= text.length; i++) {
    const char = text[i];
    if (text.substring(i+1).includes(char)) {
      return true;
    }
  }
  return false;
}