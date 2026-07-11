import { useEffect, useState } from "react";
import { AuctionResult } from "../api/types";

const VISIBLE_ROWS = 5;
const ROW_HEIGHT_PX = 44;
const STEP_INTERVAL_MS = 2500;
const TRANSITION_MS = 500;

interface AuctionTickerProps {
  results: AuctionResult[];
}

export function AuctionTicker({ results }: AuctionTickerProps) {
  const shouldCycle = results.length > VISIBLE_ROWS;
  const [step, setStep] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  useEffect(() => {
    if (!shouldCycle) return;
    const interval = setInterval(() => setStep((s) => s + 1), STEP_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [shouldCycle]);

  useEffect(() => {
    if (!shouldCycle || step !== results.length) return;
    const timeout = setTimeout(() => {
      setTransitionEnabled(false);
      setStep(0);
    }, TRANSITION_MS);
    return () => clearTimeout(timeout);
  }, [step, shouldCycle, results.length]);

  useEffect(() => {
    if (transitionEnabled) return;
    const raf = requestAnimationFrame(() => setTransitionEnabled(true));
    return () => cancelAnimationFrame(raf);
  }, [transitionEnabled]);

  if (results.length === 0) {
    return <p>등록된 경매 결과가 없습니다.</p>;
  }

  const rows = shouldCycle ? [...results, ...results] : results;

  return (
    <div className="ticker">
      <div className="ticker__header">
        <span>경매일자</span>
        <span>출하주</span>
        <span>품목</span>
        <span>품종</span>
        <span>등급</span>
        <span>무게(kg)</span>
        <span>수량</span>
        <span>단가(원)</span>
      </div>
      <div className="ticker__viewport">
        <div
          className="ticker__track"
          style={{
            transform: `translateY(-${step * ROW_HEIGHT_PX}px)`,
            transition: transitionEnabled ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
        >
          {rows.map((result, index) => (
            <div className="ticker__row" key={`${result.id}-${index}`}>
              <span>{new Date(result.auctionDate).toLocaleDateString()}</span>
              <span>{result.ownerName}</span>
              <span>{result.productName}</span>
              <span>{result.variety}</span>
              <span>{result.grade}</span>
              <span>{result.weight.toLocaleString()}</span>
              <span>{result.quantity.toLocaleString()}</span>
              <span>{result.unitPrice.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
