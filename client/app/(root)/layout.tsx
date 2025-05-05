import React from "react";
import Navbar from "../components/Navbar";

export default function Layout({ children } : Readonly<{children: React.ReactNode}>){

    return (
        <main className="font-work-sans md:max-h-screen h-fit md:overflow-hidden overflow-visible bg-white">
            <Navbar/>
            {children}
        </main>
    )
   
}