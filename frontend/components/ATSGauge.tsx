"use client";

import {
 RadialBarChart,
 RadialBar
} from "recharts";

export default function ATSGauge({
 score
}:{
 score:number
}) {

 return (

  <RadialBarChart
   width={300}
   height={300}
   innerRadius="70%"
   outerRadius="100%"
   data={[
    {
      value: score
    }
   ]}
  >

   <RadialBar
    dataKey="value"
   />

  </RadialBarChart>

 );
}
