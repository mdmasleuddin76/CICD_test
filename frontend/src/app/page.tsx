'use client';
import axios from "axios";
import { useEffect,useState } from "react";
export default function Home() {
  const [data, setData] = useState({});
  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/");
    setData(response.data);
    console.log(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" w-[70%] m-auto text-center">
      <h1>Home</h1>
      <p>Welcome to Home Page</p>
      <p> Some data that has been feteched from backend are following</p>
      <div className="bg-slate-50 my-7 p-7">
        {
          data? data.data:""
        }
      </div>
      <p>i have added some content here at 1:46 </p>
    </div>
  );
}
