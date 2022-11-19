import Image from 'next/image'
import ChatInput from './ChatInput'
import MessegeList from './MessegeList'

export default function Home() {
  return (
    <main>
      <MessegeList/>
      <ChatInput/>
    </main>
  )
}
