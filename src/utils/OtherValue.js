import { formatDataForChart } from "./FormatDataForChart";
import { findMinMax1, findMinMax2 } from "./findMinMax";
import { memo, useMemo } from "react";
export const OtherValue = (currentProject, allSenSorValue) => {
  const { field1, field2 } = useMemo(() => {
    return formatDataForChart(currentProject, allSenSorValue);
  }, [allSenSorValue]);
  const { min1, max1 } = findMinMax1(field1);
  const { min2, max2 } = findMinMax2(field2);
  const firstValue1 = allSenSorValue[0]?.field1;
  const lastValue1 = allSenSorValue[allSenSorValue?.length - 1]?.field1;
  const firstValue2 = allSenSorValue[0]?.field2;
  const lastValue2 = allSenSorValue[allSenSorValue?.length - 1]?.field2;

  return {
    min1,
    max1,
    min2,
    max2,
    firstValue1,
    firstValue2,
    lastValue1,
    lastValue2,
  };
};
