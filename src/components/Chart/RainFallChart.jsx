import React, { useLayoutEffect, useState, useContext } from "react";
import zoomPlugin from "chartjs-plugin-zoom";
import { useSelector } from "react-redux";
import apiProjectService from "../../services/ApiProjectService";
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

const RainFallChart = ({}) => {
  const { currentProject } = useContext(AppContext);
  const userRedux = useSelector((state) => state);
  const [allRain, setAllRain] = useState([]);
  const w = window.innerWidth;

  useLayoutEffect(() => {
    const getData = async () => {
      apiProjectService
        .post("/rain/alluserrain", {
          uid: userRedux.user?.uid,
        })
        .then((res) => {
          setAllRain(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData();
  }, [currentProject]);

  const currentRainFallStation = allRain?.filter(
    (data) => data?.pid === currentProject?.pid
  );
  //------------------------------------------------
  const valueCreate = [];
  const valueField1 = [];
  for (let i = 0; i < currentRainFallStation[0]?.feeds?.length; i++) {
    valueCreate.push(
      moment(currentRainFallStation[0]?.feeds[i]?.generated_date).format(
        w < 768 ? "DD/MM/YYY" : "DD/MM/YYYY"
      ) +
        " " +
        moment(currentRainFallStation[0]?.feeds[i]?.generated_time).format(
          w < 768 ? "hh:mm a" : "hh:mm a"
        )
    );
    if (currentRainFallStation[0]?.feeds[i]?.field1 === "NaN") {
      valueField1.push("0");
    }
    if (currentRainFallStation[0]?.feeds[i]?.field1 === "0") {
      valueField1.push("0");
    } else {
      valueField1.push(
        currentRainFallStation[0]?.feeds[i]?.field1?.replace("mm", "")
      );
    }
    // console.log(currentRainFallStation[0]?.feeds[i]);
  }
  //   console.log(valueField1);
  //----------------------------------------------

  const data = {
    labels: valueCreate.reverse(),
    // labels:
    //   dayObjectChosen.data?.start !== undefined
    //     ? filteredObjectCreated?.reverse()
    //     : valueCreate
    //         ?.map((data) =>
    //           moment(data).format(
    //             w < 768 ? "DD/MM/YYY hh:mm a" : "DD/MM/YYYY hh:mm a"
    //           )
    //         )
    //         .reverse(),
    datasets: [
      {
        label: "Rainfall",
        data: valueField1.reverse(),
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.1,
        yAxisID: "rainfall",
        type: "bar",
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
            drag: true,
            enabled: true,
            speed: 0.1,
          },
          pinch: {
            drag: true,
            enabled: true,
            speed: 0.05,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      rainfall: {
        position: "left",
        title: {
          display: true,
          text: "mm",
        },
        min: 0,
        max: 150,
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        min: 0,
        grid: {
          color: "#4b5563",
        },
        ticks: {
          maxTicksLimit: 5,
          stepSize: 1000,
        },
      },
    },
  };
  //------------------------

  return (
    <div className="z-40 relative bg-white dark:bg-[#2a213a]">
      <Bar height={w < 768 ? 600 : 100} options={options} data={data} />
    </div>
  );
};

export default RainFallChart;
