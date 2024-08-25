import { createCoach, updateCoach } from '@/utils/services/coachService';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Coach {
  _id?: string;
  name: string;
  dateOfBirth: string;
  teamId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CoachDialogProps {
  open: boolean;
  onClose: () => void;
  coach?: Coach;
}

const CoachDialog: React.FC<CoachDialogProps> = ({ open, onClose, coach }) => {
  const [formData, setFormData] = useState<Coach>(coach || {
    name: '',
    dateOfBirth: '',
    teamId: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (coach && coach._id) {
      await updateCoach(coach._id, formData);
    } else {
      await createCoach(formData);
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
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Team ID:</label>
            <input
              type="text"
              name="teamId"
              value={formData.teamId}
              onChange={handleChange}
            />
          </div>
          {/* Add more fields if necessary */}
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};

export default CoachDialog;
