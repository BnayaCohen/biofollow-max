import { CardPreview } from './CardPreview'

export function CardList({ cards }) {
    if (!cards.length) return (<div>load...</div>)
    
    return (
        <section className='card-list'>
            {cards.map((card, i) => <CardPreview key={i} card={card} />)}
        </section>
    )
}
