import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { CardList } from '../cmps/CardList'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'
import { utilService } from '../services/utilService'

export function CardApp() {

  const userDetails = useOutletContext()
  const window = useWindowDimensions()
  const [cards, setCards] = useState(utilService.get21Cards(window, 50))
  let [isRandomising, setIsRandomising] = useState(null)
  let [randResults, setRandResults] = useState([])

  useEffect(() => {
    if (!isRandomising)
      setCards(utilService.get21Cards(window, 50))
  }, [window])

  const onStartRandom = () => {
    setCards(randCards(cards))

    setIsRandomising(
      setInterval((crds) =>
        setCards(randCards(crds))
        , 900, cards))
  }

  const onStopRandom = () => {
    clearInterval(isRandomising)
    setIsRandomising(null)

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
        numsArr[changeIdx].y = utilService.getRandomIntInc(50, window.height - window.height / 7)
        setTimeout(() => setCards(numsArr), 300)
      }
    } while (isTwoSame)
    // setTimeout(() => setCards(utilService.get21Cards(window, 50)), 2500)

    if (randResults.length < 3) {
      randResults.push(numsArr.sort((a, b) => a.y > b.y ? 1 : -1).map(c => c.num))
      setRandResults(randResults)
    }

    if (randResults.length === 3) onFinishRandom()
  }

  const randCards = (cards) => {
    const [startX, endX] = [((window.width / 5) / 2) - cards[0].width / 2, window.width - cards[0].width - 5]
    const [startY, endY] = [50, window.height - window.height / 7]

    return cards.map(card => {
      card.x = utilService.getRandomIntInc(startX, endX)
      card.y = utilService.getRandomIntInc(startY, endY)
      return card
    })
  }

  const onFinishRandom = () => {
    userDetails.results = [...randResults]
    console.log(userDetails);
  }

  return (
    <div className='card-app'>
      <section className='action-panel'>
        <h1>{userDetails.fullname}</h1>
        {!isRandomising ?
          <button className='btn' onClick={onStartRandom}>Start Random</button>
          :
          <button className='btn' onClick={onStopRandom}>Stop Random</button>
        }
      </section>



      <section className='cards-display'>
        <CardList cards={cards} />
      </section>
    </div>
  )
}