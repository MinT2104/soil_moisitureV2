import React, {
  useEffect,
  memo,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarElement } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { AppContext } from "../../context/AppContext";
import moment from "moment";
import { findMinMax1 } from "../../utils/findMinMax";
import { findMinMax2 } from "../../utils/findMinMax";
import { formatDataForChart } from "../../utils/FormatDataForChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const Chart = (
  {
    // filteredObjectCreated,
    // filteredObjectField1,
    // filteredObjectField2,
    // initialValueField2,
    // initialValueField1,
    // initialValueCreated,
  }
) => {
  const { currentProject, allSenSorValue } = useContext(AppContext);
  const w = window.innerWidth;
  const { field1, field2, date } = useMemo(() => {
    return formatDataForChart(currentProject, allSenSorValue);
  }, [allSenSorValue]);
  const { min1, max1 } = findMinMax1(field1);
  const { min2, max2 } = findMinMax2(field2);
  const Max = () => {
    if (max1 < max2) return max2;
    else return max1;
  };
  const Min = () => {
    if (min1 < min2) return min1 - (3000 - Max());
    else return min2 - (3000 - Max());
  };

  //----------------------------------------------

  const data = {
    labels: date,
    datasets: [
      {
        label: currentProject?.depth_level_2 || "humid depth 2",
        data: field2,
        borderColor: "#1e40af",
        backgroundColor: "blue",
        tension: 0.1,
        yAxisID: "humid",
      },
      {
        label: currentProject?.depth_level_1 || "humid depth 1",
        data: field1,
        borderColor:
          localStorage.getItem("dark") === "true" ? "blue" : "#1D267D",
        backgroundColor:
          localStorage.getItem("dark") === "true" ? "#ffffff" : "#cf3600",
        tension: 0.1,
        yAxisID: "humid",
      },
    ],
  };
  const options = {
    layout: {
      padding: 10,
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          speed: 10,
          mode: "x",
          threshold: 10,
        },
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
          },
          // pinch: {
          //   drag: true,
          //   enabled: true,
          //   speed: 0.05,
          // },
          mode: "x",
        },
      },
    },
    scales: {
      humid: {
        position: "left",
        title: {
          display: true,
          text: "mV",
        },
        min: Min() || 0,
        max: 3000,
        // grid: {
        //   color: "#4b5563",
        // },
        ticks: {
          stepSize: 150,
        },
      },

      x: {
        min: 0,
        grid: {
          color: "#4b5563",
        },
        ticks: {
          maxTicksLimit: 3,
          stepSize: 1000,
        },
      },
    },
  };
  //------------------------
  return (
    <div className="z-30 relative bg-white dark:bg-[#2a213a]">
      <Line height={140} options={options} data={data} />
    </div>
  );
};

export default memo(Chart);
