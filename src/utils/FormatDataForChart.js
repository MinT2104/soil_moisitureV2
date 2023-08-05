import moment from "moment";
export const formatDataForChart = (currentProject, allSenSorValue) => {
  const field1 = allSenSorValue?.map((e) =>
    (
      (e?.field1 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
      3000
    ).toFixed(0)
  );
  const field2 = allSenSorValue?.map((e) =>
    (
      (e?.field2 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
      3000
    ).toFixed(0)
  );
  const date = allSenSorValue?.map((data) =>
    moment(data?.created_at).format("DD/MM/YYYY mm:hh a")
  );
  return { field1, field2, date };
};
