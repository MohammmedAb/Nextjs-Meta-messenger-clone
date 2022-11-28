// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { serverPusher } from '../../pusher';
import redis from '../../redis';
import { Message } from '../../typings';

type Data = {
  message: Message;
};

type ErrorData ={
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Only POST requests allowed' });
    return;
  }

  const { message } = req.body; // Destructure the message from the request body

  const newMessage = {
    ...message, // Spread the message object
    created_at: Date.now(), // Replace the timestamp of the user to the timestamp of the server
  };

  // Add the message to the Redis database
  await redis.hset('messages',message.id, JSON.stringify(newMessage)); //hashName, key, value
  serverPusher.trigger('messages', 'new-message', newMessage); //channelName, eventName, data
  
  res.status(200).json({ message: newMessage });
}
