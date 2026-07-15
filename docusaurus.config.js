/** @type {import('@docusaurus/types').DocusaurusConfig} */

import {themes as prismThemes} from 'prism-react-renderer'

export default {
  title: 'David Windham',
  tagline: 'Because Today I Learned',
  url: 'https://davidwindham.com',
  baseUrl: '/til/',
  favicon: 'img/favicon.ico',
  organizationName: 'windhamdavid',
  projectName: 'til',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  clientModules: ['./src/clientModules/ask-widget.js'],
  plugins: [
    'plugin-image-zoom',
    require.resolve('docusaurus-plugin-matomo'),
    //require.resolve("@cmfcmf/docusaurus-search-local")
    [require.resolve('docusaurus-lunr-search'), {
      excludeRoutes: [
          'lists/music/**/*', // exclude playlists from indexing
      ]
    }],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'notes',
        path: 'notes',
        routeBasePath: 'notes',
        sidebarPath: require.resolve('./sidebarsnotes.js'),
        editUrl:'https://code.davidawindham.com/david/til/src/main/',
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lists',
        path: 'lists',
        routeBasePath: 'lists',
        sidebarPath: require.resolve('./sidebarslists.js'),
        editUrl:'https://code.davidawindham.com/david/til/src/main/',
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'posts',
        path: 'posts',
        routeBasePath: 'posts',
        blogTitle: 'Posts',
        blogDescription: 'Posts by David Windham',
        postsPerPage: 'ALL',
        blogSidebarTitle: ' ',
        blogSidebarCount: 'ALL',
        feedOptions: {
          type: null,
        },
        showReadingTime: false,
        editUrl:'https://code.davidawindham.com/david/til/src/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'ideas',
        path: 'ideas',
        routeBasePath: 'ideas',
        blogTitle: 'Ideas',
        blogDescription: 'Ideas by David Windham',
        postsPerPage: 'ALL',
        blogSidebarTitle: 'Ideas',
        blogSidebarCount: 'ALL',
        feedOptions: {
          type: null,
        },
        showReadingTime: false,
        editUrl:'https://code.davidawindham.com/david/til/src/main/',
      },
    ],
  ],
  themeConfig: {
    matomo: {
      matomoUrl: 'https://davidawindham.com/wik/',
      siteId: '1',
      phpLoader: 'matomo.php',
      jsLoader: 'matomo.js',
    },
    image: 'img/opengraph_image.jpg',
    imageZoom: {
      options: {
        margin: 40,
        background: '#484c57',
        scrollOffset: 0,
      },
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    prism: {
      theme: prismThemes.oneDark,
      additionalLanguages: ['php', 'rust', 'bash', 'shell-session', 'swift', 'diff'],
    },
    mermaid: {
      theme: {light: 'base', dark: 'base'},
      options: {
        // Mermaid blocks click/href links under the default 'strict' level.
        // 'loose' enables them — safe here since all diagrams are self-authored.
        securityLevel: 'loose',
      },
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      hideOnScroll: true,
      title: 'TIL',
      logo: {
        alt: 'windhamdavid',
        src: 'img/zw.png',
      },
      items: [
        {to: 'about/',activeBasePath: 'til',label: 'About',position: 'left'},
        {to: 'ai', label: 'AI',position: 'left'},
        {to: 'docs/',activeBasePath: 'docs',label: 'Docs',position: 'left'},
        {to: 'graph',activeBasePath: 'graph',label: 'Graph',position: 'left'},
        {to: 'lists/',activeBasePath: 'lists',label: 'Lists',position: 'left'},
        {to: 'notes/',activeBasePath: 'notes',label: 'Notes',position: 'left'},
        {to: 'posts/',activeBasePath: 'posts',label: 'Posts',position: 'left'}, 
        {to: 'help', label: 'Help', position: 'left'},
        {type: 'search', position: 'left'},
        {
          href: 'https://davidawindham.com/desk',
          label: 'David A. Windham',
          'aria-label': 'David A. Windham',
          className: 'header-homepage-link',
          target: '_self',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:'https://code.davidawindham.com/david/til/src/main/',
          showLastUpdateTime: true,
        },
        blog: {
          blogTitle: 'Posts',
          blogDescription: 'Posts by David Windham',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: null,
          },
          showReadingTime: false,
          editUrl:'https://code.davidawindham.com/david/til/src/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
