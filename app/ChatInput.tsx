'use client';

import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { v4 as uuid } from 'uuid';
import fetcher from '../lib/fetchMessages';
import { Message } from '../typings';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher);
  //With SWR, components will get a stream of data updates constantly and automatically. And the UI will be always fast and reactive.

  console.log(messages);

  const addMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input) return;

    const messgeToSend = input; // copy into a new variable, so that we can clear the input, and still have access to the message

    setInput('');

    const id = uuid();

    const message: Message = {
      id,
      message: messgeToSend,
      created_at: Date.now(),
      username: 'Me',
      profilePic: 'https://picsum.photos/200',
      email: 'example.no@gmail.com',
    };

    const uploadMessage = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessage, {
      optimisticData: [message, ...messages!], //Update the local state immediately and fire the request. Since the API will return the updated data, there is no need to start a new revalidation.
      rollbackOnError: true,
      //If the API errors, the original data will be rolled back by SWR automatically.
    });
  };
  return (
    <form
      onSubmit={addMessage}
      className="bg-white fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter messege here.."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
            disabled:opacity-50 disabled:cursor-not-allowed "
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
