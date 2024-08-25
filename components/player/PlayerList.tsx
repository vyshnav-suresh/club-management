"use client";
import React, { useState, useEffect } from 'react';
import { deletePlayer, fetchPlayers } from '@/utils/services/playerService';
import PlayerDialog from '../dialog/PlayerDialog';

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
  const [players, setPlayers] = useState<Player[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const loadPlayers = async () => {
      const { data } = await fetchPlayers();
      if(data){
      setPlayers(data);
      }
    };
    loadPlayers();
  }, []);

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deletePlayer(id);
    setPlayers(players.filter((player) => player._id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Player List</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setDialogOpen(true)}
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
            {players && players.length > 0 ? (
              players.map((player) => (
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
        />
      )}
    </div>
  );
};

export default PlayerList;
