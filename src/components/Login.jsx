import React, { useState } from 'react'
import './Login.scss'
import arrow_left from '../assets/arrow-left.svg'
import eye from '../assets/eye.svg'
import eye_slash from '../assets/eye-slash.svg'
import { loginAPI } from '../service/UserService'
import { toast } from 'react-toastify'
import '../assets/fontawesome-free-6.4.2-web/css/all.min.css'
function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingAPI, setLoadingAPI] = useState(false)
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email/Password is required!')
      return
    }
    setLoadingAPI(true)
    let res = await loginAPI(email, password)
    if (res && res.token) {
      localStorage.setItem('token', res.token)
    } else {
      if (res && res.status) {
        toast.error(res.data.error)
      }
    }
    setLoadingAPI(false)
  }
  return (
    <div className='login-container col-12 col-sm-4'>
      <div className='title'>Login</div>
      <div className='text'>Email or username</div>
      <input
        type='text'
        placeholder='Email'
        value={email}
        className='input-email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className='password-input'>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          src={showPassword ? eye : eye_slash}
          alt={showPassword ? 'Hide Password' : 'Show Password'}
          onClick={togglePasswordVisibility}
          className='password-icon'
        />
      </div>
      <div className='forgot'>Forgot Password?</div>
      <button disabled={email && password ? false : true} onClick={handleLogin}>
        {loadingAPI && <i class='fas fa-sync fa-spin'> </i>} &nbsp; Login
      </button>
      <div className='back'>
        <img src={arrow_left} alt='Go back' />
        Go back
      </div>
    </div>
  )
}

export default Login
