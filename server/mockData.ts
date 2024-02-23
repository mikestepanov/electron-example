exports.mockUsers = {
  '123': {
    name: 'Gwyn,',
    lastName: 'the Lord of Cinder',
    phoneNumber: '123-456-7890',
  },
  '124': {
    name: 'Prince Vegeta',
    lastName: 'the IV',
    phoneNumber: '123-456-7891',
  },
}

exports.mockChannels = {
  '2000': [
    {
      id: '2001',
      userID: '123',
      message:
        'Greetings, traveler. Upon the scale of endurance from 1 to 10, what resonance fills your soul?',
      timestamp: '2024-02-23T08:00:00Z',
    },
    {
      id: '2002',
      userID: '124',
      message: "It's over 9000!",
      timestamp: '2024-02-23T08:01:00Z',
    },
  ],
}
