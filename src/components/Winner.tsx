type Props = {
  winner: string;
  turn: number;
};

export default function Winner({ winner, turn }: Props) {
  if (winner === "player") {
    return (
      <div className="winner">
        <h1>Congratulations!! You won the Game!</h1>
        <p>You played a total of {turn} Rounds.</p>
      </div>
    );
  } else {
    return (
      <div className="loser">
        <h1>You Lost!</h1>
        <p>You played a total of {turn} Rounds.</p>
      </div>
    );
  }
}
