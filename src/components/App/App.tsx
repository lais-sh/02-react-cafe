import { useState } from "react";
import css from "./App.module.css";
import type { Votes } from "../../types/votes";
import { type VoteType } from "../../types/votes";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import CafeInfo from "../CafeInfo/CafeInfo";

const initialVotes: Votes = { good: 0, neutral: 0, bad: 0 };

export default function App() {
  const [votes, setVote] = useState<Votes>(initialVotes);

  const handleVote = (type: VoteType): void => {
    setVote({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVote = (): void => setVote(initialVotes);

  const totalVotes: number = Object.values(votes).reduce(
    (sum, value) => sum + value,
    0
  );

  const positiveRate: number = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions
          onVote={handleVote}
          onReset={resetVote}
          canReset={totalVotes > 0}
        />
        {totalVotes ? (
          <VoteStats
            votes={votes}
            totalVotes={totalVotes}
            positiveRate={positiveRate}
          />
        ) : (
          <Notification />
        )}
      </div>
    </>
  );
}
