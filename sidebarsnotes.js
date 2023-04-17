module.exports = {
  notes: [
    {
      type:'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Art',
      collapsible: true,
      link: {
        type:'doc',
        id:'art',
      },
      items: [
        {
          type: 'category',
          label: 'Education',
          collapsible: true,
          link: {
            type:'doc',
            id:'art/education',
          },
          items: [ 
            'art/visual',
            'art/design',
            'art/media',
          ],
        },
      ],
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