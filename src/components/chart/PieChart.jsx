import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: [
          "Marketing",
          "Lập trình",
          "Thiết kế đồ họa",
          "Ngôn ngữ",
          "Tài chính",
          "Photography",
        ],
        datasets: [
          {
            data: [10, 20, 20, 30, 15, 25],
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
