import { useEffect, useState } from "react";
import { useGetContolValueQuery } from "../../store/api/api.action";
import "./ControlValue.css";

const POLLING_INTERVAL = 5000;
const DEVIATION = 0.5;
const TARGET_VALUE = 5;

export const ControlValue = (): JSX.Element => {
  const { data } = useGetContolValueQuery(void 0, {
    pollingInterval: POLLING_INTERVAL,
  });
  const [isRangeChanges, setIsRangeChanges] = useState(false);
  const [targetValueChanges, setTargetValueChanges] = useState(false);

  useEffect(() => {
    if (!data) return;
    const { currentValue, minValue, maxValue } = data.value;
    const checkRange = currentValue < minValue || currentValue > maxValue;
    const isDeviation = TARGET_VALUE - currentValue;
    let deviationId: NodeJS.Timeout;

    if (isDeviation > DEVIATION) {
      setTargetValueChanges(true);
      deviationId = setTimeout(() => {
        setTargetValueChanges(false);
      }, 1000);
    }

    if (checkRange) setIsRangeChanges(true);
    const isRangeId = setTimeout(() => {
      setIsRangeChanges(false);
    }, 1000);

    return () => {
      clearTimeout(deviationId);
      clearTimeout(isRangeId);
    };
  }, [data]);

  return (
    <div className="control-value-wrapper">
      <div
        className="control-value-wrapper-half"
        style={{
          background: isRangeChanges ? "#6db6fb" : targetValueChanges ? "yellow" : "white",
        }}
      >
        <p className="control-price">Цена</p>

        <div className="control-price-count">
          {data?.value.currentValue}
          <span className="control-price-helper-text">руб./кВт*ч</span>
        </div>
      </div>
      <div className="second-half">
        5 руб./кВт*ч <span>План</span>
      </div>
    </div>
  );
};
