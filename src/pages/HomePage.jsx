import { useRef, useEffect, useState } from 'react'
import { CardApp } from './CardApp'
import Logo from '../assets/imgs/edited-logo.png'

export function HomePage() {

  const nameInputRef = useRef()
  const [userDetails, setUserDetails] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const pattern = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/
  const [validateClass, setValidateClass] = useState('')

  useEffect(() => {
  }, [])

  const onStartPlay = (ev) => {
    ev.preventDefault()
    const fullname = nameInputRef.current.value.trim()
    if (!pattern.test(fullname)) return
    setUserDetails({ fullname })
    setIsPlaying(true)
  }

  const validateInput = () => {
    if (pattern.test(nameInputRef.current.value.trim())) setValidateClass('green')
    else setValidateClass('red')
  }

  const onSubmitDetails = () => {
    setIsPlaying(false)
  }

  return (<>
    {!isPlaying ?
      <section className='home-page flex column auto-center'>
        <img src={Logo} className="logo" />
        <h1>BioFollow</h1>
        <p>Enter your fullname</p>

        <form onSubmit={onStartPlay}>
          <input className={'login-input ' + validateClass} ref={nameInputRef} onChange={validateInput} type="text" placeholder='Enter your full name' />
        </form>
        <button className='btn' onClick={onStartPlay}>Continue</button>
      </section>
      :
      <CardApp userDetails={userDetails} onSubmitDetails={onSubmitDetails} />
    }
  </>
  )
}