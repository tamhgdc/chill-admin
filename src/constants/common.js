export const statuses = [
  { id: true, name: 'Đã kích hoạt', color: '#4caf50' },
  { id: false, name: 'Chưa kích hoạt', color: '#ef5350' },
];

export const roleList = [
  {
    id: 0,
    name: 'Người dùng',
  },
  {
    id: 2,
    name: 'Admin',
  },
]

export const genderList = [
  {
    id: 1,
    name: 'Nam',
  },
  {
    id: 2,
    name: 'Nữ'
  }
]

export const songTypeList = [
  {
    id: 1,
    name: 'Bài hát của người dùng tải lên',
  },
  {
    id: 2,
    name: 'Bài hát của hệ thống',
  },
]

export const playlistTypeList = [
  {
    id: 1,
    name: 'Playlist của người dùng tải lên',
  },
  {
    id: 2,
    name: 'Playlist của hệ thống',
  },
]


export const StorageKeys = {
  USER: 'user',
  ACCESS_TOKEN: 'access_token',
  LOGIN: 'login'
}


export const DEFAULT_PASSWORD = '123456a@'