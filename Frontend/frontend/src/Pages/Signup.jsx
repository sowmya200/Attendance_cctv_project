import React from "react";
import { useState } from "react";
import cctv from "../assets/cctvimg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Regular expression for validating email or employee ID format
  const userIdRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^([a-zA-Z]{3})_([0-9]{3})$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate user ID
    if (!email) {
      setEmailError("Email is required");
    } else if (!email.match(userIdRegex)) {
      setEmailError("Invalid email");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
    }
    if (
      email &&
      password &&
      confirmPassword &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) 
    {
      
      // console.log("User ID:", email);
      // console.log("Password:", password);
      // console.log("Confirm Password:", confirmPassword);
      // navigate("/");
      try {
        const response = await fetch('http://127.0.0.1:8000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
            // Authentication successful
            console.log('Login successful');
            navigate('/')
        } else {
            // Authentication failed
            console.error('Login failed:', data.error);
            // Update state to display error message to the user
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Handle network errors or other exceptions
    }
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center bg-white max-md:w-full font-pop">
        <div className="pl-11 w-full bg-bluechill max-md:pl-5 h-screen max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-center self-stretch my-auto max-md:mt-10 max-md:max-w-full">
                <div className="self-center ml-12 mb-8 text-6xl font-bold text-white max-md:ml-2.5 max-md:text-4xl">
                  eVision
                </div>
                <div className="rounded-full aspect-square bg-black bg-opacity-60 min-h-[400px]">
                  <img
                    loading="lazy"
                    srcSet={cctv}
                    className="mt-8 transform rotate-14.98"
                  />
                </div>
                <div className="flex gap-3 justify-center mt-6">
                  <div className="shrink-0 w-2.5 h-2.5 rounded-2xl bg-slate-500" />
                  <div className="shrink-0 w-2.5 h-2.5 bg-white rounded-2xl" />
                  <div className="shrink-0 w-2.5 h-2.5 bg-white rounded-2xl" />
                  <div className="shrink-0 w-2.5 h-2.5 bg-white rounded-2xl" />
                </div>
                <div className="mt-6 text-2xl tracking-wide leading-6 text-center text-white">
                  Always monitoring your day
                </div>
                <div className="mt-5 text-medium font-medium text-medium tracking-wide text-center text-white font bold">
                  On the shot, you see the main screen with all the rooms, and
                  users can control each camera with the help of remote control
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[69%] h-screen max-md:ml-0 max-md:w-full">
              <div className="flex grow justify-center items-center px-16 py-20 w-full text-xl font-medium text-black bg-white rounded-[40px_0px_0px_40px] max-md:px-5 max-md:mt-2.5 max-md:max-w-full">
                <div className="flex flex-col mt-20 max-w-full w-[477px] max-md:mt-10">
                  <div className="self-center text-5xl font-bold max-md:text-4xl font-syne ">
                    Signup
                  </div>
                  <form onSubmit={handleSubmit}>
                    <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex pl-2 ">
                      <legend className="text-left mx-8">Email</legend>
                      <input
                        type="email"
                        name="text"
                        className="w-95 rounded-[33px] border border-none outline-none flex-grow text-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </fieldset>
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                    <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex pl-2 ">
                      <legend className="text-left mx-8">Password</legend>
                      <input
                        type="password"
                        name="password"
                        className="w-95 rounded-[33px] border border-none outline-none flex-grow text-xl"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </fieldset>
                    {passwordError && (
                      <p style={{ color: "red" }}>{passwordError}</p>
                    )}
                    <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex pl-2 ">
                      <legend className="text-left mx-8">
                        {" "}
                        Confrim Password
                      </legend>
                      <input
                        type="password"
                        name="password"
                        className="w-95 rounded-[33px] border border-none outline-none flex-grow text-xl"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </fieldset>
                    {confirmPasswordError && (
                      <p className="text-red-500 text-sm">
                        {confirmPasswordError}
                      </p>
                    )}
                    <div className="flex flex-col">
                      <button className="justify-center items-center self-center px-16 py-5 mt-24 text-3xl text-white rounded-[33px] max-md:px-5 max-md:mt-10 max-md:max-w-full bg-button font-syne">
                        Signup
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
