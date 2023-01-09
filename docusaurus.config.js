/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'David Windham | TIL',
  tagline: 'Because Today I Learned',
  url: 'https://davidawindham.com',
  baseUrl: '/til/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'windhamdavid',
  projectName: 'til',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
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
        editUrl:'https://code.davidawindham.com/david/til/src/master/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'lists',
        path: 'lists',
        routeBasePath: 'lists',
        sidebarPath: require.resolve('./sidebarslists.js'),
        editUrl:'https://code.davidawindham.com/david/til/src/master/',
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
        blogSidebarTitle: 'Posts',
        blogSidebarCount: 'ALL',
        feedOptions: {
          type: null,
        },
        showReadingTime: false,
        editUrl:'https://code.davidawindham.com/david/til/src/master/',
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
    image: 'img/zw.png',
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    prism: {
      additionalLanguages: ['rust', 'shell-session', 'swift', 'diff'],
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
        {to: 'docs/',activeBasePath: 'docs',label: 'Docs',position: 'left'},
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
          editUrl:'https://code.davidawindham.com/david/til/src/master/',
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
          editUrl:'https://code.davidawindham.com/david/til/src/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
