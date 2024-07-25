import { ICard } from "./interfaces/interfaces.ts";

type Props = {
  card: ICard;
  isPlayer: boolean;
  selectCard?: (card: ICard | unknown) => void; // had a problem with the type casting
};

export default function Card({ card, isPlayer, selectCard }: Props) {
  // if (isPlayer) {
  //   return (
  //     <div className="card">
  //       <img src={card.image} alt={`${card.value} of ${card.suit}`} />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="card">
  //       <img
  //         src="https://deckofcardsapi.com/static/img/back.png"
  //         alt="Card back"
  //       />
  //     </div>
  //   );
  // }
  // Testing
  return (
    <div
      className="card"
      onClick={() => isPlayer && selectCard && selectCard(card)}
    >
      <img src={card.image} alt={`${card.value} of ${card.suit}`} />
    </div>
  );
}
