import React from 'react'
import DateCard from '../components/DateCard';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import empimg from '../assets/empimg.jpg'
import empimg2 from '../assets/empimg2.jpg'
import empimg3 from '../assets/empimg3.jpg'
import empimg4 from '../assets/empimg4.jpg'
const SearchByDate = () => {

  const data = [
    { img: empimg, name: "John Doe", designation: "Frontend developer" },
    { img:empimg2, name: "Jane Smith", designation: "Backend developer" },
    {  img:empimg3, name: "Alice Johnson", designation: "Full stack developer" },
    {  img:empimg4, name: "Bob Brown", designation: "UI/UX Designer" },
    { img: empimg, name: "John Doe", designation: "Frontend developer" },
    { img:empimg2, name: "Jane Smith", designation: "Backend developer" },
    {  img:empimg3, name: "Alice Johnson", designation: "Full stack developer" },
    {  img:empimg4, name: "Bob Brown", designation: "UI/UX Designer" },
    { img: empimg, name: "John Doe", designation: "Frontend developer" },
    { img:empimg2, name: "Jane Smith", designation: "Backend developer" },
    {  img:empimg3, name: "Alice Johnson", designation: "Full stack developer" },
    {  img:empimg4, name: "Bob Brown", designation: "UI/UX Designer" },
  ];

const handleDateSearch=()=>{
  setFilteredData(data);
  
}
const[searchdate,setsearchdate]=useState(null)
const[searchfromtime,setsearchfromtime]=useState("00:00")
const[searchtotime,setsearchtotime]=useState("00:00")
const [filteredData, setFilteredData] = useState([]);


const handleDateChange = (date) => {
  console.log(date)
  const formattedDate = formatDate(date);
  console.log(formattedDate)
  setsearchdate(formattedDate)
};
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
  return (
    <div className="flex flex-col ml-5 w-[100%] max-md:ml-0 max-md:w-full">
     <div className="flex flex-col items-center mt-11 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap max-md:mr-2.5 pl-10 py-10 w-[75%]">
          <div className="flex flex-auto gap-5 pt-6 pr-10 pl-4 text-base border-2 border-solid bg-opacity-50 border-bluechill rounded-[50px] text-black text-opacity-50 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <DatePicker
                      selected={searchdate ? new Date(searchdate) : null}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Enter Date"
                      className="w-full border border-none outline-none flex-grow text-xl"
                    />
          </div>
          <div className="flex flex-auto gap-5 py-3.5 pr-10 pl-4 text-base border-2 border-solid bg-opacity-50 border-bluechill rounded-[50px] text-black text-opacity-50 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <input
              type="time"
              value={searchfromtime}
              onChange={(e)=>setsearchfromtime(e.target.value)}
              placeholder="Enter From Time"
              className="w-full border border-none outline-none flex-grow text-xl"
            />
          
          </div>
          <div className="flex flex-auto gap-5 py-3.5 pr-10 pl-4 text-base border-2 border-solid bg-opacity-50 border-bluechill rounded-[50px] text-black text-opacity-50 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <input
              type="time"
              value={searchtotime}
              onChange={(e)=>setsearchtotime(e.target.value)}
              placeholder="Enter From Time"
              className="w-full border border-none outline-none flex-grow text-xl"
            />
          </div>
          <div className="pl-16 py-3.5">
            <div className="flex gap-2 pl-10 pr-10 px-4 py-4 my-auto text-lg font-semibold text-center text-white rounded-lg bg-bluechill">
              <button className="grow" onClick={handleDateSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-5">
        {filteredData.map((emp) => (
          <DateCard key={emp.name} data={emp} />
        ))}
      </div>
      </div>
    </div>
        
  )
}

export default SearchByDate

