import React from 'react'

const DateCard = ({data}) => {
  return (
    <div className=" w-full m-8 p-10 flex flex-col items-start pt-4 pr-16 pb-7 pl-3.5 rounded-xl shadow-md bg-slate-50 max-w-[268px]">
    <div className="flex overflow-hidden relative flex-col items-start px-12 pt-11 pb-1.5 aspect-square no-repeat">
      <img
        loading="lazy"
        srcSet={data.img}
        className="object-cover absolute inset-0 size-full"
      />
      <div className="relative shrink-0 w-full bg-emerald-500 rounded-full h-[15px]" />
    </div>
    <div className="mt-1.5 text-base font-semibold text-black">
        {data.name}
    </div>
    <div className="mt-2 text-base font-semibold text-gray-400">
      {data.designation}
    </div>
  </div>
  )
}

export default DateCard
