import { useEffect, useRef, useState } from "react";
import { AuctionResult } from "../api/types";

const VISIBLE_ROWS = 5;
const DEFAULT_ROW_HEIGHT_PX = 44;
const STEP_INTERVAL_MS = 2500;
const TRANSITION_MS = 500;

interface AuctionTickerProps {
  results: AuctionResult[];
}

export function AuctionTicker({ results }: AuctionTickerProps) {
  const shouldCycle = results.length > VISIBLE_ROWS;
  const [step, setStep] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [rowHeight, setRowHeight] = useState(DEFAULT_ROW_HEIGHT_PX);
  const firstRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = firstRowRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      if (height > 0) setRowHeight(height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [results]);

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
      <div className="ticker__viewport" style={{ height: rowHeight * VISIBLE_ROWS }}>
        <div
          className="ticker__track"
          style={{
            transform: `translateY(-${step * rowHeight}px)`,
            transition: transitionEnabled ? `transform ${TRANSITION_MS}ms ease` : "none",
          }}
        >
          {rows.map((result, index) => (
            <div className="ticker__row" key={`${result.id}-${index}`} ref={index === 0 ? firstRowRef : undefined}>
              <span data-label="경매일자">{new Date(result.auctionDate).toLocaleDateString()}</span>
              <span data-label="출하주">{result.ownerName}</span>
              <span className="ticker__cell--title" data-label="품목">
                {result.productName}
              </span>
              <span data-label="품종">{result.variety}</span>
              <span data-label="등급">{result.grade}</span>
              <span data-label="무게(kg)">{result.weight.toLocaleString()}</span>
              <span data-label="수량">{result.quantity.toLocaleString()}</span>
              <span data-label="단가(원)">{result.unitPrice.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
