// src/services/teamService.js

import { supabase } from "../supabase/client";

export const fetchTeams = async () => {
  return await supabase.from('teams').select('*');
};

export const createTeam = async (team:any) => {
  return await supabase.from('teams').insert(team);
};

export const updateTeam = async (id:any, team:any) => {
  return await supabase.from('teams').update(team).eq('_id', id);
};

export const deleteTeam = async (id:any) => {
  return await supabase.from('teams').delete().eq('_id', id);
};
