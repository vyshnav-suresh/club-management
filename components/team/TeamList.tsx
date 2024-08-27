// src/components/TeamList.tsx
"use client";
import React, { useState, useEffect } from "react";
import { deleteTeam, fetchTeams } from "@/utils/services/teamService";
import Dashboard from "../Dashboard";
import TeamDialog from "./TeamDialog";
import { TeamType } from "@/utils/type/team";
import { useDeleteTeam, useTeams } from "@/utils/hooks/teamHook";

const TeamList: React.FC = () => {
  const { data: teams, isLoading } = useTeams();
  const [data, setData] = useState<any>(teams);
  const { deleteTeamData } = useDeleteTeam();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const handleEdit = (team: TeamType) => {
    setSelectedTeam(team);
    setDialogOpen(true);
  };
  const handleDelete = async (id: string) => {
    await deleteTeamData(id);
  };
  useEffect(() => {
    if (!isLoading) {
      setData(teams);
    }
  }, [isLoading, teams]);

  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Team List</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setDialogOpen(true)}
          >
            Add Team
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Coach</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.length > 0 ? (
                data?.map((team: TeamType) => (
                  <tr key={team._id}>
                    <td className="px-4 py-2 border-b">{team.name}</td>
                    <td className="px-4 py-2 border-b">{team.coachId}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="text-blue-500 hover:underline mr-2"
                        onClick={() => handleEdit(team)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(team._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 border-b text-center" colSpan={3}>
                    No teams found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dialogOpen && (
          <TeamDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            team={selectedTeam}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default TeamList;
