import moment from "moment";

export const sortRainFall = (sortValue, chooseDetailData) => {
  if (sortValue === "Oldest") {
    return chooseDetailData?.sort(
      (a, b) => moment(a.generated_date) - moment(b.generated_date)
    );
  }
  if (sortValue === "Latest") {
    return chooseDetailData
      ?.sort((a, b) => moment(a.generated_date) - moment(b.generated_date))
      .reverse();
  }
  if (sortValue === "Ascending") {
    return chooseDetailData
      ?.sort((a, b) => +a.field1 - +b.field1)
      .filter((dt) => {
        if (dt?.field1 !== "NaN") {
          return dt;
        }
      });
  }
  if (sortValue === "Descending") {
    return chooseDetailData
      ?.sort((a, b) => +a.field1 - +b.field1)
      .filter((dt) => {
        if (dt?.field1 !== "NaN") {
          return dt;
        }
      })
      .reverse();
  }
};
