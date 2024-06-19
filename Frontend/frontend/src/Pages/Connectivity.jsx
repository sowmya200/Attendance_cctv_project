// import React from "react";

// const Connectivity = () => {
//   const data=[
//     {message:'Network Congestion',status:'clear',from_time:' 28 DEC 2023 1:30PM',to_time:' 30 DEC 2023 3:00PM'},
//     {message:'Server Downtime',status:'critical',from_time:'20 DEC 2023 1:30PM',to_time:'current'},
//     {message:'Backup/Recovery Failures',status:'Attention',from_time:'18 DEC 2023 9:30 AM',to_time:'current'},
//     {message:'Database Errors',status:'clear',from_time:'1:30PM',to_time:'3:00PM'},
//     {message:'CTV System malfunction',status:'clear',from_time:'02 DEC 2023 09:11 AM',to_time:'02 DEC 2023 11:11 AM'},
//   ]
//   return (
//     <div className="mt-8">
      // <div className="flex items-center pl-4">
      //   <div className="flex-grow border-b-4 border-bluechill"></div>
      //   <span className="px-2">Connectivity Report</span>
      //   <div className="flex-grow border-b-4 border-bluechill"></div>
      // </div>
//       {/* <div className="flex items-center">
//         <table className="border black">
//           <thead>
//           <tr>
//             <th rowSpan="2" className="p-2">
//               Message
//             </th>
//             <th rowSpan="2" className="p-2">
//               Critical Status
//             </th>
//             <th className="p-2">Date/Time</th>
//           </tr>
//           <tr>
//             <th className="p-2">From</th>
//             <th className="p-2">To</th>
//           </tr>
//           </thead>
//         </table>
//       </div> */}
//       <div className="flex justify-center items-center h-screen">
//   <table className="border border-black">
//     <thead>
//       <tr>
//         <th rowSpan="2" className="p-2">
//           Message
//         </th>
//         <th rowSpan="2" className="p-2">
//           Critical Status
//         </th>
//         <th className="p-2">Date/Time</th>
//       </tr>
//       <tr>
//         <th className="p-2">From</th>
//         <th className="p-2">To</th>
//       </tr>
//     </thead>
//     <tbody>
//       {/* <tr>
//         { data.map((data)=>{
//         <td>{data.message}</td>
//         <td>{data.status}</td>
//         <td>{data.from_time}</td>
//         <td>{data.to_time}</td>
//       })}
//       </tr> */}
    
//     </tbody>
//   </table>
// </div>
//     </div>
//   );
// };

// export default Connectivity;

import React, { useEffect, useState } from 'react';

const Connectivity = () => {
  const [records, setRecords] = useState([]);
  const data = [
    {Message:'Network Congestion',status:'Clear', from_time:'28 DEC 2023 09:11 AM', to_time:'30DEC 2023 09:12 PM'},
    {Message:'Server Downtime',status:'Clear', from_time:'28 DEC 2023 09:11 AM', to_time:'30DEC 2023 09:12 PM'},
    {Message:'Backup/Recovery Failures',status:'Clear', from_time:'28 DEC 2023 09:11 AM', to_time:'30DEC 2023 09:12 PM'}, 
    {Message:'Database Errors',status:'Clear', from_time:'28 DEC 2023 09:11 AM', to_time:'30DEC 2023 09:12 PM'},
    {Message:'CCTV malfunction',status:'Clear', from_time:'28 DEC 2023 09:11 AM', to_time:'30DEC 2023 09:12 PM'},
  ];

  useEffect(() => {
    setRecords(data);
  }, []);

  return (<div>
    <div className=" mt-8 flex items-center pl-4">
        <div className="flex-grow border-b-4 border-bluechill"></div>
        <span className="px-2">Connectivity Report</span>
        <div className="flex-grow border-b-4 border-bluechill"></div>
      </div>
     
    <div className="flex flex-col justify-center items-center  max-md:mt-10 max-md:max-w-full py-10 pl-16 pr-16 w-[80%] m-auto">
      <table className="w-full justify-center items-center mt-32 bg-white rounded-lg shadow-lg p-6 border-b-2 border-black h-[50vh]">
        <thead>
          <tr className="h-[50px]">
            <th  className='border border-black' rowSpan={2}>Message</th>
            <th className='border border-black' rowSpan={2}>Curent Status</th>
            <th  className='border border-black'colSpan={2}>Date/Time</th>
            </tr>
            <tr className="h-[50px]">
            <th className='border border-black'>From</th>
            <th className='border border-black'>To</th>
          </tr>
        </thead>
        <tbody className="text-center border-b-2 border-black">
          {records.map((item, index) => (
            <tr key={index} className='border border-black'>
              <td className="border border-black p-2">{item.Message}</td>
              <td className=" border border-black p-2">{item.status}</td>
              <td className=" border border-black p-2">{item.from_time}</td>
              <td className=" border border-black p-2">{item.to_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Connectivity;

