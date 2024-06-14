// Login.jsx
import React, { useState, useEffect } from 'react';
import { GoogleSignInBtn, SignInBtn, SignUpBtn } from '@/app/firebase';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useSearchParams } from 'next/navigation';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);

  const searchParams = useSearchParams()
  const search = searchParams.get('mode')
  useEffect(() => {
    if (search === 'signup') {
      setIsSignIn(false);
    } else {
      setIsSignIn(true);
    }
  } ,[search]);
  
  const changeSignIn = () => {
    setIsSignIn(!isSignIn);
  }

  const SignInSection = () => (
    <section id='signin-section' className='flex bg-blue-400 h-screen-90'>
      <div className='flex flex-col border-2 h-5/6 w-11/12 lg:w-4/12 mx-auto my-auto p-12 justify-center items-center rounded-3xl shadow-xl bg-white'>
        <div className='flex flex-col justify-center items-center mb-8'>
          <p className='font-bold'>Username</p>
          <input className='border-2 rounded-xl px-2 py-1' value={email} onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div className='flex flex-col justify-center items-center mb-4'>
          <p className='font-bold'>Password</p>
          <input className='border-2 rounded-xl px-2 py-1' value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <SignInBtn email={email} password={password} />
        <GoogleSignInBtn />
        <div>
          <a className='mr-16 hover:text-gray-200 cursor-pointer'>Forgot password?</a>
          <a className='hover:text-gray-200 cursor-pointer' onClick={changeSignIn}>Don't have an account?</a>
        </div>
      </div>
    </section>
  )
  const SignUpSection = () => (
    <section id='signup-section' className='flex bg-blue-400 h-screen-90'>
      <div className='flex flex-col border-2 h-5/6 w-11/12 lg:w-4/12 mx-auto my-auto p-12 justify-center items-center rounded-3xl shadow-xl bg-white'>
        <div className='flex flex-col justify-center items-center mb-8'>
          <p className='font-bold'>Username</p>
          <input className='border-2 rounded-xl px-2 py-1' value={email} onChange={e => setEmail(e.target.value)}></input>
        </div>
        <div className='flex flex-col justify-center items-center mb-4'>
          <p className='font-bold'>Password</p>
          <input className='border-2 rounded-xl px-2 py-1' value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>
        <SignUpBtn email={email} password={password} />
        <GoogleSignInBtn />
        <div>
          <a className='hover:text-gray-200 cursor-pointer' onClick={changeSignIn}>Already have an account?</a>
        </div>
      </div>
    </section>
  )  

  return (
    <>
      <Header />
      {isSignIn ? <SignInSection /> : <SignUpSection />}
      
      <Footer />
    </>
  )
}

