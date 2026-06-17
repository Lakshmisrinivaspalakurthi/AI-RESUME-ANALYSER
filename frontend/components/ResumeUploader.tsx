"use client";

import { useState } from "react";

export default function ResumeUploader(){

 const [
  file,
  setFile
 ] = useState<File>();

 return(

  <input
   type="file"
   accept=".pdf"
   onChange={(e)=>
    setFile(
     e.target.files?.[0]
    )
   }
  />

 );

}
