// src/hooks/useCoachs.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCoach,
  deleteCoach,
  fetchCoaches,
  updateCoach,
} from "../services/coachService";

export const useCoachs = () => {
  return useQuery({
    queryKey: ["Coachs"],
    queryFn: fetchCoaches,
  });
};
export function useCreateCoach() {
  const queryClient = useQueryClient();
  const {
    mutate: addCoach,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => createCoach(data),
    onSuccess: (response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["Coachs"],
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
    addCoach,
    error,
    isPending,
  };
}
export const useUpdateCoach = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateCoachData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => updateCoach(data),
    onSuccess: (response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["Coachs"],
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
    updateCoachData,
    error,
    isPending,
  };
};

export const useDeleteCoach = () => {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCoachData,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: any) => deleteCoach(data),
    onSuccess: (response) => {
      //   if (response.success) {
      //     toast.success(response.message);
      queryClient.invalidateQueries({
        queryKey: ["Coachs"],
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
    deleteCoachData,
    error,
    isPending,
  };
};
