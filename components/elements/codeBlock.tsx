import {ReactNode, useMemo} from 'react';
import {PrismAsyncLight as SyntaxHighlighter} from 'react-syntax-highlighter';

import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/prism/one-dark';

SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('python', python);

export default function CodeBlock({children}: {children: any}) {
  const code = useMemo(() => children?.props?.content?.map((c: any) => c?.text).join(''), [children]);
  return (
    <div>
      <SyntaxHighlighter language="typescript" style={oneDark}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
