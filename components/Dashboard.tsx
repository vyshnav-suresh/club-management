import React from "react";
import Sidebar from "./Sidebar";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-white p-4 rounded-lg shadow-md">{children}</div>
      </div>
    </div>
  );
};

export default Dashboard;
