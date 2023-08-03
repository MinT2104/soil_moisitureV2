import moment from "moment";

const ChangePos = (a, b) => {
  let temp = a;
  a = b;
  b = temp;
};

export const sortRainFall = (sortValue, chooseDetail) => {
  if (sortValue === "Oldest") {
    return chooseDetail?.feeds.sort(
      (a, b) => moment(a.generated_date) - moment(b.generated_date)
    );
  }
  if (sortValue === "Latest") {
    return chooseDetail?.feeds
      .sort((a, b) => moment(a.generated_date) - moment(b.generated_date))
      .reverse();
  }
  if (sortValue === "Ascending") {
    return chooseDetail?.feeds
      .sort((a, b) => +a.field1 - +b.field1)
      .filter((dt) => {
        if (dt?.field1 !== "NaN") {
          return dt;
        }
      });
  }
  if (sortValue === "Descending") {
    return chooseDetail?.feeds
      .sort((a, b) => +a.field1 - +b.field1)
      .filter((dt) => {
        if (dt?.field1 !== "NaN") {
          return dt;
        }
      })
      .reverse();
  }
};
