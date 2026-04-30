'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type Props = {
  anchorRef: HTMLElement | null;
  open: boolean;
  selected?: Date;
  onSelect: (date?: Date) => void;
  onApply: () => void;
  onCancel: () => void;
  minWidth?: number;
  yearRange?: number;
};

export default function CalendarPopover({
  anchorRef,
  open,
  selected,
  onSelect,
  onApply,
  onCancel,
  minWidth = 160,
  yearRange = 10,
}: Props) {
  const popRef = useRef<HTMLDivElement | null>(null);
  const prevRef = useRef<Date | undefined>(selected);
  const [position, setPosition] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  const [visibleMonth, setVisibleMonth] = useState<Date>(selected ?? new Date());

  const centerOffset = Math.floor((yearRange - 1) / 2);

  const [yearPageStart, setYearPageStart] = useState<number>(() => {
    const y = (selected ?? new Date()).getFullYear();
    return y - centerOffset;
  });

  useEffect(() => {
    prevRef.current = selected;
    if (selected) {
      setVisibleMonth(selected);
      const y = selected.getFullYear();
      setYearPageStart(y - centerOffset);
    }
  }, [selected, centerOffset]);

  useEffect(() => {
    if (!open || !anchorRef) return;
    const rect = anchorRef.getBoundingClientRect();
    const left = Math.max(8, rect.left);
    const top = rect.bottom + 6 + window.scrollY;
    setPosition({ left, top });
  }, [open, anchorRef]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        onSelect(prevRef.current);
        onCancel();
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onCancel, onSelect]);

  if (!open) return null;
  if (typeof document === 'undefined') return null;

  const portal = document.body;

  const months = Array.from({ length: 12 }).map((_, i) =>
    new Date(0, i).toLocaleString(undefined, { month: 'short' })
  );
  const currentYear = visibleMonth.getFullYear();
  const monthIndex = visibleMonth.getMonth();

  const years = Array.from({ length: yearRange }).map((_, i) => yearPageStart + i);

  function Header() {
    function setMonth(m: number) {
      setVisibleMonth(new Date(currentYear, m, 1));
    }

    function setYear(y: number) {
      setVisibleMonth(new Date(y, monthIndex, 1));
      setYearPageStart(y - centerOffset);
    }

    const prevYear = () => {
      const y = currentYear - 1;
      setVisibleMonth(new Date(y, monthIndex, 1));
      setYearPageStart(y - centerOffset);
    };

    const nextYear = () => {
      const y = currentYear + 1;
      setVisibleMonth(new Date(y, monthIndex, 1));
      setYearPageStart(y - centerOffset);
    };

    return (
      <div className="calendar-header flex items-center justify-between gap-2 mb-2">
        <select
          value={monthIndex}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="calendar-select month-select"
        >
          {months.map((m, i) => (
            <option key={m} value={i}>{m}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <button onClick={prevYear} className="h-6 w-6 rounded-full border text-xs">‹</button>

          <select
            value={currentYear}
            onChange={(e) => setYear(Number(e.target.value))}
            className="calendar-select year-select"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button onClick={nextYear} className="h-6 w-6 rounded-full border text-xs">›</button>
        </div>
      </div>
    );
  }

  const popover = (
    <div
      ref={popRef}
      className="bg-white rounded-lg shadow-lg border p-2"
      style={{
        position: 'absolute',
        left: position.left,
        top: position.top,
        minWidth,
        zIndex: 99999,
      }}
    >
      <Header />

      <DayPicker
        className="rdp-tiny compact-daypicker"
        mode="single"
        selected={selected}
        onSelect={(d) => {
          onSelect(d ?? undefined);
          if (d) setVisibleMonth(d);
        }}
        showOutsideDays
        month={visibleMonth}
        onMonthChange={(m) => {
          setVisibleMonth(m);
          setYearPageStart(m.getFullYear() - centerOffset);
        }}
      />

      <div className="mt-2 flex justify-end gap-2">
        <button
          onClick={() => {
            onSelect(prevRef.current);
            onCancel();
          }}
          className="h-6 px-2 text-xs border rounded-full"
        >
          Cancel
        </button>

        <button
          onClick={onApply}
          className="h-6 px-2 text-xs bg-blue-600 text-white rounded-full"
        >
          Apply
        </button>
      </div>

      <style jsx global>{`
        .rdp-tiny.compact-daypicker {
          --rdp-day-size: 16px;
          --rdp-accent-color: transparent !important;
          --rdp-background-color: transparent !important;
          font-size: 10px;
        }

        .rdp-tiny.compact-daypicker .rdp-caption,
        .rdp-tiny.compact-daypicker .rdp-nav {
          display: none !important;
        }

        .rdp-tiny.compact-daypicker .rdp-month {
          padding: 0 !important;
        }

        .rdp-tiny.compact-daypicker .rdp-table {
          border-spacing: 2px !important;
        }

        .rdp-tiny.compact-daypicker .rdp-day {
          width: 16px;
          height: 16px;
          line-height: 16px;
          font-size: 9px;
          text-align: center;
        }

        .rdp-tiny.compact-daypicker .rdp-day_selected {
          color: #1d4ed8 !important;
          font-weight: 600;
        }

        .rdp-tiny.compact-daypicker .rdp-head_cell {
          font-size: 9px;
          padding: 2px;
        }

        .calendar-select {
          height: 24px;
          font-size: 10px;
          padding: 0 8px;
          border-radius: 9999px;
          border: 1px solid rgba(0, 0, 0, 0.12);
        }

        .month-select { min-width: 80px; }
        .year-select { min-width: 60px; }

        .compact-daypicker .rdp {
          margin: 0;
        }
      `}</style>
    </div>
  );

  return ReactDOM.createPortal(popover, portal);
}