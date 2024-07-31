import React, { useEffect, useState } from "react";
import ListProgram from "@/components/school-owner/listProgram/ListProgram";

interface ProgramsSchoolProps {
  schoolId: any;
}

const ProgramsSchool: React.FC<ProgramsSchoolProps> = ({ schoolId }) => {

  return (<ListProgram schoolId={schoolId} />);
};

export default ProgramsSchool;
