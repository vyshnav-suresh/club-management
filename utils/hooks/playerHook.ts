// src/hooks/usePlayers.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlayer,
  deletePlayer,
  fetchPlayers,
  updatePlayer,
} from "../services/playerService";

export const usePlayers = () => {
  const {
    isLoading,
    data: playerList,
    error,
  } = useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });
  return {
    isLoading,
    playerList,
    error,
  };
};
export function useCreatePlayer() {
  const queryClient = useQueryClient();
  const {
    mutate: addPlayer,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => createPlayer(data),
    onSuccess: (response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["players"],
      });
      //   }

      // queryClient.setQueryData(["jobList"], response.data);
    },
    onError: (err) => {
      // console.error("Error: ", err.message);
      console.log(err);
    },
  });

  return {
    addPlayer,
    error,
    isPending,
  };
}
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updatePlayerData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => updatePlayer(data),
    onSuccess: (response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["players"],
      });
      //   }

      // queryClient.setQueryData(["jobList"], response.data);
    },
    onError: (err) => {
      // console.error("Error: ", err.message);
      console.log(err);
    },
  });

  return {
    updatePlayerData,
    error,
    isPending,
  };
};

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deletePlayerData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => deletePlayer(data),
    onSuccess: (response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["players"],
      });
      //   }

      // queryClient.setQueryData(["jobList"], response.data);
    },
    onError: (err) => {
      // console.error("Error: ", err.message);
      console.log(err);
    },
  });

  return {
    deletePlayerData,
    error,
    isPending,
  };
};
