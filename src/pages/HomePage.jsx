import { useRef, useEffect, useState } from 'react'
import { CardApp } from './CardApp'
import Logo from '../assets/imgs/edited-logo.png'
import { i18nService } from '../services/i18n-service'

export function HomePage({ langType }) {

  const nameInputRef = useRef()
  const digitInputRef = useRef()
  const [userDetails, setUserDetails] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const namePattern = /^[a-zA-Zא-ת]{2,40}( [a-zA-Zא-ת]{2,40})+$/
  const [validateNameClass, setValidateNameClass] = useState('')
  const [validateDigitClass, setValidateDigitClass] = useState('')

  useEffect(() => {

  }, [])

  const onStartPlay = (ev) => {
    ev.preventDefault()
    const fullname = nameInputRef.current.value.trim()
    const digits = digitInputRef.current.value.trim()
    if (!namePattern.test(fullname) || !(digits.length > 0 && digits.length < 5)) return
    setUserDetails({ fullname, digits })
    setIsPlaying(true)
  }

  const validateInput = () => {
    if (namePattern.test(nameInputRef.current.value.trim())) setValidateNameClass('green')
    else setValidateNameClass('red')
  }

  const validateDigitInput = () => {
    if (digitInputRef.current.value.trim().length > 0 && digitInputRef.current.value.trim().length < 5) setValidateDigitClass('green')
    else setValidateDigitClass('red')
  }

  const onSubmitDetails = () => {
    setIsPlaying(false)
  }

  return (<>
    {!isPlaying ?
      <section className='home-page flex column auto-center'>
        <img src={Logo} className="logo" />
        <h1>{i18nService.getTranslation('title', langType)}</h1>
        <p>{i18nService.getTranslation('enter-details', langType)}</p>

        <form className='flex column' style={{ gap: '4px' }} onSubmit={onStartPlay}>
          <input className={'login-input ' + validateNameClass} ref={nameInputRef} onChange={validateInput} type="text" placeholder={i18nService.getTranslation('enter-name-input', langType)} />
          <input className={'login-input ' + validateDigitClass} ref={digitInputRef} onChange={validateDigitInput} type="text" placeholder={i18nService.getTranslation('enter-digit-input', langType)} />
        </form>
        <button className='btn' onClick={onStartPlay}>{i18nService.getTranslation('continue', langType)}</button>
      </section>
      :
      <CardApp userDetails={userDetails} onSubmitDetails={onSubmitDetails} langType={langType} />
    }
  </>
  )
}