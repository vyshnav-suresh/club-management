// src/hooks/useTeams.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTeam,
  deleteTeam,
  fetchTeams,
  updateTeam,
} from "../services/teamService";

export const useTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
  });
};

export const useCreateTeam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};

export const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateTeamData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => updateTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
  return {
    updateTeamData,
    error,
    isPending,
  };
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteTeamData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: any) => deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
  return {
    deleteTeamData,
    error,
    isPending,
  };
};
