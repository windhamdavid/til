module.exports = {
  lists: [
    {
      type:'doc',
      id: 'index',
    },
    {
      type: 'doc',
      id: 'next',
    },
    {
      type: 'category',
      label: 'Art',
      collapsible: false,
      items: [
        'art',
        'film',
        'lit',
        'music',
        {
          type: 'doc',
          label: '- Playlists',
          id: 'music_playlist',
        },
      ],
    },
    {
      type: 'doc',
      id: 'concepts',
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
    {
      type: 'doc',
      id: 'lists',
    },
  ],
};