// src/services/playerService.js

import { supabase } from "../supabase/client";

export const fetchPlayers = async () => {
  return await supabase.from('Players').select('*');
};

export const createPlayer = async (player:any) => {
  return await supabase.from('Players').insert(player);
};

export const updatePlayer = async (id:any,player:any) => {
  return await supabase.from('Players').update(player).eq('_id', id);
};
export const deletePlayer = async (id:any) => {
  return await supabase.from('Players').delete().eq('_id', id);
};
