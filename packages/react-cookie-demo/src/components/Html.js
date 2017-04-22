import React from 'react';
import { string } from 'prop-types';

export default function Html({ markup }) {
  return (
    <html>
      <body>
        <div id="main-app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script src="/assets/bundle.js" />
      </body>
    </html>
  );
}

Html.propTypes = {
  markup: string.isRequired
};
