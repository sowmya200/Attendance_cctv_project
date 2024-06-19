// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [userData, setUserData] = useState({});
//   const [notificationCount, setNotificationCount] = useState(0);

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       // Replace with the actual backend endpoint that provides user data
//       const response = await fetch("/api/user");
//       const data = await response.json();
//       setUserData(data);

//       // Assuming the user data includes a 'notificationCount' property
//       setNotificationCount(data.notificationCount);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   return (
//     <div className=" bg-[#4D989D] text-white flex justify-between items-center p-5 px-10">
//       <div className="flex items-center">
//         <div className="w-40 h-auto">
//           <img src={logo} alt="Logo" />
//         </div>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center ">
//           <span className="mr-2.5">{userData.username}</span>
//           <img
//             className="max-w-[30px] h-auto cursor-pointer ml-2.5 w-10  rounded-full object-cover mx-3.5"
//             src={userData.profilePicture}
//             alt="Profile"
//           />
//         </div>
//         <div className="ml-3">
//           <span className="relative top-[-7.5px] right-[-23.5px] bg-red-500 text-white text-xs p-[0px] px-[4px] rounded-full">
//             {notificationCount}
//           </span>
//           <FontAwesomeIcon icon={faBell} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import emailjs from '@emailjs/browser';
const Navbar = () => {
  const [userData, setUserData] = useState({});
  const [notificationCount, setNotificationCount] = useState(0);
  const [helpDesk, setHelpDesk] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace with the actual backend endpoint that provides user data
      const response = await fetch("/api/user");
      const data = await response.json();
      setUserData(data);

      // Assuming the user data includes a 'notificationCount' property
      setNotificationCount(data.notificationCount);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_mpuayy8', 'template_gdhcsg5', form.current, {
        publicKey: 'cgQ-MK0V0n_kLQxx5',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setHelpDesk(false)
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className="bg-[#4D989D] w-[99.2vw] text-white flex justify-between items-center p-5 px-10">
      <div className="flex items-center">
        <div className="w-40 h-auto">
          <img src={logo} alt="Logo" />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="mr-4">{userData.username}</span>
          <img
            className="max-w-[30px] h-auto cursor-pointer ml-2.5 w-10 rounded-full object-cover mx-3.5"
            src={userData.profilePicture}
            alt="Profile"
          />
        </div>
        {/* <div className="ml-3">
          <span className="relative top-[-7.5px] right-[-23.5px] bg-red-500 text-white text-xs p-[0px] px-[4px] rounded-full">
            {notificationCount}
          </span>
          <FontAwesomeIcon icon={faBell} />
        </div> */}
        <button
          className="ml-4 border-2 p-2 rounded-md"
          onClick={() => setHelpDesk(true)}
        >
          Help Desk
        </button>
      </div>
      {helpDesk && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full text-black">
              <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Contact Us</h2>
              <button
                className="text-black font-bold text-2xl"
                onClick={() => setHelpDesk(false)}
              >
                &times;
              </button>
            </div>
            <p>Address: 2nd Floor, VV Towers, AI Research & Development Office, No:16, SH 49A, West Wing, OMR, Karapakkam, Chennai, Tamil Nadu 600097</p>
            <p>Phone: 063820 01576</p>
            <form ref={form} onSubmit={sendEmail} enctype="text/plain">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" required className="mt-1 mb-4 p-2 border border-gray-300 rounded-md w-full"/>

              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <input type="text" id="subject" name="subject" required className="mt-1 mb-4 p-2 border border-gray-300 rounded-md w-full"/>

              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows="6" required className="mt-1 mb-4 p-2 border border-gray-300 rounded-md w-full"></textarea>

              <button type="submit" className="w-full py-2 px-4 bg-[#4D989D] text-white rounded-md">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
