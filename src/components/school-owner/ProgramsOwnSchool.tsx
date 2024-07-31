import React, { useEffect, useState } from "react";
import AddOwnSchoolProgram from "./addProgram/AddOwnSchoolProgram";
import ListProgram from "./listProgram/ListProgram";

interface ProgramsSchoolProps {
  schoolId: string;
}

const ProgramsSchool: React.FC<ProgramsSchoolProps> = ({ schoolId }) => {

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <AddOwnSchoolProgram schoolId={schoolId} />
      <ListProgram schoolId={schoolId} />
    </div>
  );
};

export default ProgramsSchool;
