import React from "react";
import IntruderCard from "../components/IntruderCard";
import perimg1 from "../assets/per_img1.png"
import perimg2 from "../assets/per_img2.png"
import perimg3 from "../assets/per_img3.png"
import perimg4 from "../assets/per_img4.png"
const Intruders = () => {
  const data=[
    {person:'unknown1',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg1,},
    {person:'unknown2',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg2,},
    {person:'unknown3',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg3,},
    {person:'unknown4',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg4,},
    {person:'unknown1',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg1,},
    {person:'unknown2',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg2,},
    {person:'unknown3',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg3,},
    {person:'unknown4',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg4,},
    {person:'unknown1',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg1,},
    {person:'unknown2',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg2,},
    {person:'unknown3',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg3,},
    {person:'unknown4',entry_cam:'gate-2 camera 2',entry_time:'08:01:55', person_img:perimg4,},
    
  ]
  return (
    <div className="mt-8">
      <div className="flex items-center pl-4">
        <div className="flex-grow border-b-4 border-bluechill"></div>
        <span className="px-2">Intruders Report</span>
        <div className="flex-grow border-b-4 border-bluechill"></div>
      </div>
    <div className="m-8 flex flex-wrap gap-3.5 items-start my-auto">
    {data.map((data) => (
          <IntruderCard data={data} />
        ))}
    </div>
    </div>
  );
};

export default Intruders;
