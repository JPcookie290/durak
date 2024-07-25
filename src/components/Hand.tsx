import { ICard } from "./interfaces/interfaces.ts";
import Card from "./Card";

type Props = {
  cards: ICard[];
  isPlayer: boolean;
  selectCard?: (card: ICard | unknown) => void;
};

export default function Hand({ cards, isPlayer, selectCard }: Props) {
  return (
    <div className="hand">
      <h2>{isPlayer ? "Player:" : "Opponent:"}</h2>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isPlayer={isPlayer}
          selectCard={selectCard}
        />
      ))}
    </div>
  );
}
