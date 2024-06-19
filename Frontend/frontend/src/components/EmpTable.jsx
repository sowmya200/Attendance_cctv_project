import React, { useEffect, useState } from 'react'

const EmpTable = () => {
const [records ,setrecords] = useState([])
  const data=[
    {Date:'29/03/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'30/03/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'31/03/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'01/04/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'03/04/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'04/04/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'05/04/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
    {Date:'07/04/2023',Entry_time:'08:50:45',Entry_cam_no_no:'Gate-1 -Camera 2' ,Exit_time:'18:05:00', Exit_Cam_no:'Gate-2-Camera 1'},
]
useEffect(() => {
    setrecords(data)
  }, []);
  return (
    <div className=" w-[80%]flex flex-col mt-11 max-md:mt-10 max-md:max-w-full py-10 pl-16 pr-16">
    <table className="w-full justify-center items-center bg-white rounded-lg shadow-lg p-6">
      <thead>
        <tr className="bg-slate-50 h-[50px]">
          <th> Date</th>
          <th>Entry Time</th>
          <th>Entry Camera Number</th>
          <th>Exit Time</th>
          <th>Exit Camera Number</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {data.map((item) => (
          <tr
            key={item.Date}
            className='bg-white'
          >
            <td className='p-2'>{item.Date}</td>
            <td>{item.Entry_time}</td>
            <td>{item.Entry_cam_no_no}</td>
            <td>{item.Exit_time}</td>
            <td>{item.Exit_Cam_no}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default EmpTable