export const statuses = [
  { id: 1, name: 'Kích hoạt', color: '' },
  { id: -2, name: 'Chưa kích hoạt', color: '' },
];

export const findById = (id, array) => {
  if (!Array.isArray(array)) return;
  const result = array.find((item) => item.id === id);
  if (!result) return {};
  return result;
};


export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const USER = 'USER'