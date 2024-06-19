import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEmpId } from "../components/EmpIdContext";

const Database = () => {
  const navigate = useNavigate();
  const { updateid,setupdateid } = useEmpId(); 
  const [data, setdata] = useState([]);
  const [records, setrecords] = useState([]);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-all-employees/")
      .then((res) => {
        setdata(res.data);
        setrecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNewEmp = () => {
    navigate("addemployee");
  };
  const handleDelete = (empId) => {
    fetch(`http://127.0.0.1:8000/deleteById/${empId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful deletion
          console.log("Employee deleted successfully");
          setrecords(records.filter((record) => record.empId !== empId));
          setDeleted(true);
        } else {
          console.error("Failed to delete employee");
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const Filter = (event) => {
    setrecords(
      data.filter((data) =>
        data.empName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleEdit = (empId) => {
    setupdateid(empId)
    console.log(updateid)
    navigate("updateemployee"); 
  }
  return (
    <div className="flex flex-col ml-5 w-[100%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-center mt-11 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-wrap max-md:mr-2.5 pl-10 py-10 w-[75%]">
          <div className="flex flex-auto gap-5 py-3.5 pr-10 pl-4 text-base border-2 border-solid bg-opacity-50 border-bluechill rounded-[50px] text-black text-opacity-50 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
            <input
              type="text"
              placeholder="Search Employee"
              className="w-full border border-none outline-none flex-grow text-xl"
              onChange={Filter}
            />
            <div className="shrink-0 self-start h-3.5 rounded-full w-[11px]">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <div className="pl-16 py-3.5">
            <div className="flex gap-2 py-1 pr-px pl-2.5 my-auto text-lg font-semibold text-center text-white rounded-md bg-bluechill">
              <button onClick={handleNewEmp} className="grow">
                Add New Employee
              </button>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5484b205367919e8003a11e828d6c026333bfd54dbed6cb564449ea92920e05?"
                className="shrink-0 aspect-square w-[23px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-11 max-md:mt-10 max-md:max-w-full py-10 pl-16 pr-16">
        <table className="w-full justify-center items-center bg-white rounded-lg shadow-lg p-6">
          <thead>
            <tr className="bg-bluechill h-[50px]">
              <th> Emp_ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* Map over the dynamic data to generate table rows */}
            {records.map((item) => (
              <tr
                key={item.empId}
                className={item.empId % 2 === 0 ? "bg-white" : "bg-rowcolor"}
              >
                <td>{item.empId}</td>
                <td>{item.empName}</td>
                <td>{item.empDesignation}</td>
                <td>
                  {/* <Link 
                  className="justify-center items-start px-7 py-2 mt-2 mb-2 text-xl whitespace-nowrap rounded-2xl bg-bluechill text-white text-opacity-80 max-md:px-5"
                  to={`updateemployee/${item.empId}`}>
                    Edit
                  </Link> */}
                  <button
                    className="justify-center items-start px-7 py-2 mt-2 mb-2 text-xl whitespace-nowrap rounded-2xl bg-bluechill text-white text-opacity-80 max-md:px-5"
                    onClick={() => handleEdit(item.empId)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="justify-center items-start px-7 py-2 mt-2 mb-2 text-xl whitespace-nowrap rounded-2xl bg-bluechill text-white text-opacity-80 max-md:px-5"
                    onClick={() => handleDelete(item.empId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Database;
