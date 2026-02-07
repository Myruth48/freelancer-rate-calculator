"use client";

import { useMemo, useState } from "react";

export default function Page() {
  const [monthlyGoal, setMonthlyGoal] = useState(""); // formatted: 100.000
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [tax, setTax] = useState("");

  const result = useMemo(() => {
    const weeksPerMonth = 4.33;

    const goal = Number(monthlyGoal.replace(/\./g, ""));
    const hours = Number(hoursPerWeek);
    const platformPct = Number(platformFee);
    const taxPct = Number(tax);

    if (!monthlyGoal || !hoursPerWeek) {
      return { ready: false, hourlyRate: 0, monthlyHours: 0 };
    }

    if (goal <= 0 || hours <= 0 || hours > 168) {
      return { ready: false, hourlyRate: 0, monthlyHours: 0 };
    }

    const monthlyHours = hours * weeksPerMonth;

    const platformKeep = platformPct > 0 ? 1 - platformPct / 100 : 1;
    const taxKeep = taxPct > 0 ? 1 - taxPct / 100 : 1;

    if (platformKeep <= 0 || taxKeep <= 0) {
      return { ready: false, hourlyRate: 0, monthlyHours };
    }

    const hourlyRate =
      goal / monthlyHours / platformKeep / taxKeep;

    return {
      ready: true,
      hourlyRate,
      monthlyHours,
    };
  }, [monthlyGoal, hoursPerWeek, platformFee, tax]);

  const roundedRate = result.ready ? Math.round(result.hourlyRate) : 0;

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-xl px-4 py-10">
        <h1 className="mb-2 text-3xl font-bold">
          Freelancer Hourly Rate Calculator
        </h1>
        <p className="mb-8 text-gray-600">
          Enter your income goal and realistic working hours.
        </p>

        <div className="space-y-4">
          <CurrencyTRInput
            label="Monthly income goal ($)"
            placeholder="e.g. 100.000"
            value={monthlyGoal}
            onChange={setMonthlyGoal}
          />

          <HoursPerWeekInput
            label="Hours per week"
            placeholder="1 – 168"
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
          />

          <PercentInput
            label="Platform fee (%)"
            placeholder="0 – 99"
            value={platformFee}
            onChange={setPlatformFee}
          />

          <PercentInput
            label="Tax (%)"
            placeholder="0 – 99"
            value={tax}
            onChange={setTax}
          />
        </div>

        <div className="mt-8 rounded-xl bg-gray-100 p-6">
          <div className="text-sm text-gray-600">
            Recommended hourly rate
          </div>

          {result.ready ? (
            <div className="mt-1 text-4xl font-bold">
              ${roundedRate} / hour
            </div>
          ) : (
            <div className="mt-2 text-gray-600">
              Fill in <b>Monthly income goal</b> and <b>Hours per week</b> to see your rate.
            </div>
          )}

          {result.ready && (
            <div className="mt-4 text-sm text-gray-700">
              Based on ~{result.monthlyHours.toFixed(1)} hours/month
              <InfoTooltip text="1 month ≈ 4.33 weeks (52 weeks ÷ 12 months)" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------- INPUTS ---------- */

// Monthly income: 100000 -> 100.000 (TR format)
function CurrencyTRInput(props: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  function formatTR(digits: string) {
    if (!digits || /^0+$/.test(digits)) return "";
    const n = Number(digits);
    if (!Number.isFinite(n) || n <= 0) return "";
    return new Intl.NumberFormat("tr-TR", {
      maximumFractionDigits: 0,
    }).format(n);
  }

  return (
    <label className="block">
      <span className="block text-sm font-medium">{props.label}</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={props.placeholder}
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        value={props.value}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          props.onChange(formatTR(digits));
        }}
      />
    </label>
  );
}

// Hours per week: 1–168 only
function HoursPerWeekInput(props: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium">{props.label}</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={props.placeholder}
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        value={props.value}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          if (!digits) {
            props.onChange("");
            return;
          }

          const n = Number(digits);

          // allow only 1–168
          if (Number.isFinite(n) && n >= 1 && n <= 168) {
            props.onChange(String(n));
          }
        }}
      />
    </label>
  );
}

// Percentage input: 0–99 only
function PercentInput(props: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium">{props.label}</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder={props.placeholder}
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-gray-500"
        value={props.value}
        onChange={(e) => {
          let v = e.target.value.replace(/\D/g, "");
          if (!v) {
            props.onChange("");
            return;
          }
          const n = Number(v);
          if (Number.isFinite(n) && n >= 0 && n <= 99) {
            props.onChange(String(n));
          }
        }}
      />
    </label>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="relative inline-block group ml-1">
      <span className="cursor-help text-gray-500">ⓘ</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-md bg-black px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}