import { utilService } from "../services/utilService"

export function CardPreview({ card }) {
  const cardStyle = {
    width: card.width,
    height: card.width * 1.5,
    left: card.x,
    top: card.y,
    fontSize: utilService.getRandomIntInc(10, 50)
  }

  return (
    <article className="card-preview color-change vibrate-1 flex align-center justify-center" style={cardStyle}>
      <p>{card.num}</p>
    </article>
  )
}
