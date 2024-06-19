
// import {Doughnut} from "react-chartjs-2"
// import { Chart,ArcElement,Tooltip,Legend } from 'chart.js';
// Chart.register(ArcElement,Tooltip,Legend)
// function Charts() {
// const data={
//   labels:['working days','Non-working days'],
//   datasets:[{
//     label:'Attendance Tracker',
//     data:[80,20],
//     backgroundColor:['#96609B','#D8AD59'],
//     borderColor:['#96609B','#D8AD59'],
//   }]
// }
// const options={
//     cutout: '70%',
// }
//   return (
//     <div className="w-[300px] h-[350px] m-8 pb-4 bg-slate-100 max-w-[500px] rounded-xl">
//     <div className="h-[95%] w-full">
//     <h1 className="text-center text-xl text-black mt-2 mb-2 font-semibold">Attendance Tracker</h1>
//      <Doughnut data={data} options={options}></Doughnut>
//     </div>
//    </div>
//   );
// }

// export default Charts;
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

function Charts() {
  const data = {
    labels: ['Working days', 'Non-working days'],
    datasets: [{
      label: 'Attendance Tracker',
      data: [80, 20],
      backgroundColor: ['#96609B', '#D8AD59'],
      borderColor: ['#96609B', '#D8AD59'],
    }]
  };

  const options = {
    cutout: '70%',
  };

  return (
    <div className="w-full md:w-[300px] h-[350px] m-8 pb-4 bg-slate-100 max-w-[500px] rounded-xl">
      <div className="h-[95%] w-full">
        <h1 className="text-center text-xl text-black mt-2 mb-2 font-semibold">Attendance Tracker</h1>
        <div className="w-full h-full">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default Charts;
