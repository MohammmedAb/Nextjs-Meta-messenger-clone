'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetchMessages';
import { clientPusher } from '../pusher';
import { Message } from '../typings';
import MessageComponent from './MessageComponent';

const MessegeList = () => {
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;//if you send the message, no need to update the state
      
      if (!messages) {
        mutate(fetcher);
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, mutate, clientPusher]);

  return (
    <div className=" space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <div key={message.id}>
          <MessageComponent key={message.id} message={message} />
        </div>
      ))}
    </div>
  );
};

export default MessegeList;
