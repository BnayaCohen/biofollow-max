import { useEffect, useState } from 'react'
import { CardList } from '../cmps/CardList'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'
import { i18nService } from '../services/i18n-service'
import { userService } from '../services/user-service'
import { utilService } from '../services/utilService'

export function CardApp({ userDetails, onSubmitDetails, langType }) {

  const window = useWindowDimensions()
  const [cards, setCards] = useState([])
  const [toggleRandom, setToggleRandom] = useState(null)
  const [toggleCardsModal, setToggleCardsModal] = useState(false)
  const [randResults, setRandResults] = useState([])
  const [startTime, setStartTime] = useState(null)

  useEffect(() => {
    if (!toggleRandom)
      setCards(utilService.get21Cards(window))
  }, [window])

  const onStartRandom = () => {
    setCards(randCards(cards))

    if (randResults.length === 0) setStartTime(Date.now())

    setToggleRandom(
      setInterval((crds) => setCards(randCards(crds))
        , 800, cards))
  }

  const onStopRandom = () => {
    clearInterval(toggleRandom)
    setToggleRandom(null)
    setToggleCardsModal(true)

    const numsArr = JSON.parse(JSON.stringify(cards))
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
        setTimeout(() => setCards(numsArr), 300)
      }
    } while (isTwoSame)
    // setTimeout(() => setCards(utilService.get21Cards(window, 50)), 2500)

    randResults.push(numsArr
      .sort((a, b) => a.y > b.y ? 1 : -1)
      .map(card => card.num / 10 >= 1 ? card.num + '' : '0' + card.num)
    )
    setRandResults(randResults)
  }

  const onCardSelect = () => {
    if (randResults.length === 3) {
      userDetails.times = (Date.now() - startTime) / 1000
      onFinishPlay()
      setToggleCardsModal(false)
      return
    }

    setToggleCardsModal(false)
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
    userDetails.results = [...randResults]
    await userService.addUser(userDetails)
  }

  return (
    <div className='card-app'>
      {randResults.length === 0 || toggleRandom ? <section className={'action-panel ' + (toggleRandom ? 'on-random' : '')} >
        {!toggleRandom ? <h1>{i18nService.getTranslation('press-to-shuffle', langType)}</h1> : null}
        {!toggleRandom ?
          <button className='btn' onClick={onStartRandom}>{i18nService.getTranslation('start', langType)}</button>
          :
          <button className='btn' onClick={onStopRandom}>{i18nService.getTranslation('stop-shuffle', langType)}</button>
        }
      </section> : null}

      {toggleCardsModal ? <>
        <div className='screen'></div>
        <section className='shape-container'>
          <h1 className='card-select-title'>{i18nService.getTranslation(randResults.length === 3 ? 'last-card' : 'select-card', langType)}</h1>
          <section className='card-list'>
            {utilService.get6Cards(window).map((card, i) =>
              <article key={i} className={`card-item select-change-${i % 2}`} onClick={onCardSelect} style={{ width: card.width, height: card.width * 1.5 }}>
                <p>{card.num}</p>
              </article>)}
          </section>
        </section>
      </> : null}

      {randResults.length === 3 && !toggleCardsModal ? <>
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
        <CardList cards={cards} />
      </section>
    </div>
  )
}