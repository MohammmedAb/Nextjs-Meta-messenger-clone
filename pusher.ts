import Pusher from 'pusher';
import ClientPusher from 'pusher-js';

export const serverPusher = new Pusher({
  appId: '1514683',
  key: 'd45bac4e3f79e36c0eff',
  secret: process.env.PUSHER_SECRET!,
  cluster: 'ap1',
});

export const clientPusher = new ClientPusher('d45bac4e3f79e36c0eff', {
  cluster: 'ap1',
});
