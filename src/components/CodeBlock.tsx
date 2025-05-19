import { useMemo } from "react";
import { Highlight, themes, Prism } from "prism-react-renderer";

(typeof global !== "undefined" ? global : window).Prism = Prism
await import("prismjs/components/prism-http")
await import("prismjs/components/prism-shell-session")
await import("prismjs/components/prism-bash")

type InlineCodeConfig = {
  language: string;
  lineNumbers?: boolean;
  terminalLike?: boolean;
}

const defaultConfig: InlineCodeConfig = {
  language: "tsx",
  lineNumbers: true,
  terminalLike: false,
};

export default function CodeBlock({ children }: { children: any }) {
  const [code, config] = useMemo<[string, InlineCodeConfig]>(
    () => {
      const c = children?.props?.content?.map((c: any) => c?.text).join("") as string;
      if (!c) return ["", defaultConfig];

      // Check if the first line of c contains a JSON object
      const firstLine = c.split("\n")[0];
      if (firstLine.startsWith("{") && firstLine.endsWith("}")) {
        const config = JSON.parse(firstLine) as InlineCodeConfig;
        const codeWithoutConfig = c.split("\n").slice(1).join("\n");
        return [
          codeWithoutConfig,
          {
            ...defaultConfig,
            ...config,
          },
        ]
      }

      return [c, defaultConfig];
    },
    [children],
  );

  return (
    <div className="font-mono">
      <Highlight theme={themes.dracula} code={code} language={config.language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            {config.terminalLike && (
              <div className="flex items-center gap-2 py-2 px-4 bg-zinc-800 rounded-t-md">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>
            )}
            <pre style={style} className={`${className} ${config.terminalLike ? "mt-0 rounded-t-none" : ""}`}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {
                    config.lineNumbers && <span className="select-none pr-4 opacity-50 min-w-8.5 inline-block">{i + 1}</span>
                  }
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          </>
        )}
      </Highlight>
    </div>
  );
}