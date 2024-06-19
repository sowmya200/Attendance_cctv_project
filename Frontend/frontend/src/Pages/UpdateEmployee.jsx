import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEmpId } from "../components/EmpIdContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { updateid } = useEmpId();
  const [errors, setErrors] = useState({});
  const [employee, setEmployee] = useState({
    empName: "",
    empId: "",
    empDesignation: "",
    empDepartment: "",
    empJoindate: "",
    empEmail: "",
    empMobileno: "",
    empAddress: "",
    empImg: "",
  });
const [showSuccessMsg, setShowSuccessMsg] = useState(false);
useEffect(()=>{
  console.log(updateid)
  axios
      .get(`http://127.0.0.1:8000/search_employee/${updateid}`)
      .then((res) => {
       setEmployee(res.data)
      })
      .catch((err) => console.log(err));
},[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]:value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(employee);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      for (const key in employee) {
        formDataToSend.append(key, employee[key]);
      }
      try {
        formDataToSend.append("empImg", employee.empImg);
        const response = await fetch(
          `http://127.0.0.1:8000/update-employee/${updateid}`,
          {
            method: "PUT",
            body: formDataToSend, // Send FormData object
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          setShowSuccessMsg(true);
          setEmployee({
            empName: "",
            empId: "",
            empDesignation: "",
            empDepartment: "",
            empJoindate: "",
            empEmail: "",
            empMobileno: "",
            empAddress: "",
            empImg: "",
          });
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file)
      setEmployee({
        ...employee,
        empImg: file,
      });
    
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setEmployee({
      ...employee,
      empJoindate: formattedDate,
    });
  };
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const validateForm = (data) => {
    let errors = {};

    if (!data.empName.trim()) {
      errors.empName = "Employee name is required";
    }

    if (!data.empId.trim()) {
      errors.empId = "Employee ID is required";
    }
    if (!data.empDesignation.trim()) {
      errors.empDesignation = "Designation is required";
    }
    if (!data.empDepartment.trim()) {
      errors.empDepartment = "Department  is required";
    }
    if (!data.empEmail.trim()) {
      errors.empEmail = "Employee email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.empEmail)) {
      errors.empEmail = "Invalid email address";
    }

    if (!data.empMobileno.trim()) {
      errors.empMobileno = "Mobile number is required";
    } else if (!/^\d{10}$/.test(data.empMobileno)) {
      errors.owner_number = "Invalid mobile number";
    }

    if (!data.empAddress.trim()) {
      errors.empAddress = "Employee address is required";
    }
    return errors;
  };
  return (
    <div className="flex flex-col ml-5 w-[100%] max-md:ml-0 max-md:w-full my-6">
      <div>
        <div className="flex items-start pb-4">
          <button
            className="border border-bluechill rounded-full pr-4 pl-2"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              className="pr-2"
              onClick={() => navigate(-1)}
            />
            back
          </button>
        </div>
        <div className="flex items-center pl-16">
          <div className="flex-grow border-b-4 border-bluechill"></div>
          <span className="px-2">Edit Employees Detail</span>
          <div className="flex-grow border-b-4 border-bluechill"></div>
        </div>

        <div className="w-[100%] h-[100vh] pt-[60px]">
          <div className="w-[100%] m-auto bg-white h-[80vh] rounded-3xl">
            <div className="flex flex-row  justify-around mt-[25px] ">
              <div>
                <form>
                  <div className="mb-16">
                    <input
                      type="text"
                      name="empName"
                      required
                      placeholder="Employee Name"
                      value={employee.empName}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5"
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      type="email"
                      name="empId"
                      required
                      placeholder="Employee ID"
                      value={employee.empId}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5 "
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      type="text"
                      name="empDesignation"
                      placeholder="Designation"
                      value={employee.empDesignation}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  "
                    />
                  </div>
                  <div className="mb-16">
                    <input
                      type="text"
                      name="empDepartment"
                      placeholder="Department"
                      value={employee.empDepartment}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5 "
                    />
                  </div>
                  <div className="mb-10">
                     <DatePicker
                      selected={employee.empJoindate ? new Date(employee.empJoindate) : null}
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Joining Date"
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black rounded-md p-2 py-5"
                    />
                  </div>
                </form>
              </div>
              <div>
                <form>
                  <div className="mb-16">
                    <input
                      type="file"
                      accept="image/*"
                      name="empImg"
                      placeholder="upload"
                      onChange={handleImageUpload}
                      className="h-[200px] w-[200px] shadow-md focus:shadow-lg  bg-formcolor bg-opacity-20  placeholder-black rounded-md p-2 ml-[80px] py-5"
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      type="email"
                      name="empEmail"
                      placeholder="Email"
                      value={employee.empEmail}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  "
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      type="tel"
                      name="empMobileno"
                      placeholder="Mobile Number"
                      value={employee.empMobileno}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5 "
                    />
                  </div>

                  <div className="mb-16">
                    <textarea
                      name="empAddress"
                      placeholder="Address"
                      value={employee.empAddress}
                      onChange={handleInputChange}
                      className="w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5 "
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="flex justify-center mt-[25px]">
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-bluechill py-[8px] w-[10%] rounded-xl text-white text-[20px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {showSuccessMsg && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md text-black shadow-2xl">
          <div className="flex flex-col justify-center bg-white rounded-md max-w-[545px] text-zinc-800">
            <div className="flex gap-5 justify-between items-center pr-9 rounded-3xl bg- max-md:flex-wrap max-md:pr-5">
              <div className="shrink-0 self-stretch rounded-xl bg-bluechill h-[180px] w-[5px]" />
              <div className="shrink-0 self-stretch my-auto rounded-full aspect-[0.93]  w-[79px]">
              <FontAwesomeIcon
              icon={faInfoCircle}
              className="text-7xl px-4 py-6 text-bluechill"
            />
              </div>
            
              <div className="flex flex-col self-stretch my-auto text-left">
                <div className="text-3xl font-medium mt-4">Info</div>
                <div className="mt-2 text-2xl">
                Employee detail updated successfully!
                </div>
                <button
                  type="submit"
                  className="block mx-auto mt-4 mb-4 bg-bluechill text-white px-4 py-2 rounded-md"
                  onClick={() => setShowSuccessMsg(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateEmployee;
