import { useGetGraphValueQuery } from "../../store/api/api.action";
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
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "./Graph.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartDatasets {
  data: number[];
  borderColor: string;
}

interface Chart {
  labels: string[];
  datasets: ChartDatasets[];
}

const POLLING_INTERVAL = 60000;

export const Graph = (): JSX.Element => {
  const { data: graph, isSuccess } = useGetGraphValueQuery(void 0, {
    pollingInterval: POLLING_INTERVAL,
  });
  const [chart, setChart] = useState<Chart | null>(null);

  useEffect(() => {
    if (!graph) return;
    setChart({
      labels: graph.map(({ timestep }) => timestep),
      datasets: [
        {
          data: graph.map(({ currentValue }) => currentValue),
          borderColor: "black",
        },
      ],
    });
  }, [graph]);

  return (
    <div className="graph-wrapper">
      <div className="graph-header">Потребление</div>
      <div className="graph-content">
        {chart && <Line options={options} data={chart} redraw={isSuccess} />}
      </div>
    </div>
  );
};

const options = {
  tooltips: {
    enabled: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: false,
        display: false,
      },
      border: {
        width: 2,
        color: "black",
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        drawOnChartArea: false,
        display: false,
      },
      border: {
        width: 2,
        color: "black",
      },
      ticks: {
        display: false,
      },
    },
  },
};
