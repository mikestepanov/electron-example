exports.mockUsers = {
  '123': {
    name: 'Gwyn,',
    lastName: 'the Lord of Cinder',
    phoneNumber: '123-456-7890',
    imageURL: '/images/gwyn.jpg',
  },
  '124': {
    name: 'Prince Vegeta',
    lastName: 'the IV',
    phoneNumber: '123-456-7891',
    imageURL: '/images/vegeta.jpg',
  },
  '125': {
    name: 'Crystal',
    lastName: 'Maiden',
    phoneNumber: '234-567-8901',
    imageURL: '/images/cm.jpg',
  },
  '126': {
    name: 'Mufasa',
    lastName: 'the Lion King',
    phoneNumber: '345-678-9012',
    imageURL: '/images/mufasa.jpg',
  },
}

exports.mockChannels = {
  '2000': {
    isGettingNewComment: false,
    isMultiUser: false,
    name: 'Prince Vegeta the IV',
    imageURL: '/images/vegeta.jpg',
    messages: [
      {
        id: '2002',
        userID: '124',
        content: "It's over 9000!",
        timestamp: '2024-02-23T08:01:00Z',
      },
    ],
  },
  '3000': {
    isGettingNewComment: false,
    isMultiUser: true,
    name: "Gwyn's Chill Chat",
    imageURL: '/images/frost.jpg',
    messages: [
      {
        id: '2999',
        userID: '123',
        content:
          'Greetings, traveler. Upon the scale of endurance from 1 to 10, what resonance fills your soul?',
        timestamp: '2024-02-23T08:00:00Z',
      },
      {
        id: '3001',
        userID: '125',
        content: 'Hi there! Frosty greetings to you!',
        timestamp: '2024-02-23T08:04:00Z',
      },
      {
        id: '3002',
        userID: '126',
        content: "Hello, my friend. It's good to see you.",
        timestamp: '2024-02-23T08:05:00Z',
      },
    ],
  },
}
