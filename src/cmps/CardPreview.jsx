import { utilService } from "../services/utilService"

export function CardPreview({ card }) {
const style ={left:card.x, top:card.y}
 
  // const cardStyle = { backgroundImage: `url(https://robohash.org/${card._id})` }
  return (
    <article className="card-preview" style={style}>
      <p>{card.num}</p>
    </article>
  )
}
