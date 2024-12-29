"use client";
import React, { useState, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const GenerateComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchParams.get('handle') || "");
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linktext };
        } else {
          return item;
        }
      })
    );
  };

  const addLink = () => {
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const submitLinks = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    links,
    handle,
    pic,
    desc,
  });

  console.log(raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const r = await fetch("https://linktrekishore.vercel.app/api/add", requestOptions);

    if (!r.ok) {
      // If the response status is not OK, handle the error
      toast.error(`Error: ${r.statusText}`);
      return;
    }

    const text = await r.text(); // Read the response as plain text
    let result;

    try {
      result = JSON.parse(text); // Try parsing the response as JSON
    } catch (error) {
      // If JSON parsing fails, log and handle the error
      console.error("Failed to parse response:", error);
      toast.error("Failed to parse server response");
      return;
    }

    if (result.success) {
      toast.success(result.message);
      setLinks([{ link: "", linktext: "" }]);
      setpic("");
      sethandle("");
      setTimeout(() => {
        router.push(`/${handle}`);
      }, 2000);
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    // Handle any unexpected errors (e.g., network issues)
    console.error("Error submitting links:", error);
    toast.error("An error occurred while submitting the links");
  }
};

};

  return (
    <div className="bg-[#E9C0E9] min-h-screen grid grid-cols-2">
      <div className="col1 flex justify-center items-center flex-col text-gray-900">
        <div className="flex flex-col gap-5 mt-44">
          <h1 className="font-bold text-4xl">Create your Bittree</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 1: Claim your Handle</h2>
            <div className="mx-4">
              <input
                value={handle}
                onChange={(e) => sethandle(e.target.value)}
                className="px-4 py-2 my-2 focus:outline-pink-500 rounded-full"
                type="text"
                placeholder="Choose a Handle"
              />
            </div>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>
            {links.map((item, index) => (
              <div key={index} className="mx-4">
                <input
                  value={item.linktext}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full"
                  type="text"
                  placeholder="Enter link text"
                />
                <input
                  value={item.link}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full"
                  type="text"
                  placeholder="Enter link"
                />
              </div>
            ))}
            <button
              onClick={addLink}
              className="p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-3xl"
            >
              + Add Link
            </button>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 3: Add Picture and Description</h2>
            <div className="mx-4 flex flex-col">
              <input
                value={pic}
                onChange={(e) => setpic(e.target.value)}
                className="px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full"
                type="text"
                placeholder="Enter link to your Picture"
              />
              <input
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                className="px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full"
                type="text"
                placeholder="Enter description"
              />
              <button
                disabled={!pic || !handle || !links[0].linktext}
                onClick={submitLinks}
                className="disabled:bg-slate-500 p-5 py-2 mx-2 w-fit my-5 enabled:bg-slate-900 text-white font-bold rounded-3xl"
              >
                Create your BitTree
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 pl-32 col2 w-full h-screen bg-[#E9C0E9]">
        <img
          className="h-full object-contain"
          src="/generate.png"
          alt="Generate your links"
        />
        <ToastContainer />
      </div>
    </div>
  );
};

const Generate = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GenerateComponent />
    </Suspense>
  );
};

export default Generate;

export const dynamic = "force-dynamic";
