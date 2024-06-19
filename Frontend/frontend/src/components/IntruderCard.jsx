import React, { useEffect } from "react";

const IntruderCard = ({data}) => {
    useEffect(()=>{console.log(data)},[])
  return (
    <div className=" w-[20%] m-8 flex gap-3.5 py-10 pr-2.5 pl-8 text-base font-semibold text-gray-400 rounded-xl shadow-md bg-slate-50">
    <div className="flex flex-col items-start my-auto">
      <div className="text-base text-black">Unknown 1</div>
      <div className="self-stretch mt-3.5">Gate 1 Camera 2</div>
      <div className="mt-4">08:15:45</div>
    </div>
    <img
      loading="lazy"
      srcSet={data.person_img}
      className="shrink-0 aspect-[1.18] w-[88px]"
    />
  </div>
  );
};

export default IntruderCard;
