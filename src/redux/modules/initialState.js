export default {
  ducks: {
    isFetching: true,
    error: ''
  },
  feed: {
    newDucksAvailable: false,
    newDucksToAdd: [],
    isFetching: false,
    error: '',
    duckIds: []
  },
  likeCount: {
    isFetching: false,
    error: ''
  },
  listeners: {},
  modal: {
    duckText: '',
    isOpen: false
  },
  replies: {
    name: '',
    reply: '',
    uid: '',
    timestamp: 0,
    avatar: '',
    replyId: ''
  },
  initialUserState: {
    lastUpdated: 0,
    info: {
      name: '',
      uid: '',
      avatar: ''
    }
  },
  users: {
    isFetching: true,
    error: '',
    isAuthed: false,
    authedId: ''
  },
  usersDucks: {
    isFetching: true,
    error: ''
  },
  usersLikes: {
    isFetching: false,
    error: ''
  }
};
