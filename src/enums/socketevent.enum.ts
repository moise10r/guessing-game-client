export enum WebSocketEvents {
  PLAYER_JOIN = 'add_player',
  PLAYER_ADDED = 'player_added',
  UPDATE_PLAYER = 'update_player',
  STARTS_ROUND = 'start_round',
  ROUND_STARTED = 'round_started',
  CHAT = 'chat_message',
  BROADCAST_FREEZE_POINT = 'send_freeze_point',
  ROUND_ENDED = 'round_ended',
  SEND_SCORE = 'send_score',
}
