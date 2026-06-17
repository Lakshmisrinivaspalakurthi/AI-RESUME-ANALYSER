"use client";

import {
 PieChart,
 Pie,
 Cell
} from "recharts";

export default function SkillGapChart({
 matched,
 missing
}:{
 matched:number;
 missing:number;
}) {

 const data = [

  {
   name:"Matched",
   value:matched
  },

  {
   name:"Missing",
   value:missing
  }
 ];

 return (

  <PieChart
   width={400}
   height={400}
  >

   <Pie
    data={data}
    dataKey="value"
   />

  </PieChart>

 );
}
