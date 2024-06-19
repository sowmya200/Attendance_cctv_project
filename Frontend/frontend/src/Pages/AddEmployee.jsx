import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      try {
        formDataToSend.append("empImg", formData.empImg);
        const response = await fetch(
          "http://127.0.0.1:8000/create_emp_details",
          {
            method: "POST",
            body: formDataToSend, // Send FormData object
          }
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
          setShowSuccessMsg(true);
          setFormData({
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
    console.log(file);
    setFormData({
      ...formData,
      empImg: file,
    });
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setFormData({
      ...formData,
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
      errors.empMobileno = "Invalid mobile number";
    }

    if (!data.empAddress.trim()) {
      errors.empAddress = "Employee address is required";
    }
    if (!data.empJoindate.trim()) {
      errors.empJoindate = "Date is required";
    } else if (!isValidDateFormat(data.empJoindate)) {
      errors.empJoindate = "Invalid date format. Please use YYYY-MM-DD";
    }
    return errors;
  };
  function isValidDateFormat(dateString) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  }

  return (
    <div className="flex flex-col ml-5 w-full max-md:ml-0 max-md:w-full my-6">
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
          <span className="px-2">Add New Employees</span>
          <div className="flex-grow border-b-4 border-bluechill"></div>
        </div>

        <div className="w-[100%]  pt-[60px]">
          <div className="w-[100%] m-auto bg-white h-[80vh] rounded-3xl">
            <div className="flex flex-col lg:flex-row  justify-around mt-[25px] ">
              <div>
                <form>
                  <div className="mb-16">
                    <input
                      type="text"
                      name="empName"
                      required
                      value={formData.empName}
                      onChange={handleInputChange}
                      placeholder="Employee Name"
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empName && (
                      <p style={{ color: "red" }}>{errors.empName}</p>
                    )}
                  </div>

                  <div className="mb-16">
                    <input
                      type="email"
                      name="empId"
                      value={formData.empId}
                      required
                      onChange={handleInputChange}
                      placeholder="Employee ID"
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empId ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empId && (
                      <p style={{ color: "red" }}>{errors.empId}</p>
                    )}
                  </div>

                  <div className="mb-16">
                    <input
                      type="text"
                      name="empDesignation"
                      value={formData.empDesignation}
                      onChange={handleInputChange}
                      placeholder="Designation"
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empDesignation ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empDesignation && (
                      <p style={{ color: "red" }}>{errors.empDesignation}</p>
                    )}
                  </div>
                  <div className="mb-16">
                    <input
                      type="text"
                      name="empDepartment"
                      value={formData.empDepartment}
                      onChange={handleInputChange}
                      placeholder="Department"
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empDepartment ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empDepartment && (
                      <p style={{ color: "red" }}>{errors.empDepartment}</p>
                    )}
                  </div>
                  <div className="mb-10">
                    <DatePicker
                      selected={
                        formData.empJoindate
                          ? new Date(formData.empJoindate)
                          : null
                      }
                      onChange={handleDateChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Joining Date"
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empJoindate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empJoindate && (
                      <p style={{ color: "red" }}>{errors.empJoindate}</p>
                    )}
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
                      placeholder="upload Image"
                      onChange={handleImageUpload}
                      className="h-[200px] w-[200px] shadow-md focus:shadow-lg  bg-formcolor bg-opacity-20  placeholder-black rounded-md p-2 ml-[80px] py-5"
                    />
                  </div>

                  <div className="mb-16">
                    <input
                      type="email"
                      name="empEmail"
                      placeholder="Email"
                      value={formData.empEmail}
                      onChange={handleInputChange}
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empEmail ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empEmail && (
                      <p style={{ color: "red" }}>{errors.empEmail}</p>
                    )}
                  </div>

                  <div className="mb-16">
                    <input
                      type="tel"
                      name="empMobileno"
                      placeholder="Mobile Number"
                      value={formData.empMobileno}
                      onChange={handleInputChange}
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empMobileno ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empMobileno && (
                      <p style={{ color: "red" }}>{errors.empMobileno}</p>
                    )}
                  </div>

                  <div className="mb-16">
                    <textarea
                      name="empAddress"
                      placeholder="Address"
                      value={formData.empAddress}
                      onChange={handleInputChange}
                      className={`w-[550px] shadow-md focus:shadow-lg bg-formcolor bg-opacity-20 placeholder-black  rounded-md p-2 py-5  ${
                        errors.empAddress ? "border-red-500" : ""
                      }`}
                    />
                    {errors.empAddress && (
                      <p style={{ color: "red" }}>{errors.empAddress}</p>
                    )}
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
            <div className="flex gap-5 justify-evenly items-center pr-9 rounded-3xl bg- max-md:flex-wrap max-md:pr-5">
              <div className="shrink-0 self-stretch rounded-xl bg-bluechill h-[180px] w-[5px]" />
              <div className="shrink-0 self-stretch my-auto rounded-full aspect-[0.93] w-[79px]">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-7xl px-5 py-6 text-bluechill"
                />
              </div>

              <div className="flex flex-col self-stretch my-auto text-left">
                <div className="text-3xl font-medium mt-4">Info</div>
                <div className="mt-2 text-2xl">
                  New employee details added successfully!
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

export default AddEmployee;

