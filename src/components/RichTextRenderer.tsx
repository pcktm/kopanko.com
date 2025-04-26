import { RichText } from "@graphcms/rich-text-react-renderer";
import type {
  NodeRendererType,
  RichTextProps,
} from "@graphcms/rich-text-react-renderer";
import { useMemo } from "react";
import { Highlight, themes } from "prism-react-renderer";
import fileIcon from "@hackernoon/pixel-icon-library/icons/SVG/regular/save.svg?raw";
import infoIcon from "@hackernoon/pixel-icon-library/icons/SVG/regular/info-circle.svg?raw";

function CodeBlock({ children }: { children: any }) {
  const code = useMemo(
    () => children?.props?.content?.map((c: any) => c?.text).join(""),
    [children],
  );
  return (
    <div className="font-mono">
      <Highlight theme={themes.dracula} code={code} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="select-none pr-4 opacity-50">{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

const customRenderers: NodeRendererType = {
  Asset: {
    image(props) {
      if (!props.url) return null as any;
      return (
        <div className="mt-6 flex flex-col items-center overflow-hidden">
          <img
            src={props.url}
            width={props.width}
            height={props.height}
            className="not-prose rounded-md"
            style={props.placeholder.jsx}
            loading="lazy"
          />
          {props.caption && (
            <span className="mt-2 text-center text-sm text-stone-700 dark:text-stone-300">
              {props.caption}
            </span>
          )}
        </div>
      );
    },
    "application/pdf": (props) => {
      return (
        <div className="not-prose mb-3 flex flex-row items-center gap-2">
          <span
            className="h-5 w-5 fill-current"
            dangerouslySetInnerHTML={{ __html: fileIcon }}
          />
          <a
            className="underline"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.caption ?? props.fileName}
          </a>
        </div>
      );
    },
  },
  code_block(props) {
    return <CodeBlock>{props.children}</CodeBlock>;
  },
  code(props) {
    return (
      <span className="rounded-sm dark:bg-zinc-800 px-1 py-0.5 text-sm font-mono dark:text-zinc-100 text-zinc-800 bg-zinc-200">
        {props.children}
      </span>
    );
  },
  table(props) {
    return (
      <div className="overflow-x-auto">
        <table className="not-prose w-full">{props.children}</table>
      </div>
    );
  },
  a(props) {
    const isExternal = new URL(props.href ?? "").hostname !== "kopanko.com";
    return (
      <a
        href={props.href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : ""}
      >
        {props.children}
      </a>
    );
  },
  h3(props) {
    return <h3 className="font-redaction20">{props.children}</h3>;
  },
  class(props) {
    if (props.className === "infobox") {
      return (
        <div className="not-prose flex w-full items-center rounded-xs bg-zinc-800 p-4 text-zinc-100 lg:inline-flex">
          <span
            className="mr-4 h-8 w-8 shrink-0 fill-current"
            dangerouslySetInnerHTML={{ __html: infoIcon }}
          />
          <span className="mr-2 flex-auto text-left text-sm">
            {props.children}
          </span>
        </div>
      );
    }
    if (props.className === "columns") {
      return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {props.children}
        </div>
      );
    }
    // if (props.className === 'elections-countdown') {
    //   return <ElectionCountdown />;
    // }
    return <div>{props.children}</div>;
  },
};

export default function RichTextRenderer({
  richContent,
  references,
}: {
  richContent: RichTextProps["content"];
  references: RichTextProps["references"];
}) {
  return (
    <RichText
      content={richContent}
      references={references}
      renderers={customRenderers}
    />
  );
}
