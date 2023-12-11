module.exports = {
  docs: [
    {
      type:'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Computers',
      items: [
        'computers/macs',
        'computers/magic',
        'computers/ovid',
        'computers/woozer',
        'computers/woozie',
        'computers/zeke'
      ],
    },
    {
      type: 'category',
      label: 'Data',
      collapsible: true,
      link: {
        type:'doc',
        id:'data/data',
      },
      items: [
        'data/machine',
      ],
    },
    {
      type: 'category',
      label: 'Database',
      items: [
        'db/MongoDB',
        'db/MariaDB',
        'db/MySQL',
        'db/PostgreSQL',
        'db/Redis'
      ],
    },
    {
      type: 'category',
      label: 'Editors',
      items: [
        'editors/atom',
        'editors/jetbrains',
        'editors/sublime',
        'editors/textmate',
        'editors/vs'
      ],
    },
    {
      type: 'category',
      label: 'Frameworks',
      items: [
        'waf/nextjs',
        'waf/rails',
        'waf/react',
        'waf/react_native',
        'waf/vue',
      ],
    },
    {
      type: 'category',
      label: 'Language',
      items: [
        'lang/Golang',
        'lang/GraphQL',
        'lang/JavaScript',
        'lang/nodejs',
        'lang/npm',
        'lang/PHP',
        'lang/Python',
        'lang/Ruby',
        'lang/Rust',
      ],
    },
    {
      type: 'category',
      label: 'SasS',
      items: [
        'saas/akamai',
        'saas/aws',
        'saas/google',
        'saas/heroku',
        'saas/openai',
        'saas/stripe',
        'saas/supabase',
        'saas/twilio',
        'saas/vercel',
      ],
    },
    {
      type: 'category',
      label: 'Server Tools',
      items: [
        'server/apache',
        'server/docker',
        'server/goaccess',
        'server/htop',
        'server/iptables',
        'server/kubernetes',
        'server/letsencrypt',
        'server/lynis',
        'server/mail',
        'server/monit',
        'server/nginx',
        'server/ubuntu',
        'server/ufw',
      ],
    },
    {
      type: 'category',
      label: 'Server Hosted',
      items: [
        'host/Discourse',
        'host/Drupal',
        'host/Gitea',
        'host/Gogs',
        'host/Icecast',
        'host/InvoicePlane',
        'host/Laravel',
        'host/Lychee',
        'host/Mailcow',
        'host/Miniflux',
        'host/Nodebb',
        'host/Piwik',
        'host/Shaarli',
        'host/Siege-sproxy',
        'host/Webmin',
        {
          type:'category',
          label:'WordPress',
          collapsible: true,
          link: {      
            type:'doc',
            id:'host/WordPress',
          },
          items: [
            {
              type:'doc',
              id: 'host/WordPress-Block',
              label: ' Block Theme',
            }
          ]
        },
        'host/Zammad',
      ],
    },
    {
      type: 'category',
      label: 'Shell',
      items: [
        'shell/dotfiles',
        'shell/terminal',
        'shell/unix',
        'shell/vi',
        'shell/bash',
        'shell/zsh',
      ],
    },
    {
      type: 'category',
      label: 'Software',
      items: [
        'localhost/macos',
        'localhost/chrome',
        'localhost/brew',
        'localhost/adobe',
        'localhost/sketch',
        'localhost/ngrok',
      ],
    },
    {
      type: 'category',
      label: 'Versioning',
      items: [
        'editors/git',
        'editors/subversion'
      ],
    },
  ],
};
