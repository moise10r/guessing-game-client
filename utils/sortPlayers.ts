import { PlayerDto } from "@/app/dto/playerRound.dto";

export const movePlayerToFirst = (players: PlayerDto[], playerName: string):PlayerDto[] => {
    const playerIndex = players.findIndex(player => player.name === playerName);
    if (playerIndex !== -1) {
      const player = players.splice(playerIndex, 1)[0];
      players.unshift(player);
    }
    return players;
  };