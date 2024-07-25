type Props = {
  showGame: () => void;
};

export default function StartScreen({ showGame }: Props) {
  return (
    <div>
      <h1>Durak Game</h1>
      <p>
        Is a card game where the aim is to be the first to discard all your
        cards. You begin as the attacker by playing a card first.
        <br />
        The computer will try to defend with a higher card of the same suit or a
        trump card
        <br />
        If it can't, the computer takes the cards on the stack.
        <br /> After your attack, draw cards to return your hand to 6 cards. The
        computer then attacks with an Card.
        <br />
        You then try to defend with a higher card of the same suit.
        <br />
        If you can't defend, you take the cards.
        <br />
        The game continues until one player has no cards left and the stack is
        empty.
      </p>
      <button className="startButton" onClick={() => showGame}>
        Start
      </button>
    </div>
  );
}
