import { useEffect, useRef, useState } from 'react'
import { CardApp } from './CardApp'
import Logo from '../assets/imgs/edited-logo.png'
import { i18nService } from '../services/i18n-service'
import { userService } from '../services/user-service'

const initialState = {
  userDetails: {},
  isPlaying: false,
  validateNameClass: '',
  validateDigitClass: '',
  notification: '',
}

function homeReducer(state, action) {
  switch (action.type) {
    case 'setUserDetails':
      return { ...state, userDetails: action.userDetails }
    case 'setIsPlaying':
      return { ...state, isPlaying: action.isPlaying }
    case 'setValidateNameClass':
      return { ...state, validateNameClass: action.validateNameClass }
    case 'setValidateDigitClass':
      return { ...state, validateDigitClass: action.validateDigitClass }
    case 'setNotification':
      return { ...state, notification: action.notification }
    default:
      return state
  }
}

export function HomePage({ langType, goHome }) {

  const nameInputRef = useRef()
  const digitInputRef = useRef()
  const namePattern = /^[a-zA-Zא-ת]{2,40}( [a-zA-Zא-ת]{2,40})+$/
  const [state, dispatch] = useReducer(homeReducer, initialState);

  useEffect(() => {
    if (goHome) dispatch({ type: 'setIsPlaying', isPlaying: false })
  }, [goHome])

  const onStartPlay = async (ev) => {
    ev.preventDefault()
    const fullname = nameInputRef.current.value.trim()
    const digits = digitInputRef.current.value.trim()

    if (!namePattern.test(fullname) || !(digits.length > 8 && digits.length < 40)) {
      dispatch({ type: 'setNotification', notification: i18nService.getTranslation('fail-inputs', langType) })
      setTimeout(dispatch, 2500, { type: 'setNotification', notification: '' });
      return
    }

    const data = await userService.getUserCounter(fullname, digits)
    dispatch({ type: 'setUserDetails', userDetails: { fullname, digits, counter: data.userCounter + 1 } })
    dispatch({ type: 'setIsPlaying', isPlaying: true })
  }

  const validateNameInput = () => {
    const nameInput = nameInputRef.current.value.trim()
    if (namePattern.test(nameInput)) dispatch({ type: 'setValidateNameClass', validateNameClass: 'green' })
    else dispatch({ type: 'setValidateNameClass', validateNameClass: nameInput === '' ? '' : 'red' })
  }

  const validateDigitInput = () => {
    const digitsInput = digitInputRef.current.value.trim()
    if (digitsInput.length > 8 && digitsInput.length < 40) dispatch({ type: 'setValidateDigitClass', validateDigitClass: 'green' })
    else dispatch({ type: 'setValidateDigitClass', validateDigitClass: digitsInput === '' ? '' : 'red' })
  }

  const onSubmitDetails = () => {
    dispatch({ type: 'setIsPlaying', isPlaying: false })
  }

  return (<>
    {!state.isPlaying ?
      <section className='home-page flex column auto-center'>
        <img src={Logo} className="logo" />
        <h1>{i18nService.getTranslation('title', langType)}</h1>
        <p>{i18nService.getTranslation('enter-details', langType)}</p>

        <form className='flex column' style={{ gap: '5px' }} onSubmit={onStartPlay}>
          <input className={'login-input ' + state.validateNameClass} ref={nameInputRef} onChange={validateNameInput} type="text" placeholder={i18nService.getTranslation('enter-name-input', langType)} />
          <input className={'login-input ' + state.validateDigitClass} ref={digitInputRef} onChange={validateDigitInput} type="text" placeholder={i18nService.getTranslation('enter-digit-input', langType)} />
        </form>
        <button className='btn' onClick={onStartPlay}>{i18nService.getTranslation('continue', langType)}</button>
      </section>
      :
      <CardApp userDetails={state.userDetails} onSubmitDetails={onSubmitDetails} langType={langType} />
    }
    {state.notification ?
      <div className='notification-box failure'>
        <h2>{state.notification}</h2>
      </div> : null}
  </>
  )
}