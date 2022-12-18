import { useEffect, useState } from 'react'
import { CardList } from '../cmps/CardList'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'
import { i18nService } from '../services/i18n-service'
import { userService } from '../services/user-service'
import { utilService } from '../services/utilService'

export function CardApp({ userDetails, onSubmitDetails }) {

  const window = useWindowDimensions()
  const [cards, setCards] = useState([])
  const [toggleRandom, setToggleRandom] = useState(null)
  const [toggleCardsModal, setToggleCardsModal] = useState(false)
  const [randResults, setRandResults] = useState([])
  const langType = 'he'

  useEffect(() => {
    if (!toggleRandom)
      setCards(utilService.get21Cards(window))
  }, [window])

  const onStartRandom = () => {
    setCards(randCards(cards))

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
        numsArr[changeIdx].y = utilService.getRandomIntInc(50, window.height - 130)
        setTimeout(() => setCards(numsArr), 300)
      }
    } while (isTwoSame)
    // setTimeout(() => setCards(utilService.get21Cards(window, 50)), 2500)

    if (randResults.length < 3) {
      randResults.push(numsArr
        .sort((a, b) => a.y > b.y ? 1 : -1)
        .map(card => card.num / 10 >= 1 ? card.num + '' : '0' + card.num)
      )
      setRandResults(randResults)
    }
  }

  const onCardSelect = () => {
    if (randResults.length === 3) {
      onFinishPlay()
      setToggleCardsModal(false)
      return
    }

    setToggleCardsModal(false)
    onStartRandom()
  }

  const randCards = (cards) => {
    const [startX, endX] = [((window.width / 5) / 2) - cards[0].width / 2, window.width - cards[0].width - 5]
    const [startY, endY] = [50, window.height - 130]

    return cards.map(card => {
      card.x = utilService.getRandomIntInc(startX, endX)
      card.y = utilService.getRandomIntInc(startY, endY)
      return card
    })
  }

  const onFinishPlay = async () => {
    userDetails.results = [...randResults]
    console.log(userDetails);
    console.log(await userService.addUser(userDetails))
  }

  return (
    <div className='card-app'>
      {randResults.length === 0 || toggleRandom ? <section className={'action-panel ' + (toggleRandom ? 'on-random' : '')} >
        {!toggleRandom ? <h1>Press to shuffle the cards</h1> : null}
        {!toggleRandom ?
          <button className='btn' onClick={onStartRandom}>{i18nService.getTranslation('start', langType)}</button>
          :
          <button className='btn' onClick={onStopRandom}>Stop shuffle</button>
        }
      </section> : null}

      {toggleCardsModal ? <>
        <div className='screen'></div>
        <section className='shape-container'>
          <h1 className='card-select-title'>{randResults.length === 3 ? 'Last select...' : 'Select card to continue'}</h1>
          <section className='card-list'>
            {utilService.get6Cards(window).map((card, i) =>
              <article key={i} className="card-item" onClick={onCardSelect} style={{ width: card.width, height: card.width * 1.5 }}>
                <p>{card.num}</p>
              </article>)}
          </section>
        </section>
      </> : null}

      {randResults.length === 3 && !toggleCardsModal ? <>
        <div className='screen'></div>
        <section className='finish-modal-container'>
          <h1>Thank you for using BioFollow!</h1>
          <h3>Your details has been submitted successfully.</h3>
          <button className='btn' onClick={onSubmitDetails}>Press here to start again</button>
        </section>
      </> : null}

      <section className='cards-display'>
        <CardList cards={cards} />
      </section>
    </div>
  )
}