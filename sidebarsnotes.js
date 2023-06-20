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
      type:'category',
      label:'Garden',
      collapsible: true,
      link: {      
        type:'doc',
        id:'garden',
      },
      items: [
        'garden/mushroom',
      ]
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
      id:'travel',
    },

    {
      type: 'category',
      label: 'Work',
      collapsible: true,
      link: {
        type:'doc',
        id:'work/work',
      },
      items: [
        { 
          type:'doc',
          id:'work/clients', 
        },
        { 
          type:'doc',
          id:'work/design', 
        },
        {
          type: 'category',
          label: 'Side Projects',
          collapsible: true,
          link: {
            type:'doc',
            id:'work/projects/index',
          },
          items: [
            'work/projects/ai',
            'work/projects/game',
            'work/projects/gzet',
            'work/projects/ham',
            'work/projects/juryd',
            'work/projects/pants',
            'work/projects/zw',
          ],
        },
        {
          type:'doc',
          id:'work/wealth',
        },
      ],
    },
  ],
};