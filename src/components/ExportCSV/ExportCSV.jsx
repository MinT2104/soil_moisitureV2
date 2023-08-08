import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import apiProjectService from "../../services/ApiProjectService";
import moment from "moment";

export const ExportCSV = ({ dataID, name, currentProject, path }) => {
  const [fileData, setFileData] = useState();

  const handleDataFetch = async () => {
    const response = await apiProjectService.post(`${path}`, {
      pid: dataID,
    });

    const formatData = response.data?.map((data) => {
      if (path === "/esp_sensor/getallfeed") {
        return {
          field1:
            (data?.field1 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
            3000,
          field2:
            (data?.field2 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
            3000,
          created_at: moment(data?.created_at).format("DD/MM/YYYY hh:mm:ss a"),
        };
      }
      if (path === "/rain/getallfeed") {
        return {
          field1: data?.field1 + "mm",
          generated_date: moment(data?.generated_date).format("DD/MM/YYYY"),
          generated_time: moment(data?.generated_time).format(" hh:mm:ss a"),
        };
      }
    });
    setFileData(formatData);
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return (
    <CSVLink
      className="bottom-0 color-Primary text-white w-full h-fit p-2 rounded font-bold z-40 flex items-center justify-center"
      data={fileData || []}
      filename={name}
    >
      Export
    </CSVLink>
  );
};
