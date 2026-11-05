import { useMemo } from "react";
import { highlightLines, type TokenKind } from "@/lib/highlight";

const kindClass: Record<TokenKind, string> = {
  plain: "",
  key: "token-key",
  str: "token-str",
  com: "token-com",
  num: "token-num",
  pre: "token-pre",
};

export function SourceView({ code }: { code: string }) {
  const lines = useMemo(() => highlightLines(code), [code]);
  return (
    <div className="overflow-auto rounded-md border border-border bg-bg">
      <table className="w-full border-collapse font-mono text-sm leading-6">
        <tbody>
          {lines.map((tokens, index) => (
            <tr key={index} className="align-top">
              <td className="w-12 select-none border-r border-border px-3 text-right text-muted">
                {index + 1}
              </td>
              <td className="px-4 whitespace-pre">
                {tokens.length === 0
                  ? " "
                  : tokens.map((token, tokenIndex) => (
                      <span key={tokenIndex} className={kindClass[token.kind]}>
                        {token.text}
                      </span>
                    ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
