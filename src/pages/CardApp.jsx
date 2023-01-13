import { useEffect, useReducer } from 'react'
import { CardList } from '../cmps/CardList'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'
import { i18nService } from '../services/i18n-service'
import { userService } from '../services/user-service'
import { utilService } from '../services/utilService'

const initialState = {
  cards: [],
  toggleRandom: null,
  toggleCardsModal: false,
  randResults: [],
  startTime: null,
}

function appReducer(state, action) {
  switch (action.type) {
    case 'setCards':
      return { ...state, cards: action.cards }
    case 'setToggleRandom':
      return { ...state, toggleRandom: action.toggleRandom }
    case 'setToggleCardsModal':
      return { ...state, toggleCardsModal: action.toggleCardsModal }
    case 'setRandResults':
      return { ...state, randResults: action.randResults }
    case 'setStartTime':
      return { ...state, startTime: action.startTime }
    default:
      return state
  }
}

export function CardApp({ userDetails, onSubmitDetails, langType }) {

  const window = useWindowDimensions()
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (!state.toggleRandom)
      dispatch({ type: 'setCards', cards: utilService.get21Cards(window) })
  }, [window])

  const onStartRandom = () => {
    dispatch({ type: 'setCards', cards: randCards(state.cards) })

    if (state.randResults.length === 0) dispatch({ type: 'setStartTime', startTime: Date.now() })

    dispatch({
      type: 'setToggleRandom', toggleRandom: setInterval((crds) => dispatch({ type: 'setCards', cards: randCards(crds) })
        , 800, state.cards)
    })
  }

  const onStopRandom = () => {
    clearInterval(state.toggleRandom)
    dispatch({ type: 'setToggleRandom', toggleRandom: null })
    dispatch({ type: 'setToggleCardsModal', toggleCardsModal: true })

    const numsArr = JSON.parse(JSON.stringify(state.cards))
    let isTwoSame
    do {
      isTwoSame = false
      let changeIdx = null

      numsArr.forEach((card, i) => {
        if (numsArr.some((c, j) => i !== j && c.y === card.y)) {
          isTwoSame = true
          changeIdx = i
        }
      })

      if (changeIdx) {
        numsArr[changeIdx].y = utilService.getRandomIntInc(20, window.height - 130)
        setTimeout(() => dispatch({ type: 'setCards', cards: numsArr }), 300)
      }
    } while (isTwoSame)
    // setTimeout(() => dispatch({ type: 'setCards', cards: utilService.get21Cards(window, 50) }), 2500)

    state.randResults.push(numsArr
      .sort((a, b) => a.y > b.y ? 1 : -1)
      .map(card => card.num / 10 >= 1 ? card.num + '' : '0' + card.num)
    )
    dispatch({ type: 'setRandResults', randResults: state.randResults })
  }

  const onCardSelect = () => {
    if (state.randResults.length === 3) {
      userDetails.times = (Date.now() - state.startTime) / 1000
      onFinishPlay()
      dispatch({ type: 'setToggleCardsModal', toggleCardsModal: false })
      return
    }

    dispatch({ type: 'setToggleCardsModal', toggleCardsModal: false })
    onStartRandom()
  }

  const randCards = (cards) => {
    const [startX, endX] = [((window.width / 5) / 2) - cards[0].width / 2, window.width - cards[0].width - 5]
    const [startY, endY] = [20, window.height - 150]

    return cards.map(card => {
      card.x = utilService.getRandomIntInc(startX, endX)
      card.y = utilService.getRandomIntInc(startY, endY)
      return card
    })
  }

  const onFinishPlay = async () => {
    userDetails.results = [...state.randResults]
    await userService.addUser(userDetails)
  }

  return (
    <div className='card-app'>
      {state.randResults.length === 0 || state.toggleRandom ? <section className={'action-panel ' + (state.toggleRandom ? 'on-random' : '')} >
        {!state.toggleRandom ? <h1>{i18nService.getTranslation('press-to-shuffle', langType)}</h1> : null}
        {!state.toggleRandom ?
          <button className='btn' onClick={onStartRandom}>{i18nService.getTranslation('start', langType)}</button>
          :
          <button className='btn' onClick={onStopRandom}>{i18nService.getTranslation('stop-shuffle', langType)}</button>
        }
      </section> : null}

      {state.toggleCardsModal ? <>
        <div className='screen'></div>
        <section className='shape-container'>
          <h1 className='card-select-title'>{i18nService.getTranslation(state.randResults.length === 3 ? 'last-card' : 'select-card', langType)}</h1>
          <section className='card-list'>
            {utilService.get6Cards(window).map((card, i) =>
              <article key={i} className={`card-item select-change-${i % 2}`} onClick={onCardSelect} style={{ width: card.width, height: card.width * 1.5 }}>
                <p>{card.num}</p>
              </article>)}
          </section>
        </section>
      </> : null}

      {state.randResults.length === 3 && !state.toggleCardsModal ? <>
        <div className='screen'></div>
        <section className='finish-modal-container'>
          <h1>{userDetails.fullname + ' - ' + userDetails.digits}</h1>
          <div>
            <h3>{i18nService.getTranslation('biofollow-thanks', langType)}</h3>
            <h3>{i18nService.getTranslation('biofollow-submitted', langType)}</h3>
          </div>
          <button className='btn' onClick={onSubmitDetails}>{i18nService.getTranslation('biofollow-back', langType)}</button>
        </section>
      </> : null}

      <section className='cards-display'>
        <CardList cards={state.cards} />
      </section>
    </div>
  )
}