'use client';
import axios from "axios";
import { useEffect,useState } from "react";
export default function Home() {
  const [data, setData] = useState({});
  const [input,setinput]=useState("");
  const fetchData = async () => {
    const response = await axios.post("http://backend:4000",{test:input});
    setData(response.data);
    console.log(response.data);
  };
  // useEffect(() => {
  //   fetchData();
  // }, [input]);
  return (
    <div className=" w-[70%] m-auto text-center">
      <h1>Home</h1>
      <p>Welcome to Home Page trying finally </p>
      <p> Some data that has been feteched from backend are following</p>
      <input type="text" onChange={(e)=>setinput(e.target.value)} className=" border border-red-600 p-2 m-4" />
      <button className=" border border-sky-300 bg-slate-50 m-2 p-3 rounded-md" onClick={()=>fetchData()}>Fetch Data</button>
      <div className="bg-slate-50 my-7 p-7">
        {
          data? data.data:""
        }
      </div>
      <p>i have added some content here at new content added at 5:00 </p>
    </div>
  );
}
