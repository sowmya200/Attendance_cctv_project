// import * as React from "react";

// function Personalinfo({ data }) {
//   return (
//     <div className=" flex flex-col pt-4 pr-7 pb-8 pl-3.5 rounded-xl shadow-md bg-slate-50 max-w-[500px]">
//       <div className="flex gap-5 justify-between">
//         <div className="flex flex-col">
//           <div className="flex overflow-hidden relative flex-col items-start px-12 pt-11 pb-1.5 aspect-square w-[65px]">
//             <img
//               loading="lazy"
//               srcSet="..."
//               className="object-cover absolute inset-0 size-full"
//             />
//             <div className="relative shrink-0 w-full bg-emerald-500 rounded-full h-[15px]" />
//           </div>
//           <div className="mt-1.5 text-base font-semibold text-black">
//             {data.name}
//           </div>
//         </div>
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/0834f2e1f8da0bb3946b4405893435c19f682499af7e185372f2a8c54818b3ee?"
//           className="shrink-0 self-start aspect-square w-[30px]"
//         />
//       </div>
//       <div className="mt-2 text-base font-semibold text-gray-400">
//         {data.designation}
//       </div>
//       <div className="flex flex-col p-3.5 mt-3.5 w-full text-xs font-semibold bg-white rounded-md shadow-sm">
//         <div className="flex gap-5 items-start text-base">
//           <div className="flex flex-col flex-1">
//             <div className="text-gray-400">Department</div>
//             <div className="mt-2 text-black">{data.department}</div>
//           </div>
//           <div className="flex flex-col flex-1">
//             <div className="text-gray-400">Hired Date</div>
//             <div className="mt-2.5 text-black">{data.hiredDate}</div>
//           </div>
//         </div>
//         <div className="flex gap-1 mt-4 text-black whitespace-nowrap">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/b850c3d67d5851e8d4fbefbfb90f664162e724fa3bd105b373a4550ee0841b08?"
//             className="shrink-0 w-5 aspect-[1.18]"
//           />
//           <div className="flex-auto my-auto">{data.email}</div>
//         </div>
//         <div className="flex gap-2 mt-4 text-black whitespace-nowrap">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/a332b7f8499245e3a25183f6f0d9fa1ee352880ba720b41cb10e8fa4864b89b0?"
//             className="shrink-0 aspect-[0.93] fill-black w-[26px]"
//           />
//           <div className="flex-auto self-start">{data.phone}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Personalinfo;

import * as React from "react";

function Personalinfo({ data }) {
  return (
    <div className=" mt-8 w-[300px] h-[350px] flex flex-col pt-4 pr-7 pb-4 pl-3.5 rounded-xl shadow-md bg-slate-50 max-w-[500px]">
      <div className="flex gap-5 justify-between items-center">
        <div className="flex items-center"> {/* Modified */}
          <div className="overflow-hidden relative flex-shrink-0 w-[65px] h-[65px] rounded-full">
            <img
              loading="lazy"
              srcSet="..."
              alt="Profile"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-emerald-500 rounded-full"></div>
          </div>
          <div className="ml-3">
            <div className="text-base font-semibold text-black">{data.name}</div>
            <div className="mt-1 text-gray-400 text-xs">{data.designation}</div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/0834f2e1f8da0bb3946b4405893435c19f682499af7e185372f2a8c54818b3ee?"
          alt="Company Logo"
          className="flex-shrink-0 w-8 h-8"
        />
      </div>
      <div className="flex flex-col  p-8 mt-3.5 w-full text-xs font-semibold bg-white rounded-md shadow-sm">
        <div className="flex gap-5 items-start text-base">
          <div className="flex flex-col flex-1">
            <div className="text-gray-400">Department</div>
            <div className="mt-2 text-black">{data.department}</div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-gray-400">Hired Date</div>
            <div className="mt-2.5 text-black">{data.hiredDate}</div>
          </div>
        </div>
        <div className="flex gap-1 mt-4 text-black whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b850c3d67d5851e8d4fbefbfb90f664162e724fa3bd105b373a4550ee0841b08?"
            alt="Email Icon"
            className="shrink-0 w-5 h-5"
          />
          <div className="flex-auto my-auto">{data.email}</div>
        </div>
        <div className="flex gap-2 mt-4 text-black whitespace-nowrap">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a332b7f8499245e3a25183f6f0d9fa1ee352880ba720b41cb10e8fa4864b89b0?"
            alt="Phone Icon"
            className="shrink-0 w-5 h-5"
          />
          <div className="flex-auto self-start">{data.phone}</div>
        </div>
      </div>
    </div>
  );
}

export default Personalinfo;
