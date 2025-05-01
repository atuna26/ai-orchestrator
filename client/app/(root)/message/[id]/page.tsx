"use client";

import Sidebar from "@/app/components/Sidebar";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  params: { id: string };
}

const Message =  ({ params }: Props) => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Search term:", searchTerm);
    };

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex w-full flex-col items-center justify-between ">
        <div className="flex flex-col w-full px-32 pt-10 gap-4 overflow-y-auto max-h-[calc(100vh-175px)]">
          <div className="flex gap-2">
            <div>
              <Image
                src="/gptLogo.png"
                alt="GPT Logo"
                width={50}
                height={50}
                className=" rounded-full"
              />
            </div>
            <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-50 rounded-2xl p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate dolorum obcaecati veniam. Sint exercitationem,
              explicabo repellat inventore temporibus tempora laboriosam
              necessitatibus ratione corrupti, minus delectus quasi ipsam. Quod
              vitae maiores dicta vero excepturi! Voluptatibus incidunt
              necessitatibus officia neque nisi assumenda, architecto delectus
              repellendus ratione! Aperiam, in nulla doloremque sed laborum a
              labore dolore sit esse est error qui, quia sapiente.
            </p>
          </div>
          <div className="flex gap-2 justify-end rounded-md p-2">
            <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-200 rounded-2xl p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate dolorum obcaecati veniam. Sint exercitationem,
              explicabo repellat inventore temporibus tempora laboriosam
              necessitatibus ratione corrupti, minus delectus quasi ipsam. Quod
              vitae maiores dicta vero excepturi! Voluptatibus incidunt
              necessitatibus officia neque nisi assumenda, architecto delectus
              repellendus ratione! Aperiam, in nulla doloremque sed laborum a
              labore dolore sit esse est error qui, quia sapiente.
            </p>
            <div>
              <User
                className="bg-gray-200 rounded-full p-2"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <Image
                src="/gptLogo.png"
                alt="GPT Logo"
                width={50}
                height={50}
                className=" rounded-full"
              />
            </div>
            <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-50 rounded-2xl p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate dolorum obcaecati veniam. Sint exercitationem,
              explicabo repellat inventore temporibus tempora laboriosam
              necessitatibus ratione corrupti, minus delectus quasi ipsam. Quod
              vitae maiores dicta vero excepturi! Voluptatibus incidunt
              necessitatibus officia neque nisi assumenda, architecto delectus
              repellendus ratione! Aperiam, in nulla doloremque sed laborum a
              labore dolore sit esse est error qui, quia sapiente.
            </p>
          </div>
          <div className="flex gap-2 justify-end rounded-md p-2">
            <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-200 rounded-2xl p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate dolorum obcaecati veniam. Sint exercitationem,
              explicabo repellat inventore temporibus tempora laboriosam
              necessitatibus ratione corrupti, minus delectus quasi ipsam. Quod
              vitae maiores dicta vero excepturi! Voluptatibus incidunt
              necessitatibus officia neque nisi assumenda, architecto delectus
              repellendus ratione! Aperiam, in nulla doloremque sed laborum a
              labore dolore sit esse est error qui, quia sapiente.
            </p>
            <div>
              <User
                className="bg-gray-200 rounded-full p-2"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <Image
                src="/gptLogo.png"
                alt="GPT Logo"
                width={50}
                height={50}
                className=" rounded-full"
              />
            </div>
            <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-50 rounded-2xl p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate dolorum obcaecati veniam. Sint exercitationem,
              explicabo repellat inventore temporibus tempora laboriosam
              necessitatibus ratione corrupti, minus delectus quasi ipsam. Quod
              vitae maiores dicta vero excepturi! Voluptatibus incidunt
              necessitatibus officia neque nisi assumenda, architecto delectus
              repellendus ratione! Aperiam, in nulla doloremque sed laborum a
              labore dolore sit esse est error qui, quia sapiente.
            </p>
          </div>
          <div className="flex gap-2 justify-end rounded-md p-2">
            <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-200 rounded-2xl p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate dolorum obcaecati veniam. Sint exercitationem,
              explicabo repellat inventore temporibus tempora laboriosam
              necessitatibus ratione corrupti, minus delectus quasi ipsam. Quod
              vitae maiores dicta vero excepturi! Voluptatibus incidunt
              necessitatibus officia neque nisi assumenda, architecto delectus
              repellendus ratione! Aperiam, in nulla doloremque sed laborum a
              labore dolore sit esse est error qui, quia sapiente.
            </p>
            <div>
              <User
                className="bg-gray-200 rounded-full p-2"
                width={50}
                height={50}
              />
            </div>
          </div>
          
        </div>
        <form onSubmit={handleSubmit} className="absolute bottom-0 w-[600px] mb-4 shadow-md">
          <label
            htmlFor="message"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Message
          </label>
          <div className="relative">
            <textarea
              rows={3}
              type="text"
              id="message"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Message"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
          </div>
        </form>
       
      </div>
    </div>
  );
};

export default Message;
