"use client";

import React from "react";
import useSWR from "swr";
import { fetchAds } from "../services/adService";
import AdList from "./AdList";
import { Ad } from "../types/ad";
import DarkModeToggle from "./shared/DarkModeToggleButton"; // Import the toggle button

const Dashboard: React.FC = () => {
  const { data: ads, error } = useSWR<Ad[]>("/api/ads", fetchAds);

  if (error)
    return (
      <div className="text-red-500 dark:text-red-300">Error loading ads.</div>
    );
  if (!ads)
    return <div className="text-gray-700 dark:text-gray-300">Loading...</div>;

  const today = new Date().toLocaleDateString();

  return (
    <div className="p-6 bg-white text-gray-700 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ads Scheduled for Today</h1>
        <DarkModeToggle /> {/* Add the toggle button */}
      </div>
      <p className="mb-2">Date: {today}</p>
      <h2 className="text-xl mb-4">Total Ads: {ads.length}</h2>

      <AdList ads={ads} />
    </div>
  );
};

export default Dashboard;
