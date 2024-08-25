import { deleteCoach, fetchCoaches } from '@/utils/services/coachService';
import React, { useState, useEffect } from 'react';
import CoachDialog from '../dialog/CoachDialog';


interface Coach {
  _id: string;
  name: string;
  dateOfBirth: string;
  teamId: string;
  createdAt?: string;
  updatedAt?: string;
}

const CoachesListing: React.FC = () => {
  const [coaches, setCoaches] = useState<any>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    getCoaches();
  }, []);

  const getCoaches = async () => {
    const coachesData = await fetchCoaches();
    setCoaches(coachesData);
  };

  const handleOpenDialog = (coach?: Coach) => {
    setSelectedCoach(coach);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCoach(undefined);
    fetchCoaches(); // Refresh the list after any changes
  };

  const handleDeleteCoach = async (coachId: string) => {
    await deleteCoach(coachId);
    fetchCoaches(); // Refresh the list after deletion
  };

  return (
    <div>
      <h2>Coaches</h2>
      <button onClick={() => handleOpenDialog()}>Add New Coach</button>
      <ul>
        {coaches.map((coach:any) => (
          <li key={coach._id}>
            <span>{coach.name}</span> - <span>{coach.teamId}</span>
            <button onClick={() => handleOpenDialog(coach)}>Edit</button>
            <button onClick={() => handleDeleteCoach(coach._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isDialogOpen && (
        <CoachDialog open={isDialogOpen} onClose={handleCloseDialog} coach={selectedCoach} />
      )}
    </div>
  );
};

export default CoachesListing;
