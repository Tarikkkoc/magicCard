
import './singleCard.css'

export default function SingleCard({ card }) {
  return (
    <div className="card">
    <div>
      <img src={card.src} className="front" alt="card front" /> {/* shuffleCardsın içerisinde en son oluşturulan card dizisinin srcsini ekledik.*/}
      <img src="/img/cover.png" className="back" alt="card back" />
    </div>
  </div>
  )
}
