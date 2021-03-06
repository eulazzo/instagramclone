import React, { useEffect, useState } from 'react'
import faker from 'faker'
import Story from '../components/Story'
import { useSession } from 'next-auth/react';

export default function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  const {data:session} = useSession()
  useEffect(() => {

    const suggestions = [...Array(20)].map((item,index)=>({
      ...faker.helpers.contextualCard(),
      id:index
    }))

    setSuggestions(suggestions)
  
  }, [ ])
  return (
    <div className='flex space-x-2  p-6 bg-white 
    mt-5  border-gray-20 border rounded-sm mx-5 md:mx-0
    overflow-x-scroll scrollbar-thin scrollbar-thumb-black '>
      
      {session && (
        <Story
        img={session.user.avatar}  
        username={session.user.username} />
      )}

      {suggestions.map(({id,avatar,username})=> (
        <Story 
        key={id} 
        img={avatar}  
        username={username} 
        />
      )
      )}  
    </div>
  )
}
