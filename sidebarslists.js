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
      link: {
        type:'doc',
        id:'art/art',
      },
      items: [
        'art/lit',
        'art/motion',
        {
          type: 'category',
          label: 'Music',
          collapsible: true,
          link: {
            type:'doc',
            id:'art/music/music',
          },
          items: [
            {
              type:'doc',
              id: 'art/music/playlist',
              label:'Playlist',
            },
            {
              type:'doc',
              id: 'art/music/playlist_2020',
              label:'- 2020',
            },
            {
              type:'doc',
              id: 'art/music/playlist_2015',
              label:'2020-2015',
            },
            {
              type:'doc',
              id: 'art/music/playlist_2010',
              label:'2015-2010',
            },
          ],
        },
        {
          type:'doc',
          id: 'art/visual',
          label:'Visual',
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
      id: 'grocery',
    },
    {
      type: 'doc',
      id: 'lists',
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
      id: 'shopping',
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
    type: 'category',
    label: 'Tweets',
    collapsible: true,
    link: {
      type:'doc',
      id:'tweets',
    },
      items: [
        {
          type:'doc',
          id: 'tweets_follow',
          label:'Followed',
        },
      ],
    },
    {
      type: 'doc',
      id: 'quotes',
    },
    {
      type: 'doc',
      id: 'words',
    },
    {
      type: 'doc',
      id: 'next',
    },
  ],
};