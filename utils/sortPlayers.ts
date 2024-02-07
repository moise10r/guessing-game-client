import { IPlayer } from "@/app/dto/playerRound.dto";

export const movePlayerToFirst = (players: IPlayer[], playerName: string):IPlayer[] => {
    const playerIndex = players.findIndex(player => player.name === playerName);
    if (playerIndex !== -1) {
      const player = players.splice(playerIndex, 1)[0];
      players.unshift(player);
    }
    return players;
  };