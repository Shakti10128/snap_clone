import { signIn } from '@/auth'
import Signup from '@/components/Signup'
import React from 'react'

const SignupPage = () => {

  const SigninHandler = async()=>{
    'use server'
    await signIn('github');
}

  return (
    <form action={SigninHandler}>
      <Signup/>
    </form>
  )
}

export default SignupPage