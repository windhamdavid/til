module.exports = {
  notes: [
    {
      type:'doc',
      id: 'index',
    },
    {
      type:'doc',
      id:'art',
    },
    {
      type:'doc',
      id:'dogs',
    },
    {
      type:'doc',
      id:'golf',
    },
    {
      type:'doc',
      id:'health',
    },
    {
      type:'doc',
      id:'house',
    },
    {
      type:'doc',
      id:'tennis',
    },
    {
      type:'doc',
      id:'wealth',
    },
    {
      type:'doc',
      id:'work',
    },
    {
      type: 'category',
      label: 'Projects',
      collapsible: true,
      link: {
        type:'doc',
        id:'projects/index',
      },
      items: [
        'projects/game',
        'projects/gzet',
        'projects/ham',
        'projects/juryd',
        'projects/pants',
        'projects/zw',
      ],
    },
  ],
};