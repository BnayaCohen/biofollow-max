import { CardPreview } from './CardPreview'

export function CardList({ cards }) {
    return (
        <section className='card-list'>
            {cards.map(card => <CardPreview key={card._id} card={card} />)}
        </section>
    )
}
