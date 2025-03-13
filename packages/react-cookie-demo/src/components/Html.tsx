import React from 'react';

interface Props {
  markup: string;
}

export default function Html({ markup }: Props): React.ReactElement {
  return (
    <html>
      <body>
        <div id="main-app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script src="/assets/bundle.js" />
      </body>
    </html>
  );
}
