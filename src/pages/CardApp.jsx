import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { CardList } from '../cmps/CardList'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'

export function CardApp() {

  const userDetails = useOutletContext()
  const window = useWindowDimensions()
  const [cards, setCards] = useState([])

  const get21Cards = () => {
    const cardsArr = []
    const heightDivide = 7
    const heightDistance = 50
    const widthDistance = ((window.width / 5) / 2) - 21

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        const newCard = {
          x: ((window.width / 5) * j) + widthDistance,
          y: ((window.height / heightDivide) * i) + heightDistance,
          num: (i + 1) * (j + 1) + ((4 - j) * i)
        }
        cardsArr.push(newCard)
      }
    }
    cardsArr.push({
      x: ((window.width / 5) * 2) + widthDistance,
      y: ((window.height / heightDivide) * 4) + heightDistance,
      num: 21
    })
    return cardsArr
  }

  useEffect(() => {
    setCards(get21Cards())
  }, [window])

  return (
    <div className='card-app flex'>
      <h1>{userDetails.fullname}</h1>
      <section className='cards-display'>
        <CardList cards={cards} />
      </section>
    </div>
  )
}