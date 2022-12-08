import { useRef, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function HomePage() {

  const nameInputRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    
  }, [])

  const onSubmit =  (ev) => {
    ev.preventDefault()
    const user = nameInputRef.current.value
    if (!user) return console.log('Fill the inputs')

    navigate('/chat')
  }


  return (
    <section className='home-page flex column auto-center'>

      <h1>Welcome to BioFollow speed test</h1>
      <p>הכנס את שמך</p>

      <form onSubmit={onSubmit}>
        <input className='login-input' ref={nameInputRef} type="text" placeholder='Enter your full name' />
      </form>
      <button className='btn' onClick={onSubmit}>Continue</button>

      <Outlet context={''} />
    </section>
  )
}