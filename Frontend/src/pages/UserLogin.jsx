import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const handleSubmit = (e) => {
    // console.log('Helooo===========>>')
    e.preventDefault()
    const formData = {
      email: email,
      password: password
    }
    setUserData(formData)
    console.log('Form submitted with:', formData)
    setEmail('')
    setPassword('')
  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
          <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"></img>
            <form onSubmit={handleSubmit}>

              <h3 className='text-lg font-medium mb-2'>What's your email</h3>
              <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='Email' />
              <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
              <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              placeholder='Password' />

              <button
              className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
              type='submit'>Login</button>

            </form>
            <p className='text-center'>New Here?<Link to='/signup' className='text-blue-600'>
              Create new Account
            </Link></p>
      </div>
      <div>
        <Link to='/captain-login'
        className='bg-[#10b461] flex justify-center items-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >
          Sign In As Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
