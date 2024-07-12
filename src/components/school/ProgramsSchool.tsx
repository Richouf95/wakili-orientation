import React, { useEffect, useState } from "react";

interface ProgramsSchoolProps {
  programs: any;
}

const ProgramsSchool: React.FC<ProgramsSchoolProps> = ({ programs }) => {
  const [bts, setBts] = useState<any>();
  const [licenceMaster, setLicenceMaster] = useState<any>(null);

  useEffect(() => {
    setBts(programs.bts);
    setLicenceMaster(programs.LicenceMaster);
  }, []);
  console.log(programs);
  return (
    <div>
      <ul>
        <li>
          <strong className="text-lg">BTS & Diplômes d'Etat</strong>
          <ul>
            {bts ? (
              bts.name ? (
                <li className="ml-10 list-disc">bts.name</li>
              ) : (
                "N/A"
              )
            ) : (
              "N/A"
            )}
          </ul>
        </li>
        <li>
          <strong className="text-lg">Licence & Master</strong>
          <ul>
            {licenceMaster
              ? licenceMaster.length > 0
                ? licenceMaster.map((i: any, index: number) => {
                    return (
                      <li
                        className="ml-5"
                        key={`detailSchoolPragamFormation${index}`}
                      >
                        Autorisation :{" "}
                        <span className="font-bold  break-words">
                          {i.autorizeDecree}
                        </span>
                        <ul>
                          {
                            i.formations.length > 0 ? i.formations.map((x: string, xIndex: number) => {
                              return (<li className="ml-10 list-disc" key={`nameFormation${xIndex}`}>{x}</li>)
                            }) : "N/A"
                          }
                        </ul>
                      </li>
                    );
                  })
                : "N/A"
              : "N/A"}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProgramsSchool;
