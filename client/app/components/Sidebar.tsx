"use client";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // ikon kütüphanesi (lucide-react opsiyonel)

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Toggle Button */}
      {/* Sidebar */}
      <div
        className={`w-[250px] bg-gray-50 text-black transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-9/12"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Chats</h2>
            <button className=" text-black" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div
            className={`flex flex-col gap-5 mt-8 justify-center transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="flex flex-col w-full h-[50px] bg-black rounded-2xl items-center justify-center cursor-pointer">
              <div className="flex gap-2 items-center justify-evenly">
                <Image
                  src="/gptLogo.png"
                  alt="GPT Logo"
                  width={25}
                  height={50}
                  className="bg-white rounded-full"
                />
                <h1 className="font-medium text-[13px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden text-end">
                  JSON Format Hatası
                </h1>
              </div>
            </div>

            <div className="flex flex-col w-full h-[50px] bg-black rounded-2xl items-center justify-center cursor-pointer">
              <div className="flex gap-2 items-center justify-evenly">
                <Image
                  src="/grokLogo.png"
                  alt="GPT Logo"
                  width={25}
                  height={50}
                  className="bg-white rounded-full"
                />
                <h1 className="font-medium text-[13px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden text-end">
                  JSON Format Hatası
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
