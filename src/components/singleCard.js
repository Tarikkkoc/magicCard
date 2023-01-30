
import './singleCard.css'

export default function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className="card">
    <div>
      <img src={card.src} className="front" alt="card front" /> {/* shuffleCardsın içerisinde en son oluşturulan card dizisinin srcsini ekledik.*/}
      <img src="/img/cover.png"
       onClick={handleClick} 
       className="back" 
       alt="card back" 
       />
    </div>
  </div>
  )
}
