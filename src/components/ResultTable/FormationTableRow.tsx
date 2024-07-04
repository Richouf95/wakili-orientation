import React from "react";

function FormationTableRow({ program }: any) {
  console.log(program);
  return (
    <>
      <ul>
        <li>{program.bts.name != null ? program.bts.name : "N/A"}</li>
      </ul>
      {program.LicenceMaster &&
        program.LicenceMaster.map((i: any, index: any) => {
          const formation = i.formations;
          return (
            <ul key={`listArrete${index}`}>
              <li className="font-bold">{i.autorizeDecree}</li>
              <ul className="px-6 py-4 max-h-24 overflow-hidden hover:overflow-auto">{formation && formation.map((i: any, index: any) => {
                return(
                  <li key={`listFormation${index}`} className="list-disc ml-10">{i}</li>
                )
              })}</ul>
            </ul>
          );
        })}
    </>
  );
}

export default FormationTableRow;
