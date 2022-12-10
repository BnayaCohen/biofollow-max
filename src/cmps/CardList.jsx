import { CardPreview } from './CardPreview'

export function CardList({ cards }) {
    return (
        <section className='card-list'>
            {cards.map((card,i) => <CardPreview key={i} card={card} />)}
        </section>
    )
}
