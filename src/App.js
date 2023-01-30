import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/singleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([]); // kartların saklanması için oluşturduğumuz değişken
  const [turns, setTurns] = useState(0) // oyun turu için
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false); // kartlara tıklandıktan sonra yeni bir kart açılmasın (karışıklık olmasın diye)


  // shuffle cards

  const shuffleCards = () => { // kartları karıştır.
    const shuffleCards = [...cardImages, ...cardImages]. // shuffleCards değişkenine cardImg nesnesini iki kere depoladık (2*6 = 12 olacak şekide)
    sort(() => Math.random() - 0.5). // dizi negatif veya pozitif olacak şekilde sıralanır
    map( (card) => ({...card, id: Math.random() } )) // sıralanan dizi maplenir ve card adında dizide depolanır.

    setChoiceOne(null); // oyun başladığında seçili kart olmasın
    setChoiceTwo(null);
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
        setDisabled(true); // kartlar karıştırılırken true
        if(choiceOne.src === choiceTwo.src){
          setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceOne.src){
                return {...card, matched: true}
              } else{
                return card
              }
            })
          })
          resetTurn()
        } else{
          setTimeout( () => resetTurn(), 1000)
        }
      }
    }, [choiceOne, choiceTwo])

  console.log(cards)

    // reset choices and increase turn
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns + 1)
      setDisabled(false); // resetlendikten sonra tekrar false
    }

    // start new game automatic
    useEffect(() => {
      shuffleCards();
    }, [])

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
           flipped={card === choiceOne || card === choiceTwo || card.matched} // kartın çevrilmesi içinm gerekli olan 3 senaryo
           disabled={disabled}
           />
          ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
