
import './singleCard.css'

export default function SingleCard({ card, handleChoice, flipped }) {
  const handleClick = () => {
    handleChoice(card) // kapalı karta tıklandığında açık resimli kartı atar. Arka yüze tıklandığında app.jsde handleChoice fonk. çalışır.
  }

  return (
    <div className="card">
    <div className={flipped ? "flipped" : ""}>
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
