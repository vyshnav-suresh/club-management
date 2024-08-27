"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Players", href: "/players" },
    { name: "Teams", href: "/teams" },
    { name: "Coaches", href: "/coaches" },
  ];

  return (
    <div className="w-64 h-screen bg-blue-900 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">Club Management</h2>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`mb-4 rounded-lg ${
                pathname === item.href
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-800"
              }`}
            >
              <Link
                href={item.href}
                className={`block px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                  pathname === item.href ? "text-white" : "text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
