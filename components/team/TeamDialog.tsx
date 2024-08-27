import { createTeam, updateTeam } from "@/utils/services/teamService";
import { TeamType } from "@/utils/type/team";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface TeamDialogProps {
  open: boolean;
  onClose: () => void;
  team?: TeamType | null;
}

const TeamDialog: React.FC<TeamDialogProps> = ({ open, onClose, team }) => {
  const [formData, setFormData] = useState<TeamType>(
    team || {
      name: "",
      coachId: "",
      players: [],
      _id: "",
      createdAt: "",
      updatedAt: "",
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (team && team._id) {
      await updateTeam({ id: team._id, team: formData });
    } else {
      await createTeam(formData);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {team ? "Edit Team" : "Add Team"}
        </h2>
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
            <label className="block text-sm font-medium mb-1" htmlFor="coachId">
              Coach ID:
            </label>
            <input
              id="coachId"
              type="text"
              name="coachId"
              value={formData.coachId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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

export default TeamDialog;
