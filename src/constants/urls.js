// export const host = 'http://whochats-backend.herokuapp.com/';
// export const host = 'http://localhost:5000';

export let host = '';

switch (process.env.NODE_ENV) {
  case 'development':
    host = 'http://localhost:5000';
    break;
  case 'production':
    host = 'https://whochats-backend.herokuapp.com';
    break;
  default:
    host = '';
}
if (!host) {
  alert(`NODE_ENV variable isn't defined check console log, IN URLS constants`);
  console.log(process.env.NODE_ENV);
}

export const usersUrl = `${host}/api/v1/users`;
export const roomsUrl = `${host}/api/v1/rooms`;
export const messagesUrl = `${host}/api/v1/messages`;
export const blocksUrl = `${host}/api/v1/blocks`;
