import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <div>
      <h1 className='text-center text-2xl font-medium my-2'>Login to Snapchat</h1>
      <Button className='w-full my-1 gap-2'><FaGithub size={'24px'}/>Login with Github</Button>
      <p>Don not have an account? <Link href={'/signup'} className='underline'>signup</Link></p>
    </div>
  )
}

export default Login