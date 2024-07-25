import { ICard } from "./interfaces/interfaces.ts";

type Props = {
  deck: { code: string; suit: string; image: string; value: string }[];
  playedCard: ICard | null;
  trumpCard: ICard;
};

export default function CardDeck({ deck, playedCard, trumpCard }: Props) {
  return (
    <div className="deck">
      <div className="deck-container">
        {/* <div className="trump">
          <img
            className="trumpCard"
            src={trumpCard.image}
            alt={`${trumpCard.value} of ${trumpCard.suit}`}
          />
          <div>Trump Card</div>
        </div> */}
        {deck.length > 0 && (
          <div className="card">
            <img
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="Card back"
            />
            <div>{deck.length} cards remaining</div>
          </div>
        )}
        <div className="slot">
          {playedCard ? (
            <img
              className="stackCard"
              src={playedCard.image}
              alt={`${playedCard.value} of ${playedCard.suit}`}
            />
          ) : (
            <div className="empty-slot">Slot for played card</div>
          )}
        </div>
      </div>
    </div>
  );
}
