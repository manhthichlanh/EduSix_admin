import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import { map, range, sortBy } from "lodash";

const BarChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const sevenDaysAgo = moment().subtract(6, "days");

    const labels = map(range(7), (i) => {
      const date = moment(sevenDaysAgo).add(i, "days");
      return date.format("DD/MM/YYYY");
    });

    const sortedLabels = sortBy(labels, (date) => moment(date, "DD/MM/YYYY"));

    console.log(sortedLabels);

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: "Lượt truy cập",
            data: [12, 19, 85, 5, 2, 3, 16],
            borderWidth: 1,
            backgroundColor: "#FDF1E8",
            borderRadius: 5,
          },
          {
            label: "Lượt mua",
            data: [101, 20, 47, 4, 7, 8, 10],
            borderWidth: 1,
            backgroundColor: "#D3620F",
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        onResize: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20,
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} className="w-full max-h-[400px]"></canvas>
    </div>
  );
};

export default BarChart;
