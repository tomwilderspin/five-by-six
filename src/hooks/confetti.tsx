import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export const useConfetti = () => {
  const { width, height } = useWindowSize();
  return {
    windowConfetti: <Confetti width={width} height={height} recycle={false} />,
  }
};
