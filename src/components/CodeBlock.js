import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// You can choose the style you like
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ language, codeText }) => {
  return (
    <SyntaxHighlighter language={language} style={coy}>
      {codeText}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
