import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";

const PieChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  console.log({ chartData })
  const { cate_name: labels, data } = chartData
  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "#5C59E8",
              "#D3620F",
              "#667085",
              "#882929",
              "#15711F",
              "#4462FE",
            ],
          },
        ],
      },
      options: {
        onResize: true,
        maintainAspectRatio: false,
        responsive: true,
        animation: { animateScale: "true" },
        cutout: 70,
        layout: {
          padding: 20,
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <canvas ref={chartRef} className="w-full max-h-[300px]"></canvas>
    </div>
  );
};
export default PieChart;
