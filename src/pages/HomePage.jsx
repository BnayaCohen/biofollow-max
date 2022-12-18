import { useRef, useEffect, useState } from 'react'
import { CardApp } from './CardApp'
import Logo from '../assets/imgs/edited-logo.png'
import { i18nService } from '../services/i18n-service'

export function HomePage() {

  const nameInputRef = useRef()
  const [userDetails, setUserDetails] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const namePattern = /^[a-zA-Zא-ת]{2,40}( [a-zA-Zא-ת]{2,40})+$/
  const [validateClass, setValidateClass] = useState('')
  const langType = 'he'

  useEffect(() => {
  }, [])

  const onStartPlay = (ev) => {
    ev.preventDefault()
    const fullname = nameInputRef.current.value.trim()
    if (!namePattern.test(fullname)) return
    setUserDetails({ fullname })
    setIsPlaying(true)
  }

  const validateInput = () => {
    if (namePattern.test(nameInputRef.current.value.trim())) setValidateClass('green')
    else setValidateClass('red')
  }

  const onSubmitDetails = () => {
    setIsPlaying(false)
  }

  return (<>
    {!isPlaying ?
      <section className='home-page flex column auto-center'>
        <img src={Logo} className="logo" />
        <h1>{i18nService.getTranslation('title',langType)}</h1>
        <p>{i18nService.getTranslation('enter-name',langType)}</p>

        <form onSubmit={onStartPlay}>
          <input className={'login-input ' + validateClass} ref={nameInputRef} onChange={validateInput} type="text" placeholder={i18nService.getTranslation('enter-name-input',langType)} />
        </form>
        <button className='btn' onClick={onStartPlay}>{i18nService.getTranslation('continue',langType)}</button>
      </section>
      :
      <CardApp userDetails={userDetails} onSubmitDetails={onSubmitDetails} />
    }
  </>
  )
}