import { useState } from "react";
import { useGetTableValuesQuery } from "../../store/api/api.action";
import "./Table.css";

const POLLING_INTERVAL = 60000;

export const Table = () => {
  const { data } = useGetTableValuesQuery(void 0, {
    pollingInterval: POLLING_INTERVAL,
  });
  const [idxActvie, setIdxActive] = useState<number | null>(null);

  return (
    <div className="table-wrapper">
      <div className="table">
        <div className="table-header">
          {headerCells.map((headerCell, index) => (
            <div
              key={headerCell}
              className="table-header-cell"
              onMouseEnter={() => setIdxActive(index)}
              onMouseLeave={() => setIdxActive(null)}
            >
              {headerCell}
              {index === idxActvie && <div className="tooltip">{headerCell}</div>}
            </div>
          ))}
        </div>
        <div className="table-body">
          {data?.map(({ currentValue, prevValue, change, timestep }) => (
            <div className="table-rows" key={timestep}>
              <div className="table-body-cell">{timestep}</div>
              <div className="table-body-cell">{currentValue}</div>
              <div className="table-body-cell">{prevValue}</div>
              <div className="table-body-cell">{change}</div>
              <div className="table-body-cell">{(change * 100).toFixed(1)} %</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const headerCells = [
  "Время показателя",
  "Текущее значение",
  "Предыдущее значение",
  "Изменение в долях",
  "Изменение в %",
];
