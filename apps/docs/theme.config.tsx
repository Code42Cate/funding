import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: (
    <span>
      Fun<sub className="align-sub">2</sub>ding
    </span>
  ),
  project: {
    link: 'https://github.com/Code42Cate/funding',
  },
  docsRepositoryBase: 'https://github.com/Code42Cate/funding/edit/main/apps/docs',
  footer: {
    text: 'Fun2Ding © 2023',
  },
  faviconGlyph: '💰',
};

export default config;
