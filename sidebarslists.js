module.exports = {
  lists: [
    {
      type:'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Art',
      collapsible: true,
      items: [
        'art',
        'film',
        'lit',
        {
          type: 'category',
          label: 'Music',
          collapsible: true,
          link: {
            type:'doc',
            id:'music/music',
          },
          items: [
            {
              type:'doc',
              id: 'music/playlist',
              label:'Playlist',
            },
            {
              type:'doc',
              id: 'music/playlist_2020',
              label:'- 2020',
            },
            {
              type:'doc',
              id: 'music/playlist_2015',
              label:'2020-2015',
            },
            {
              type:'doc',
              id: 'music/playlist_2010',
              label:'2015-2010',
            },
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'concepts',
    },
    {
      type: 'doc',
      id: 'feeds',
    },
    {
      type: 'doc',
      id: 'lists',
    },
    {
      type: 'doc',
      id: 'next',
    },
    {
      type: 'category',
      label: 'Places',
      collapsible: true,
      link: {
        type:'doc',
        id:'places/places',
      },
      items: [
        {
          type:'doc',
          id: 'places/greenwood',
          label:'Greenwood',
        },
        {
          type:'doc',
          id: 'places/columbia',
          label:'Columbia',
        },
        {
          type:'doc',
          id: 'places/charleston',
          label:'Charleston',
        },
      ],
    },
    {
      type: 'doc',
      id: 'people',
    },
    {
      type: 'doc',
      id: 'things',
    },
    {
      type: 'doc',
      id: 'trivia',
    },
    {
      type: 'doc',
      id: 'tweets',
    },
    {
      type: 'doc',
      id: 'quotes',
    },
    {
      type: 'doc',
      id: 'words',
    },
  ],
};