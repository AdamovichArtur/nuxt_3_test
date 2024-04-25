export function replaceTokensInString(str: string, tokens: Record<string, string>): string {
  return Object.entries(tokens).reduce((result, [key, value]) => result.replace(`{${key}}`, value), str);
}