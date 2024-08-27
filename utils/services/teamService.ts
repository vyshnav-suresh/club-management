// src/services/teamService.js

import { supabase } from "../supabase/client";

export const fetchTeams = async () => {
  return await supabase.from("Teams").select("*");
};

export const createTeam = async (team: any) => {
  return await supabase.from("Teams").insert(team);
};

export const updateTeam = async (data: { id?: any; team?: any }) => {
  return await supabase.from("Teams").update(data.team).eq("_id", data.id);
};

export const deleteTeam = async (id: any) => {
  return await supabase.from("Teams").delete().eq("_id", id);
};
