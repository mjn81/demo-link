import { getRoomHistory } from "api/room"
import { useQuery } from "react-query"

export const useRoomHistoryQuery = (id:string) => {
  return useQuery(['room-history', id], () => getRoomHistory(id), {
    cacheTime: 500000
  });
}