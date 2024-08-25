import { createPlayer, updatePlayer } from '@/utils/services/playerService';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Player {
  _id?: string;
  name: string;
  dateOfBirth: string;
  position: string;
  teamId?: number;
  statisticsId?: number;
  injuries?: string[];
  trainingSessions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface PlayerDialogProps {
  open: boolean;
  onClose: () => void;
  player?: Player | null;
}

const PlayerDialog: React.FC<PlayerDialogProps> = ({ open, onClose, player }) => {
  const [formData, setFormData] = useState<Player>(player || {
    name: '',
    dateOfBirth: '',
    position: '',
    statisticsId: -1,
    trainingSessions: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (player && player._id) {
      await updatePlayer(player._id, formData);
    } else {
      await createPlayer(formData);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">{player ? 'Edit Player' : 'Add Player'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="dateOfBirth">
              Date of Birth:
            </label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="position">
              Position:
            </label>
            <input
              id="position"
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="teamId">
              Team ID:
            </label>
            {/* <input
              id="teamId"
              type="text"
              name="teamId"
              value={formData.teamId ?? ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
          </div>
          {/* Add more fields as necessary */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerDialog;
