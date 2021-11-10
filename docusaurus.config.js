/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'David Windham TIL',
  tagline: 'Because Today I Learned',
  url: 'https://davidawindham.com',
  baseUrl: '/til/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'windhamdavid',
  projectName: 'til',
  plugins: [
    require.resolve('docusaurus-lunr-search')
  ],
  themeConfig: {
    hideableSidebar: true,
    prism: {
      additionalLanguages: ['shell-session'],
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
      switchConfig: {
        darkIcon: '\u2800',
        darkIconStyle: {
          marginLeft: '1px',
        },
        lightIcon: '\u2800',
        lightIconStyle: {
          marginLeft: '1px',
        },
      },
    },
    navbar: {
      hideOnScroll: true,
      title: 'TIL',
      logo: {
        alt: 'windhamdavid',
        src: 'img/zw.png',
      },
      items: [
        {to: 'docs/',activeBasePath: 'docs',label: 'Docs',position: 'left'},
        {to: 'about/',activeBasePath: 'til',label: 'About',position: 'left'},
        {to: 'help', label: 'Help', position: 'left'},
        {
          type: 'search', position: 'right',
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
          editUrl:'https://code.davidawindham.com/david/til/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        blog: {
          feedOptions: {
            type: null,
          },
        },
      },
    ],
  ],
};
