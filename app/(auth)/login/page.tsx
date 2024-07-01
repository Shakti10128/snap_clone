import { signIn } from '@/auth';
import Login from '@/components/Login';
import React from 'react'

const LoginPage = ()=>{

    const SigninHandler = async()=>{
        'use server'
        await signIn('github');
    }

    return (
        <form action={SigninHandler}>
            <Login/>
        </form>
    )
}

export default LoginPage;