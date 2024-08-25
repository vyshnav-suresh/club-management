import { createTeam, updateTeam } from '@/utils/services/teamService';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Team {
  _id?: string;
  name: string;
  coachId: string;
  players?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface TeamDialogProps {
  open: boolean;
  onClose: () => void;
  team?: Team;
}

const TeamDialog: React.FC<TeamDialogProps> = ({ open, onClose, team }) => {
  const [formData, setFormData] = useState<Team>(team || {
    name: '',
    coachId: '',
    players: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlayersChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      players: value.split(',').map(id => id.trim()), // Convert comma-separated values to array
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (team && team._id) {
      await updateTeam(team._id, formData);
    } else {
      await createTeam(formData);
    }
    onClose();
  };

  return (
    <div>
      {open && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Coach ID:</label>
            <input
              type="text"
              name="coachId"
              value={formData.coachId}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div>
            <label>Players (comma-separated IDs):</label>
            <input
              type="text"
              name="players"
              value={formData?.players.join(', ')}
              onChange={handlePlayersChange}
              required
            />
          </div> */}
          {/* Add more fields if necessary */}
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default TeamDialog;
