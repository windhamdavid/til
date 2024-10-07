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
        id:'art/art',
      },
      items: [
        { 
          type:'doc',
          id:'art/design', 
        },
        {
          type: 'category',
          label: 'Education',
          collapsible: true,
          link: {
            type:'doc',
            id:'art/education/education',
          },
          items: [ 
            'art/education/visual',
            'art/education/design',
            'art/education/media',
          ],
        }
      ],
    },
    {
      type:'category',
      label:'Dogs',
      collapsible: true,
      link: {      
        type:'doc',
        id:'dogs/dogs',
      },
      items: [
        'dogs/iris',
      ]
    },
    {
      type:'category',
      label:'Garden',
      collapsible: true,
      link: {      
        type:'doc',
        id:'garden/garden',
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
      type:'category',
      label:'Health',
      collapsible: true,
      link: {      
        type:'doc',
        id:'health/health',
      },
      items: [
        'health/diet',
        'health/mental',
      ]
    },
    {
      type:'category',
      label:'House',
      collapsible: true,
      link: {      
        type:'doc',
        id:'house/house',
      },
      items: [
        'house/build',
        'house/helene',
        'house/studio'
      ]
    },
    {
      type:'doc',
      id:'ideas',
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
          type: 'category',
          label: 'Projects',
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
          type: 'category',
          label: 'Wealth',
          collapsible: true,
          link: {
            type:'doc',
            id:'work/wealth',
          },
          items: [
            'work/wealth-stocks',
          ],
        },
      ],
    },
  ],
};