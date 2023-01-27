import { useState } from 'react';
import './App.css';

const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"},
]

function App() {

  const [cards, setCards] = useState([]); // kartların saklanması için oluşturduğumuz değişken
  const [turns, setTurns] = useState(0) // oyun turu için

  // shuffle cards

  const shuffleCards = () => { // kartları karıştır.
    const shuffleCards = [...cardImages, ...cardImages]. // shuffleCards değişkenine cardImg nesnesini iki kere depoladık (2*6 = 12 olacak şekide)
    sort(() => Math.random() - 0.5). // dizi negatif veya pozitif olacak şekilde sıralanır
    map( (card) => ({...card, id: Math.random() } )) // sıralanan dizi maplenir ve card adında dizide depolanır.

    setCards(shuffleCards); // boş nesne olan cards'a shuffleCards ile oluşturulan yeni nesneyi atar.
    setTurns(0);
  }
  console.log(cards, turns);
  return (
    <div className="App">
        <h1>Magic Card</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
          {cards.map(card => (
            <div className="card" key={card.id}>
              <div>
                <img src={card.src} className="front" alt="card front" /> {/* shuffleCardsın içerisinde en son oluşturulan card dizisinin srcsini ekledik.*/}
                <img src="/img/cover.png" className="back" alt="card back" />
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
