import * as React from "react";
import { useState } from "react";
import cctv from "../assets/cctvimg.png";
import { useNavigate } from "react-router-dom";
import arrowRight from "../assets/vector.svg";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [error, setError] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChange, setPasswordChange] = useState(false);
  const navigate = useNavigate();

  const userIdRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^([a-zA-Z]{3})_([0-9]{3})$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setemailError("");
    setpasswordError("");

    // Validate user ID
    if (!email) {
      setemailError("Email is required");
    } else if (!email.match(userIdRegex)) {
      setemailError("Invalid email");
    }

    // Validate password
    if (!password) {
      setpasswordError("Password is required");
    } else if (password.length < 8) {
      setpasswordError("Password must be at least 8 characters long");
    }

    // Check if both fields meet the correct specifications
    if (email && password && !emailError && !passwordError) {
      // Perform sign in
      // navigate("/dashboard/LiveTracking");
      console.log(email)
      console.log(password)
      try {
        const response = await fetch('http://127.0.0.1:8000/login', {
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
            navigate('LiveTracking')
        } else {
            // Authentication failed
            console.error('Login failed:', data.error);
            setError(data.error)
            // Update state to display error message to the user
        }
    } catch (error) {
        console.error('Error during login:', error);
        setError(error)
        // Handle network errors or other exceptions
    }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // const token = e.target.elements.token.value;
      const response = await fetch(
        "http://127.0.0.1:8000/send-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("OTP sent successfully");
        alert("OTP sent successfully");
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP:", data.error);
        alert("Enter proper Email Address");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/verify-otp/',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            otp: otp,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("OTP verified successfully");
        alert("OTP verified successfully");
        setOtpSent(false);
        setShowForgotPasswordModal(false);
        setPasswordChange(true);
        

        // Show the form to enter new password
      } else {
        console.error("Failed to verify OTP:", data.error);
        alert("Failed to verify OTP");
        setOtp("Invalid OTP");
      }
      if (response.ok) {
        alert("OTP verified successfully");
        setOtpSent(false);
        setShowForgotPasswordModal(false);
        setPasswordChange(true);
        

        // Show the form to enter new password
      } else {
        console.error("Failed to verify OTP:", data.error);
        alert("Failed to verify OTP");
        setOtp("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtp("Error verifying OTP");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    // Check if newPassword matches confirmPassword
    if (newPassword !== confirmPassword) {
      // Handle password mismatch error
      return;
    }
    try {
      const response = await fetch(
        'http://127.0.0.1:8000/update_password/',
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordEmail,
            new_password: newPassword,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("Password reset successfully");
        alert("Password reset successfully");
        setShowForgotPasswordModal(false);
        setOtp('')
        setNewPassword('')
        setConfirmPassword('')
        setPasswordChange(false);
        setForgotPasswordEmail('')
        // Redirect user to login page or show a success message
      } else {
        console.error("Failed to reset password:", data.error);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };
  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };
  const handleSignup = () => {
    navigate("/Signup");
  };
  return (
    <div className="flex flex-col justify-center bg-white max-md:w-full font-pop">
      <div className="pl-11 w-full bg-bluechill max-md:pl-5 h-screen max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-center self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="self-center ml-12 mb-8 text-6xl font-bold text-white max-md:ml-2.5 max-md:text-4xl">
                <span>eVision</span>
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
            <div className="flex grow justify-center items-center  px-16 py-20 w-full text-xl font-medium text-black bg-white rounded-[40px_0px_0px_40px] max-md:px-5 max-md:mt-2.5 max-md:max-w-full">
              <div className="flex flex-col mt-20 max-w-full w-[477px] max-md:mt-10">
                <div className=" self-center text-5xl font-bold max-md:text-4xl font-syne ">
                  Login
                </div>
                <form className="">
                  <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex ">
                    <legend className="text-left mx-8">Email</legend>
                    <input
                      type="text"
                      name="text"
                      className="w-95 rounded-[33px] border border-none outline-none flex-grow text-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </fieldset>
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                  <fieldset className="border border-black border-solid h-[88px] rounded-[33px] max-md:max-w-full mt-16 flex  ">
                    <legend className="text-left mx-8">Password</legend>
                    <input
                      type="password"
                      name="password"
                      className="w-95 rounded-[33px] border border-none outline-none flex-grow text-xl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </fieldset>
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                   {error && (
                      <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                    )}
                  <div className="flex flex-col justify-end">
                    <p
                      className="text-right mt-5 text-blue-500 font-medium cursor-pointer"
                      onClick={handleForgotPassword}
                    >
                      Forgot password?
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <button
                      className="justify-center items-center self-center px-16 py-5 mt-24 text-3xl text-white rounded-[33px] max-md:px-5 max-md:mt-10 max-md:max-w-full bg-button font-syne"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div className="flex flex-col justify-end">
                    <p
                      className="text-center mt-5 text-blue-500 font-medium cursor-pointer"
                      onClick={handleSignup}
                    >
                      <span className="text-black">A New User</span> Signup
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForgotPasswordModal && (
        <div className="fixed top-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-60">
          <div className="bg-white p-8  rounded-md  w-[350px]">
            {otpSent ? (
              <>
                <form className="text-right  bg-white rounded-md  w-full mt-2">
                  <input
                    className="w-full m-auto border border-gray-500 rounded-md bg-gray-100 p-2 mb-[20px]"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <div className="flex justify-between gap-[75px]">
                    <button
                      className="bg-[#4D989D] text-white p-2 rounded-md"
                      onClick={() => setShowForgotPasswordModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-[#4D989D] text-white p-2 rounded-md "
                      onClick={handleOtpSubmit}
                    >
                      Verify OTP
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <form
                className="text-center"
                onSubmit={handleForgotPasswordSubmit}
              >
              
                <input
                  className="w-full border border-gray-500 rounded-md bg-gray-100 p-2 mb-[20px]"
                  type="email"
                  placeholder="Enter your email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                />
                <button className="bg-[#4D989D] text-white p-2 rounded-md" type="submit">
                  Send OTP
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {passwordChange && (
        <div className="fixed top-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8  rounded-md  w-[350px]">
            <div className={`${passwordChange ? "inline" : "hidden"}`}>
              <form
                className=" bg-white rounded-md  w-full"
                onSubmit={handlePasswordChange}
              >
                <input
                  className="w-full border border-gray-500 rounded-md bg-gray-100 p-2 mb-[20px]"
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className="w-full border border-gray-500 rounded-md bg-gray-100 p-2 mb-[20px]"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="bg-[#4D989D] text-white p-2 rounded-md" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
