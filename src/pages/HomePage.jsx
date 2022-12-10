import { useRef, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../assets/imgs/edited-logo.png'

export function HomePage() {

  const nameInputRef = useRef()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
  }, [])

  const onSubmit = (ev) => {
    ev.preventDefault()
    const fullname = nameInputRef.current.value
    setUserDetails({ fullname })
    if (!fullname) return
    setIsPlaying(true)
    navigate('/play')
  }


  return (<>
    {!isPlaying ?
      <section className='home-page flex column auto-center'>
        <img src={Logo} className="logo" />
        <h1>BioFollow</h1>
        <p>Enter your fullname</p>

        <form onSubmit={onSubmit}>
          <input className='login-input' ref={nameInputRef} type="text" placeholder='Enter your full name' />
        </form>
        <button className='btn' onClick={onSubmit}>Continue</button>
      </section>
      :
      <Outlet context={userDetails} />
    }
  </>
  )
}