"use client";
import React, { useState } from "react";

interface TabsProps {
    tabs: any
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const presentationContent = (
    <div>
        Présentation de l'é
    </div>
  )

  return (
    <div>
      <div className="flex space-x-2 border-0">
        {tabs.map((tab: any, index: any) => (
          <button
            key={index}
            style={{border: "0px", borderRadius:"10px 10px 0px 0px"}}
            className={`py-2 p-4 md:px-10 text-xl ${
              activeTab === index
                ? "border-b-2 bg-white text-black"
                : "bg-[#ea8c48]"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="bg-white p-4" style={{borderRadius:"0px 0px 10px 10px"}}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;