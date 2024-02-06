import { PlayerDto } from "@/app/dto/playerRound.dto";

export const computerScoreForPlayer = (player: PlayerDto): void => {
    if (player.points > 0) {
      // Player guessed correctly, update score
      player.score += player.points * player.multiplier;
    } else {
      player.score -= player.points;
    }
  };