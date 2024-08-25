// src/services/coachService.js

import { supabase } from "../supabase/client";

export const fetchCoaches = async () => {
  return await supabase.from('coaches').select('*');
};

export const createCoach = async (coach:any) => {
  return await supabase.from('coaches').insert(coach);
};

export const updateCoach = async (id:any, coach:any) => {
  return await supabase.from('coaches').update(coach).eq('_id', id);
};

export const deleteCoach = async (id:any) => {
  return await supabase.from('coaches').delete().eq('_id', id);
};
