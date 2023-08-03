import moment from "moment";

export const FilterForChart = (
  dayObjectChosen,
  initialIndex,
  currentProject,
  allSenSorValue
) => {
  //-------------initialize default value-----------

  let indexEnd = [];
  let indexStart = [];

  //----------------------------------------------

  const valueCreate = allSenSorValue.map((e) => e.created_at);
  const valueField1 = allSenSorValue.map((e) =>
    (
      (e?.field1 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
      3000
    ).toFixed(0)
  );
  const valueField2 = allSenSorValue.map((e) =>
    (
      (e?.field2 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
      3000
    ).toFixed(0)
  );

  // allSenSorValue.forEach((data) => {
  //   valueCreate.push(data.created_at);
  //   valueField1.push(

  //   );
  //   valueField2.push(
  //     (
  //       (data?.field2 / (currentProject?.type === "Esp32" ? 4095 : 1023)) *
  //       3000
  //     ).toFixed(0)
  //   );
  // });

  //---------format dateTime-----------------
  const dateTime = valueCreate.map((data) => moment(data).format("DD/MM/YYYY"));
  const w = window.innerWidth;
  //----------------------filter if dayObjectChosen is valid--------
  if (dayObjectChosen?.type === "month") {
    valueCreate.filter((item, index) => {
      if (
        moment(item).get("month") ===
          moment(dayObjectChosen.data?.end).get("month") &&
        moment(item).get("year") ===
          moment(dayObjectChosen.data?.end).get("year")
      ) {
        indexEnd.push(index);
      }
      if (
        moment(item).get("month") ===
          moment(dayObjectChosen.data?.start).get("month") &&
        moment(item).get("year") ===
          moment(dayObjectChosen.data?.start).get("year")
      ) {
        indexStart.push(index);
      }
    });
  }
  if (dayObjectChosen?.type === "year") {
    valueCreate.filter((item, index) => {
      if (
        moment(item).get("year") ===
        moment(dayObjectChosen.data?.end).get("year")
      ) {
        indexEnd.push(index);
      }
      if (
        moment(item).get("year") ===
        moment(dayObjectChosen.data?.start).get("year")
      ) {
        indexStart.push(index);
      }
    });
  }
  if (dayObjectChosen?.type === "day") {
    dateTime.filter((item, index) => {
      if (item === dayObjectChosen.data?.end) {
        indexEnd.push(index);
      }
      if (item === dayObjectChosen.data?.start) {
        indexStart.push(index);
      }
    });
  }
  if (dayObjectChosen?.type === "all") {
    dateTime.filter((item, index) => {
      if (item === dayObjectChosen.data?.end) {
        indexEnd.push(index);
      }
      if (item === dayObjectChosen.data?.start) {
        indexStart.push(index);
      }
    });
  }
  //---------------before filtering-----------------
  const initialValueCreated = valueCreate.slice(
    initialIndex.indexStart,
    initialIndex.indexEnd + 1
  );
  const initialValueField1 = valueField1.slice(
    initialIndex.indexStart,
    initialIndex.indexEnd + 1
  );
  const initialValueField2 = valueField2.slice(
    initialIndex.indexStart,
    initialIndex.indexEnd + 1
  );
  //---------------fitered------------------
  const filteredObjectCreated =
    dayObjectChosen?.type === "all"
      ? valueCreate.map((item) =>
          moment(item).format(w < 768 ? "D/M h:m a" : "DD/MM/YYYY hh:mm a")
        )
      : valueCreate
          .slice(indexStart[0], indexEnd[indexEnd.length - 1] + 1)
          .map((item) =>
            moment(item).format(w < 768 ? "D/M h:m a" : "DD/MM/YYYY hh:mm a")
          );
  const filteredObjectField1 =
    dayObjectChosen?.type === "all"
      ? valueField1
      : valueField1.slice(indexStart[0], indexEnd[indexEnd.length - 1] + 1);
  const filteredObjectField2 =
    dayObjectChosen?.type === "all"
      ? valueField2
      : valueField2.slice(indexStart[0], indexEnd[indexEnd.length - 1] + 1);

  return {
    initialValueCreated,
    initialValueField1,
    initialValueField2,
    filteredObjectCreated,
    filteredObjectField1,
    filteredObjectField2,
    valueCreate,
    valueField1,
    valueField2,
  };
};
