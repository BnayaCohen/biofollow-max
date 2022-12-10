import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { CardList } from '../cmps/CardList'
import { useWindowDimensions } from '../customHooks/useWindowDimensions'

export function CardApp() {

  const userDetails = useOutletContext()
  const WindowWidth = useWindowDimensions().width
  const cards = []

  useEffect(() => {

  }, [])


  return (
    <div className='card-app flex'>
        <h1>{userDetails.fullname}</h1>
      <section className='cards-display'>
        <CardList cards={cards} />
      </section>
    </div>
  )
}