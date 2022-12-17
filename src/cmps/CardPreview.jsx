export function CardPreview({ card }) {
  const cardStyle = {
    width: card.width,
    height: card.width * 1.5,
    left: card.x,
    top: card.y,
  }

  return (
    <article className="card-preview" style={cardStyle}>
      <p>{card.num}</p>
    </article>
  )
}
