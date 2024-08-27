"use client";
import React, { useEffect, useState } from "react";
import PlayerDialog from "./PlayerDialog";
import Dashboard from "../Dashboard";
import {
  usePlayers,
  useCreatePlayer,
  useUpdatePlayer,
} from "@/utils/hooks/playerHook";
import { useDeletePlayer } from "@/utils/hooks/playerHook";

interface Player {
  _id: string;
  name: string;
  dateOfBirth: string;
  position: string;
  teamId: string;
  statisticsId: string;
  injuries: string[];
  trainingSessions: string[];
  createdAt: string;
  updatedAt: string;
}

const PlayerList: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Use the hooks to interact with the server
  const { playerList, isLoading, error } = usePlayers();
  const [data, setData] = useState<any>(!isLoading && playerList);
  const { addPlayer } = useCreatePlayer();
  const { updatePlayerData } = useUpdatePlayer();
  const { deletePlayerData } = useDeletePlayer();
  useEffect(() => {
    if (!isLoading) {
      setData(playerList);
    }
    console.log(data, "data");
  }, [isLoading, playerList]);
  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePlayerData(id);
  };

  const handleAddOrUpdatePlayer = (player: Player) => {
    if (player._id) {
      updatePlayerData(player);
    } else {
      addPlayer(player);
    }
    setDialogOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading players.</div>;
  }

  return (
    <Dashboard>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Player List</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setSelectedPlayer(null);
              setDialogOpen(true);
            }}
          >
            Add Player
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border-b">Name</th>
                <th className="px-4 py-2 text-left border-b">Position</th>
                <th className="px-4 py-2 text-left border-b">Team</th>
                <th className="px-4 py-2 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((player: Player) => (
                  <tr key={player._id}>
                    <td className="px-4 py-2 border-b">{player.name}</td>
                    <td className="px-4 py-2 border-b">{player.position}</td>
                    <td className="px-4 py-2 border-b">{player.teamId}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        className="text-blue-500 hover:underline mr-2"
                        onClick={() => handleEdit(player)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(player._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 border-b text-center" colSpan={4}>
                    No players found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {dialogOpen && (
          <PlayerDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            player={selectedPlayer}
            onSave={handleAddOrUpdatePlayer}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default PlayerList;
