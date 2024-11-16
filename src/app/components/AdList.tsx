import React from "react";
import { Ad } from "../types/ad";
import AdItem from "./AdItem";

interface AdListProps {
  ads: Ad[];
}

const AdList: React.FC<AdListProps> = ({ ads }) => (
  <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
    <thead className="bg-gray-200 dark:bg-gray-700">
      <tr>
        <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
          Ad Title
        </th>
        <th className="py-2 px-4 border-b text-left text-gray-700 dark:text-gray-300">
          Download
        </th>
      </tr>
    </thead>
    <tbody>
      {ads.map((ad) => (
        <AdItem key={ad.id} ad={ad} />
      ))}
    </tbody>
  </table>
);

export default AdList;
