import React from "react";
import Personalinfo from "../components/Personalinfo";
import { useState } from "react";
import Charts from "../components/Charts";
import EmpTable from "../components/EmpTable";
const SearchByEmpId = () => {
  const personalInfoData = [
    {
      name: "Krishna Kumar",
      designation: "Junior Software Engineer",
      department: "Frontend ",
      hiredDate: "20/1/2020",
      email: "krishnakumar123@gmail.com",
      phone: "09345761288",
    },
  ];
  const [filteredData, setFilteredData] = useState([]);
  const handleEmpSearch = () => {
    setFilteredData(personalInfoData);
  };
  return (
    <div className="ml-5 w-[100%] max-md:ml-0 max-md:w-full">
      <div className="  mt-11 max-md:mt-10 max-md:max-w-full">
        <div className=" flex gap-2 max-md:flex-wrap max-md:mr-2.5 pl-10 mb-4">
          <div className=" w-[60%]  pr-8 pl-4  text-black text-opacity-50 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <input
              type="text"
              placeholder="Search Employee ID"
              className=" ml-4 border-2 border-solid bg-opacity-50 border-bluechill rounded-[50px] w-full  outline-none flex-grow text-xl mt-2 p-4"
            />
          </div>
          <div className="  w-[15%] pl-16 py-3.5 ">
            <div className="grow pl-10 pr-10 px-4 py-4 my-auto text-lg font-semibold text-center text-white rounded-lg bg-bluechill">
              <button className="grow" onClick={handleEmpSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="ml-10 md:flex md:flex-wrap md:justify-spaceevenly">
          {filteredData.map((emp) => (
            <div className="w-[80%]">
              <div className="flex justify-evenly">
              <Personalinfo key={emp.name} data={emp} />
              <Charts />
              </div>
              <EmpTable/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchByEmpId;
