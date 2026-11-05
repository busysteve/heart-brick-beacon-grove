export type TokenKind = "plain" | "key" | "str" | "com" | "num" | "pre";

export type Token = { text: string; kind: TokenKind };

const KEYWORDS = new Set([
  "alignas", "alignof", "and", "and_eq", "asm", "auto", "bitand", "bitor", "bool", "break",
  "case", "catch", "char", "char8_t", "char16_t", "char32_t", "class", "compl", "concept",
  "const", "consteval", "constexpr", "constinit", "const_cast", "continue", "co_await",
  "co_return", "co_yield", "decltype", "default", "delete", "do", "double", "dynamic_cast",
  "else", "enum", "explicit", "export", "extern", "false", "float", "for", "friend", "goto",
  "if", "inline", "int", "long", "mutable", "namespace", "new", "noexcept", "not", "not_eq",
  "nullptr", "operator", "or", "or_eq", "private", "protected", "public", "register",
  "reinterpret_cast", "requires", "return", "short", "signed", "sizeof", "static",
  "static_assert", "static_cast", "struct", "switch", "template", "this", "thread_local",
  "throw", "true", "try", "typedef", "typeid", "typename", "union", "unsigned", "using",
  "virtual", "void", "volatile", "wchar_t", "while", "override", "final",
]);

function isIdentStart(ch: string) {
  return /[A-Za-z_]/.test(ch);
}

function isDigit(ch: string) {
  return ch >= "0" && ch <= "9";
}

function tokenize(source: string): Token[] {
  const out: Token[] = [];
  const n = source.length;
  let i = 0;
  while (i < n) {
    const ch = source[i];
    if (ch === "/" && source[i + 1] === "/") {
      let j = i + 2;
      while (j < n && source[j] !== "\n") j += 1;
      out.push({ text: source.slice(i, j), kind: "com" });
      i = j;
      continue;
    }
    if (ch === "/" && source[i + 1] === "*") {
      const close = source.indexOf("*/", i + 2);
      const j = close < 0 ? n : close + 2;
      out.push({ text: source.slice(i, j), kind: "com" });
      i = j;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < n && source[j] !== "\n") {
        if (source[j] === "\\") {
          j += 2;
          continue;
        }
        if (source[j] === ch) {
          j += 1;
          break;
        }
        j += 1;
      }
      out.push({ text: source.slice(i, j), kind: "str" });
      i = j;
      continue;
    }
    if (ch === "#") {
      let j = i + 1;
      while (j < n && source[j] !== "\n") {
        if (source[j] === "\\" && source[j + 1] === "\n") j += 2;
        else j += 1;
      }
      out.push({ text: source.slice(i, j), kind: "pre" });
      i = j;
      continue;
    }
    if (isDigit(ch) && (i === 0 || !isIdentStart(source[i - 1]))) {
      let j = i + 1;
      while (j < n && /[0-9a-fA-FxX.uUlL']/.test(source[j])) j += 1;
      out.push({ text: source.slice(i, j), kind: "num" });
      i = j;
      continue;
    }
    if (isIdentStart(ch)) {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_]/.test(source[j])) j += 1;
      const word = source.slice(i, j);
      out.push({ text: word, kind: KEYWORDS.has(word) ? "key" : "plain" });
      i = j;
      continue;
    }
    out.push({ text: ch, kind: "plain" });
    i += 1;
  }
  return out;
}

export function highlightLines(source: string): Token[][] {
  const lines: Token[][] = [[]];
  for (const token of tokenize(source)) {
    const parts = token.text.split("\n");
    parts.forEach((part, index) => {
      if (index > 0) lines.push([]);
      if (part.length > 0) lines[lines.length - 1].push({ text: part, kind: token.kind });
    });
  }
  if (lines.length > 1 && lines[lines.length - 1].length === 0 && source.endsWith("\n")) {
    lines.pop();
  }
  return lines;
}
