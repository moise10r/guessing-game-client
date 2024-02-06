import { IPlayer } from "@/app/dto/playerRound.dto";
import { RankPlayer } from "@/interfaces/player.interface";


export const computerScoreForPlayer = (player: IPlayer): RankPlayer => {
    if (player.multiplier === player.freezePoint) {
      // Player guessed correctly, update score
      player.score += player.points * player.multiplier;
    } else {
      player.score -= player.points;
    }
    const rankPlayer: RankPlayer = {
        name: player.name,
        score: player.score
    }
    return rankPlayer
  };