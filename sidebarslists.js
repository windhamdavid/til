module.exports = {
  lists: [
    {
      type:'doc',
      id: 'index',
    },

    {
      type: 'html',
      value: '<span style="border-top: 1px solid var(--ifm-color-gray-500); display: block;margin: 1rem 0 1rem 0;" />',
    },
    {
      type: 'category',
      label: 'Now',
      collapsible: true,
      link: {
        type:'doc',
        id:'now/now',
      },
      items: [
        {
          type:'doc',
          id: 'now/learning',
          label:'Learning',
        },
        {
          type:'doc',
          id: 'now/listening',
          label:'Listening',
        },
        {
          type:'doc',
          id: 'now/playing',
          label:'Playing',
        },
        {
          type:'doc',
          id: 'now/reading',
          label:'Reading',
        },
        {
          type:'doc',
          id: 'now/watching',
          label:'Watching',
        },
      ],
    },
    {
      type: 'doc',
      id: 'todo',
    },
    {
      type: 'doc',
      id: 'next',
    },
    {
      type: 'html',
      value: '<span style="border-top: 1px solid var(--ifm-color-gray-500); display: block;margin: 1rem 0 1rem 0;" />',
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
        {
          type: 'category',
          label: 'Motion',
          collapsible: true,
          link: {
            type:'doc',
            id:'art/motion',
          },
          items: [
            {
              type:'doc',
              id: 'art/video',
              label:'Video',
            },
          ],
        },
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
      id: 'design',
    },
    {
      type: 'doc',
      id: 'feeds',
    },
    {
      type: 'category',
      label: 'Food',
      collapsible: true,
      link: {
        type:'doc',
        id:'food/food',
      },
      items: [
        'food/grocery',
        'food/recipe',
        'food/thanksgiving',
      ],
    },  
    {
      type: 'doc',
      id: 'influence',
    },
    {
      type: 'doc',
      id: 'stars',
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
      id: 'travel',
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
      id: 'wine',
    },
    {
      type: 'doc',
      id: 'wikipedia',
    },
    {
      type: 'doc',
      id: 'words',
    },
  ],
};