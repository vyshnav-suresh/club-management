// src/services/playerService.js

import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

export const fetchPlayers = async () => {
  const data = await supabase.from("Players").select("*");
  if (data.error) {
    console.log(data.error);
  }
  console.log(data.data);

  return data.data;
};

export const createPlayer = async (
  player: any
): Promise<PostgrestSingleResponse<null>> => {
  return await supabase.from("Players").insert(player);
};

export const updatePlayer = async (data: any) => {
  return await supabase.from("Players").update(data.player).eq("_id", data.id);
};
export const deletePlayer = async (id: any) => {
  return await supabase.from("Players").delete().eq("_id", id);
};
