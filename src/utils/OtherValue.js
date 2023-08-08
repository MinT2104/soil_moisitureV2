import { formatDataForChart } from "./FormatDataForChart";
import { findMinMax1, findMinMax2 } from "./findMinMax";
import { memo, useMemo } from "react";
export const OtherValue = (currentProject, allSenSorValue) => {
  const { field1, field2 } = useMemo(() => {
    return formatDataForChart(currentProject, allSenSorValue);
  }, [allSenSorValue]);
  const { min1, max1 } = findMinMax1(field1);
  const { min2, max2 } = findMinMax2(field2);
  const firstValue1 = field1[0];
  const lastValue1 = field1[field1?.length - 1];
  const firstValue2 = field2[0];
  const lastValue2 = field2[field2?.length - 1];

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
