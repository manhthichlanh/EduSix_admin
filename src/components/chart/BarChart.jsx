import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import { map, range, sortBy } from "lodash";

const BarChart = ({chartData}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const sevenDaysAgo = moment().subtract(6, "days");

    const labels = map(range(7), (i) => {
      const date = moment(sevenDaysAgo).add(i, "days");
      return date.format("DD/MM/YYYY");
    });

    const sortedLabels = sortBy(labels, (date) => moment(date, "DD/MM/YYYY"));

    const chartDataFormatted = chartData.reduce((acc, dataPoint) => {
      const orderDate = moment(dataPoint.order_date, "YYYYMMDDHHmmss").format("DD/MM/YYYY");
      const index = sortedLabels.indexOf(orderDate);

      if (index !== -1) {
        acc[index] = acc[index] || 0;
        acc[index] += dataPoint.price;
      }

      return acc;
    }, []);

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedLabels,
        datasets: [
          {
            label: "Lượt mua",
            data: chartDataFormatted,
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

    // ...

    // Clean up when the component unmounts
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
