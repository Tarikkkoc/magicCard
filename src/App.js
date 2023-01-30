import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

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
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);


  // shuffle cards

  const shuffleCards = () => { // kartları karıştır.
    const shuffleCards = [...cardImages, ...cardImages]. // shuffleCards değişkenine cardImg nesnesini iki kere depoladık (2*6 = 12 olacak şekide)
    sort(() => Math.random() - 0.5). // dizi negatif veya pozitif olacak şekilde sıralanır
    map( (card) => ({...card, id: Math.random() } )) // sıralanan dizi maplenir ve card adında dizide depolanır.

    setCards(shuffleCards); // boş nesne olan cards'a shuffleCards ile oluşturulan yeni nesneyi atar.
    setTurns(0);
  }

    // handle a Choice
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card) // chociceOne null ise false ( setChoiceOne(card) ) değeri varsa null değilse ( setChoiceTwo(card) )
    }

    // compare(karşılaştır) 2 selected card
    useEffect( () => {
      if(choiceOne && choiceTwo) {
        if(choiceOne.src === choiceTwo.src){
          console.log("those cards match");
          resetTurn()
        } else{
          console.log("those cards don't match");
          resetTurn();
        }
      }
    }, [choiceOne, choiceTwo])

    // reset choices and increase turn
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1)
    }

  return (
    <div className="App">
        <h1>Magic Card</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
          {cards.map(card => (
           <SingleCard 
           key={card.id} 
           card={card}
           handleChoice={handleChoice}
           />
          ))}
        </div>
    </div>
  );
}

export default App;
