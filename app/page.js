"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaLinkedin } from 'react-icons/fa';


export default function Home() {

  const router = useRouter()
  const [text, setText] = useState("")

  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#254f1a] pt-40 min-h-[100vh] grid grid-cols-2 tracking-tighter font-poppins">
        <div className="flex justify-center flex-col ml-[8vw] gap-3">
          <p className="text-[#d2e823] font-extrabold text-6xl">Everything you </p>
          <p className="text-[#d2e823] font-extrabold text-6xl">are. In one,</p>
          <p className="text-[#d2e823] font-extrabold text-6xl">simple link in bio.</p>
          <p className="text-[#d2e823] text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} className="px-2  text-gray-900 py-2 focus:outline-green-800 rounded-md" type="text" placeholder="Enter your Handle" />
            <button onClick={() => createTree()} className="bg-pink-300 tracking-normal font-poppins text-black rounded-full px-4 py-4 font-semibold hover:bg-pink-400 ">Claim your Bittree</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col ml-[4vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>


      <section className="bg-[#e9c0e9] min-h-[100vh] grid grid-cols-2 font-poppins">
        <div className="flex items-center justify-center flex-col ml-[4vw]">
          <img className="h-2/3" src="./secondpage.png" alt="homepage image" />
        </div>
        <div className="flex justify-center flex-col ml-[3vw] gap-3 tracking-tighter">
          <p className="text-purple-900 font-extrabold text-5xl">Create and customize</p>
          <p className="text-purple-900 font-extrabold text-5xl">your Linktree in minutes</p>
          <p className="text-purple-900 text-xl my-4">Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.</p>
          <div className="flex tracking-normal">
            <button className="bg-purple-900 text-white rounded-full px-4 py-4 font-semibold hover:bg-purple-800">Get started for free</button>
          </div>
        </div>

      </section>

      <section className="bg-[#780016] min-h-[100vh]  grid grid-cols-2 font-poppins">
        <div className="flex justify-center flex-col ml-[6vw] gap-3 tracking-tighter">
          <p className="text-[#e9c0e9] font-extrabold text-5xl text-nowrap">Share your Linktree from</p>
          <p className="text-[#e9c0e9] font-extrabold text-5xl">your Instagram, TikTok,</p>
          <p className="text-[#e9c0e9] font-extrabold text-5xl">Twitter and other bios</p>
          <p className="text-[#e9c0e9] text-xl my-4">Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>
          <div className="flex tracking-normal">
            <button className="bg-[#e9c0e9] text-black rounded-full px-4 py-4 font-semibold hover:bg-[#f07af0]">Get started for free</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col ml-[4vw]">
          <img className="h-2/3" src="./Thirdpage.png" alt="homepage image" />
        </div>
      </section>

      <section className="bg-[#502274] min-h-[60vh]">
        <div className="p-20 ">
          <img className="h-3/6  rounded-3xl" src="./linktre.png" alt="homepage image" />
          <span className="absolute right-28 font-poppins font-extrabold text-[#e9c0e9] ">By-pvpkishore</span>
        </div>
        <div className="flex flex-col items-center ">
          <div className="flex gap-6 mt-2 mb-4">
            {/* GitHub Link */}
            <a
              href="https://github.com/Pvpkishore"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaGithub className="text-[#e9c0e9] text-4xl" />
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/ponnala-venkata-padma-kishor-76679326a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin className="text-[#e9c0e9] text-4xl" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
