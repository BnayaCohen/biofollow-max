import { useEffect, useRef, useState } from 'react'
import { CardApp } from './CardApp'
import Logo from '../assets/imgs/edited-logo.png'
import { i18nService } from '../services/i18n-service'
import { userService } from '../services/user-service'

export function HomePage({ langType, goHome }) {

  const nameInputRef = useRef()
  const digitInputRef = useRef()
  const namePattern = /^[a-zA-Zא-ת]{2,40}( [a-zA-Zא-ת]{2,40})+$/
  const [userDetails, setUserDetails] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  const [validateNameClass, setValidateNameClass] = useState('')
  const [validateDigitClass, setValidateDigitClass] = useState('')
  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (goHome) setIsPlaying(false)
  }, [goHome])

  const onStartPlay = async (ev) => {
    ev.preventDefault()
    const fullname = nameInputRef.current.value.trim()
    const digits = digitInputRef.current.value.trim()

    if (!namePattern.test(fullname) || !(digits.length > 0 && digits.length < 5)) {
      setNotification(i18nService.getTranslation('fail-inputs', langType))
      setTimeout(setNotification, 2500, '');
      return
    }
    if (await userService.isUserExist(fullname, digits)) {
      setNotification(i18nService.getTranslation('fail-user-exist', langType))
      setTimeout(setNotification, 2500, '');
      return
    }

    setUserDetails({ fullname, digits })
    setIsPlaying(true)
  }

  const validateNameInput = () => {
    const nameInput = nameInputRef.current.value.trim()
    if (namePattern.test(nameInput)) setValidateNameClass('green')
    else setValidateNameClass(nameInput === '' ? '' : 'red')
  }

  const validateDigitInput = () => {
    const digitsInput = digitInputRef.current.value.trim()
    if (digitsInput.length > 0 && digitsInput.length < 5) setValidateDigitClass('green')
    else setValidateDigitClass(digitsInput === '' ? '' : 'red')
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

        <form className='flex column' style={{ gap: '5px' }} onSubmit={onStartPlay}>
          <input className={'login-input ' + validateNameClass} ref={nameInputRef} onChange={validateNameInput} type="text" placeholder={i18nService.getTranslation('enter-name-input', langType)} />
          <input className={'login-input ' + validateDigitClass} ref={digitInputRef} onChange={validateDigitInput} type="text" placeholder={i18nService.getTranslation('enter-digit-input', langType)} />
        </form>
        <button className='btn' onClick={onStartPlay}>{i18nService.getTranslation('continue', langType)}</button>
      </section>
      :
      <CardApp userDetails={userDetails} onSubmitDetails={onSubmitDetails} langType={langType} />
    }
    {notification ?
      <div className='notification-box failure'>
        <h2>{notification}</h2>
      </div> : null}
  </>
  )
}