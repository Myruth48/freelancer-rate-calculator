"use client";

import { useMemo, useState } from "react";

export default function HomePage() {
  const [monthlyIncome, setMonthlyIncome] = useState<number | null>(null);
  const [hoursPerWeek, setHoursPerWeek] = useState<number | null>(null);
  const [platformFee, setPlatformFee] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  const inputClass =
    "w-full bg-white text-slate-900 placeholder:text-slate-500 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const formatNumber = (value: number | null) =>
    value === null ? "" : value.toLocaleString("en-US");

  const parseNumber = (value: string) => Number(value.replace(/[^0-9]/g, ""));

  const recommendedHourlyRate = useMemo(() => {
    if (
      monthlyIncome === null ||
      hoursPerWeek === null ||
      monthlyIncome <= 0 ||
      hoursPerWeek < 1 ||
      hoursPerWeek > 168
    ) {
      return null;
    }

    const monthlyHours = hoursPerWeek * 4;
    const baseRate = monthlyIncome / monthlyHours;

    const denom = 1 - platformFee / 100 - tax / 100;
    if (denom <= 0) return null;

    const rate = baseRate / denom;
    return Number.isFinite(rate) ? rate : null;
  }, [monthlyIncome, hoursPerWeek, platformFee, tax]);

  const formattedRate =
    typeof recommendedHourlyRate === "number"
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
        }).format(recommendedHourlyRate)
      : null;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Freelancer Hourly Rate Calculator
        </h1>

        <p className="text-center text-slate-600 mt-2">
          Calculate how much you should charge per hour to hit your monthly goal.
        </p>

        <p className="text-center text-slate-600 mt-2 max-w-md mx-auto">
          This freelancer hourly rate calculator helps you determine how much you
          should charge per hour based on your monthly income goals, working
          hours, platform fees, and taxes. Ideal for freelancers, consultants,
          and independent professionals.
        </p>

        <div className="mt-8 space-y-5">
          {/* Monthly income */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Monthly income goal
            </label>
            <input
              value={formatNumber(monthlyIncome)}
              onChange={(e) => {
                const num = parseNumber(e.target.value);
                setMonthlyIncome(num > 0 ? num : null);
              }}
              className={inputClass}
              placeholder="e.g. 10,000"
              inputMode="numeric"
            />
          </div>

          {/* Hours per week */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Hours per week
            </label>
            <input
              value={hoursPerWeek ?? ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                if (raw === "") {
                  setHoursPerWeek(null);
                  return;
                }
                const num = Number(raw);
                if (num >= 1 && num <= 168) setHoursPerWeek(num);
              }}
              className={inputClass}
              placeholder="1 – 168"
              inputMode="numeric"
            />
          </div>

          {/* Platform fee */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Platform fee (%)
            </label>
            <input
              value={platformFee}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                const num = raw === "" ? 0 : Number(raw);
                if (num >= 0 && num <= 99) setPlatformFee(num);
              }}
              className={inputClass}
              placeholder="0 – 99"
              inputMode="numeric"
            />
          </div>

          {/* Tax */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Tax (%)
            </label>
            <input
              value={tax}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                const num = raw === "" ? 0 : Number(raw);
                if (num >= 0 && num <= 99) setTax(num);
              }}
              className={inputClass}
              placeholder="0 – 99"
              inputMode="numeric"
            />
          </div>

          {/* Result */}
          <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 p-5">
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-blue-800">
                Recommended hourly rate
              </div>

              {/* Tooltip */}
              <div className="relative group">
                <div className="w-5 h-5 rounded-full border border-blue-300 text-blue-700 flex items-center justify-center text-xs font-bold cursor-default">
                  i
                </div>
                <div className="absolute left-0 top-7 hidden group-hover:block w-72 rounded-lg border border-slate-200 bg-white shadow-lg p-3 text-xs text-slate-700 z-10">
                  This is the gross hourly rate you should charge to reach your
                  monthly income goal, accounting for platform fee and tax.
                </div>
              </div>
            </div>

            {formattedRate ? (
              <div className="mt-3 text-3xl font-semibold text-slate-900">
                {formattedRate}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-700">
                Fill in <b>monthly income</b> and <b>hours per week</b> to see your
                rate.
              </p>
            )}
          </div>
        </div>

        {/* Footer links (AdSense essentials) */}
        <footer className="mt-10 text-center text-sm text-slate-500">
          <a href="/privacy-policy" className="underline mx-2">
            Privacy Policy
          </a>
          |
          <a href="/contact" className="underline mx-2">
            Contact
          </a>
        </footer>
      </div>
    </main>
  );
}