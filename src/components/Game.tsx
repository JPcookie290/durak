import axios from "axios";
import { useState, useEffect } from "react";
import { ICard } from "./interfaces/interfaces.ts";

import Hand from "./Hand";
import CardDeck from "./CardDeck";
import Winner from "./Winner.tsx";

const validRanks = ["6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

function sortCardsByValue(a: ICard, b: ICard) {
  return validRanks.indexOf(b.value) - validRanks.indexOf(a.value);
}

function getRandomCard(cards: ICard[]) {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

export default function Game() {
  // variables
  const [deckId, setDeckId] = useState<string>("");

  const [trumpCard, setTrumpCard] = useState<ICard>();
  // Different deck arrays
  const [playerHand, setPlayerHand] = useState<ICard[]>([]);
  const [computerHand, setComputerHand] = useState<ICard[]>([]);
  const [deck, setDeck] = useState<ICard[]>([]);
  const [playedCards, setPlayedCards] = useState<ICard[]>([]);
  // Different boolean variables for game logic
  const [playerAttacker, setPlayerAttacker] = useState<boolean>(true);
  const [computerDefended, setComputerDefended] = useState<boolean>(false);
  const [playerDefended, setPlayerDefended] = useState<boolean>(false);
  const [playerWon, setPlayerWon] = useState<string | null>(null);
  // Turn counter
  const [turn, setTurn] = useState(1);

  useEffect(() => {
    const fetchDeck = async () => {
      const deckResponse = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const deckId = deckResponse.data.deck_id;
      setDeckId(deckId);

      const drawResponse = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
      );
      const allCards = drawResponse.data.cards.filter((card: ICard) =>
        validRanks.includes(card.value)
      );
      const shuffledDeck = allCards.sort(() => 0.5 - Math.random());
      setPlayerHand(shuffledDeck.slice(0, 6).sort(sortCardsByValue));
      setComputerHand(shuffledDeck.slice(6, 12).sort(sortCardsByValue));
      setDeck(shuffledDeck.slice(12));
      setTrumpCard(getRandomCard(shuffledDeck));
    };

    fetchDeck();
  }, []);

  const drawCards = () => {
    while (playerHand.length < 6 && deck.length > 0) {
      playerHand.push(deck.shift() as ICard);
    }
    setPlayerHand([...playerHand].sort(sortCardsByValue));
    while (computerHand.length < 6 && deck.length > 0) {
      computerHand.push(deck.shift() as ICard);
    }
    setComputerHand([...computerHand].sort(sortCardsByValue));
  };

  const selectCard = (card: ICard) => {
    if (playedCards.length == 0) {
      setPlayedCards([...playedCards, card]);
      setPlayerHand(playerHand.filter((pCard) => pCard.code !== card.code));
      console.log("check");
      computerSelectCard(card);
    } else {
      const lastPlayedCard = playedCards[playedCards.length - 1];
      if (
        card.value > lastPlayedCard.value &&
        card.suit == lastPlayedCard.suit
      ) {
        setPlayedCards([...playedCards, card]);
        setPlayerHand(playerHand.filter((pCard) => pCard.code !== card.code));
        console.log("check");
        computerSelectCard(card);
      }
    }
  };

  const computerSelectCard = (card: ICard) => {
    console.log("check");

    computerHand.forEach((playedCard) => {
      if (playedCard.value > card.value && playedCard.suit == card.suit) {
        console.log(playedCard);
        setPlayedCards([...playedCards, playedCard]);
        setComputerHand(
          computerHand.filter((cCard) => cCard.code !== playedCard.code)
        );
        setComputerDefended(true);
      } else {
        setComputerDefended(false);
      }
    });
  };

  const computerAttack = () => {
    console.log("computer attack", playerAttacker);
    const attackCard = getRandomCard(computerHand);
    setPlayedCards([...playedCards, attackCard]);
  };

  const checkGameEnd = () => {
    if (deck.length == 0 && computerHand.length) {
      console.log("computer won");
      setPlayerWon("computer");
    }
    if (deck.length == 0 && playerHand.length) {
      console.log("player won");
      setPlayerWon("player");
    }
  };

  const endTurn = () => {
    console.log("test endAttack", playedCards.length);
    if (deck.length > 0) {
      drawCards();
    } else {
      checkGameEnd();
    }
    if (!computerDefended && playerAttacker) {
      setComputerHand([...computerHand, ...playedCards]);
      setPlayedCards([]);
      setPlayerAttacker(false);
    }
    if (!playerDefended && !playerAttacker) {
      setPlayerHand([...playerHand, ...playedCards]);
      setPlayedCards([]);
      setPlayerAttacker(true);
    }

    setTurn(turn + 1);

    if (playerAttacker) {
      computerAttack();
    }
  };

  return (
    <div>
      {!playerWon && (
        <div>
          <h1>Durak Game</h1>
          <Hand cards={computerHand} isPlayer={false} />
          <CardDeck
            deck={deck}
            playedCard={playedCards[playedCards.length - 1]}
            trumpCard={trumpCard}
          />
          <Hand cards={playerHand} isPlayer={true} selectCard={selectCard} />
          <button onClick={() => endTurn()}>
            End {playerAttacker ? "Attack" : "Defend"}
          </button>
        </div>
      )}
      {playerWon && <Winner winner={playerWon} turn={turn} />}
    </div>
  );
}
