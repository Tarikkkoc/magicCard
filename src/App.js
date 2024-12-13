import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/singleCard";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
    setShowPopup(false);
    setCount(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    // if (count === cards.length) {
    // } else {
    if (cards.length !== 0 && count === cards.length) {
      // console.log("finish", cards.length);
      setShowPopup(true);
    } else if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCount((prevCount) => prevCount + 2);
        // console.log("matched", count);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
    // }
  }, [choiceOne, choiceTwo]);

  // console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Card</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns | {turns}</p>
      <Popup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        position="right center"
        contentStyle={{
          backgroundColor: "#c23866",
          border: "2px solid #000",
          borderRadius: "10px",
          padding: "20px",
          width: "300px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Arka planı biraz karartır
        }}
      >
        <div>Congrats, you won in {turns} moves</div>
        <button onClick={shuffleCards}>New Game</button>
      </Popup>
    </div>
  );
}

export default App;
