module.exports = {
  lists: [
    {
      type:'doc',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Art',
      collapsible: false,
      items: [
        'art',
        'film',
        'lit',
        {
          type: 'category',
          label: 'Music',
          collapsible: false,
          link: {
            type:'doc',
            id:'music',
          },
          items: [
            {
              type:'doc',
              id: 'music_playlist',
              label:'Playlist',
            },
            {
              type:'doc',
              id: 'music_playlist_2020',
              label:'> 2020',
            },
            {
              type:'doc',
              id: 'music_playlist_2010',
              label:'< 2020',
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
      id: 'next',
    },
    {
      type: 'doc',
      id: 'lists',
    },
    {
      type: 'doc',
      id: 'places',
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
      id: 'quotes',
    },
    {
      type: 'doc',
      id: 'words',
    },
  ],
};