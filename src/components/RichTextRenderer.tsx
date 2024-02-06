import { RichText } from '@graphcms/rich-text-react-renderer';
import type { NodeRendererType, RichTextProps } from '@graphcms/rich-text-react-renderer';
import { useMemo } from 'react';
import { Highlight, themes } from "prism-react-renderer";
import fileIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/save.svg?raw';
import infoIcon from '@hackernoon/pixel-icon-library/icons/SVG/regular/info-circle.svg?raw';

function CodeBlock({ children }: { children: any }) {
  const code = useMemo(() => children?.props?.content?.map((c: any) => c?.text).join(''), [children]);
  return (
    <div className="font-mono">
      <Highlight
        theme={themes.dracula}
        code={code}
        language="tsx"

      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={className}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="pr-4 select-none opacity-50">
                  {i + 1}
                </span>
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
        <div className="flex flex-col items-center mt-6 overflow-hidden">
          <img
            src={props.url}
            width={props.width}
            height={props.height}
            className="rounded-md not-prose"
            style={props.placeholder.jsx}
            loading="lazy"
          />
          {props.caption && (
            <span className="mt-2 dark:text-stone-300 text-stone-700 text-sm text-center">
              {props.caption}
            </span>
          )}
        </div>
      );
    },
    'application/pdf': (props) => {
      console.log(props);
      return (
        <div className="flex flex-row not-prose mb-3 items-center gap-2">
          <span className="w-5 h-5 fill-current" dangerouslySetInnerHTML={{ __html: fileIcon }} />
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
    return (
      <CodeBlock>
        {props.children}
      </CodeBlock>
    );
  },
  table(props) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full not-prose">
          {props.children}
        </table>
      </div>
    );
  },
  a(props) {
    const isExternal = new URL(props.href ?? '').hostname !== 'kopanko.com';
    return (
      <a href={props.href} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : ''}>
        {props.children}
      </a>
    );
  },
  h3(props) {
    return <h3 className="font-redaction20">{props.children}</h3>;
  },
  class(props) {
    if (props.className === 'infobox') {
      return (
        <div className="not-prose p-4 bg-zinc-800 items-center text-zinc-100 w-full rounded-sm flex lg:inline-flex">
          <span className="w-8 h-8 fill-current flex-shrink-0 mr-4" dangerouslySetInnerHTML={{ __html: infoIcon }} />
          <span className="mr-2 text-sm text-left flex-auto">{props.children}</span>
        </div>
      );
    }
    if (props.className === 'columns') {
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

export default function RichTextRenderer({ richContent, references }: { richContent: RichTextProps["content"], references: RichTextProps["references"] }) {
  return (
    <RichText
      content={richContent}
      references={references}
      renderers={customRenderers}
    />
  );
}