import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
      const session = await auth();
  return (
   <>
    <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10">
      <h1 className="heading">
        Choose Your AI!
      </h1>
      <p className="sub-heading !max-w-3xl">
        Welcome to the AI Playground! Here, you can explore and interact with various AI models.
      </p>
      <div className="flex flex-col md:flex-row justify-center  gap-10 mt-10 border-2 border-black/50 p-5 rounded-lg bg-black/5 w-[700px] ">
        <div>
          <img src="/gptLogo.png" alt="GPT Logo"  className="w-15 h-15 bg-white rounded-full transition-transform duration-150 ease-out hover:scale-140 cursor-pointer" />
        </div>
        <div>
          <img src="/deepseekLogo.png" alt="DeepSeek Logo" className="w-15 h-15  bg-white rounded-full transition-transform duration-150 ease-out hover:scale-140 cursor-pointer" />
        </div>
        <div>
          <img src="/grokLogo.png" alt="Grok Logo" className="w-15 h-15  bg-white rounded-full transition-transform duration-150 ease-out hover:scale-140 cursor-pointer" />
        </div>
      </div>
    </section>
    <section className="w-full bg-white min-h-[330px] flex flex-col py-10">
    {session?.user?  (
      <>
      <h1 className="font-medium text-[20px] max-w-2xl break-words text-black pl-2">Your Recent Chats:</h1>
        <div className="flex items-center gap-5 mt-10 mx-10">

          <Link href="/message/1">
            <div className="flex flex-col gap-5 w-[300px] h-[200px] bg-black rounded-2xl p-5 cursor-pointer">
              <div className="flex gap-2">
                <Image src="/gptLogo.png" alt="GPT Logo" width={40} height={40} className="bg-white rounded-full" />
                <p className="font-medium text-[17px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden">From Chatgpt</p>
              </div>
              <h1 className="font-medium text-[20px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden text-end">JSON Format Hatası</h1>
              <p className="font-normal text-[17px] max-w-2xl break-words line-clamp-2 text-white text-end">  This is a very long paragraph that will be truncated after exactly two lines. The rest will be hidden and replaced with an ellipsis.</p>
            </div>    
          </Link>
          
        </div>
      </>
    ): (
      
        <p className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] my-5 text-center w-full">
        Please Sign In to see your recent chats!
        </p>
    
    )}
    </section>
   
   
   </>
  );
}
