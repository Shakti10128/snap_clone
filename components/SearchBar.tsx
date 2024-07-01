import React from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'

const SearchBar = () => {
  return (
    <div>
        <div className='flex items-center gap-2 rounded-xl bg-[#E3E6E8] px-2 py-1'>
            <SearchIcon/>
            <Input
            className='outline-none w-full bg-transparent focus:border-none'
            type='text'
            placeholder='Search or start new chat..'
            />
        </div>
    </div>
  )
}

export default SearchBar