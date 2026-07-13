'use client';

import { useMemo, useState } from 'react';
import { Calculator, Sparkles, TrendingUp } from 'lucide-react';

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function InvestorTools() {
  const [purchasePrice, setPurchasePrice] = useState(450000);
  const [monthlyRent, setMonthlyRent] = useState(3200);
  const [expenses, setExpenses] = useState(850);
  const [downPayment, setDownPayment] = useState(35);

  const metrics = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const annualExpenses = expenses * 12;
    const netIncome = Math.max(annualRent - annualExpenses, 0);
    const cashInvested = purchasePrice * (downPayment / 100);
    const capRate = purchasePrice > 0 ? (netIncome / purchasePrice) * 100 : 0;
    const cashYield = cashInvested > 0 ? (netIncome / cashInvested) * 100 : 0;

    return { annualRent, netIncome, cashInvested, capRate, cashYield };
  }, [downPayment, expenses, monthlyRent, purchasePrice]);

  return (
    <section className="border-y border-white/5 bg-charcoal-dark/60 py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Calculator className="h-4 w-4" />
            Investor Tools
          </span>
          <h2 className="text-4xl font-serif font-normal leading-tight text-white md:text-5xl">
            Quick ROI snapshot for Panama buyers
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-white/60">
            Estimate cap rate, annual rental income, and cash yield before booking a private advisory call. The numbers are directional and should be validated against live building fees, taxes, occupancy, and financing terms.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'Rental income model',
              'Cap rate estimate',
              'Cash-on-cash yield',
              'Investor questionnaire ready',
            ].map((item) => (
              <div key={item} className="border border-white/5 bg-white/[0.03] px-4 py-3 text-xs uppercase tracking-widest text-white/65">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/8 bg-charcoal-light/35 p-6 shadow-2xl">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              ['Purchase Price', purchasePrice, setPurchasePrice, 150000, 2500000, 25000],
              ['Monthly Rent', monthlyRent, setMonthlyRent, 800, 15000, 100],
              ['Monthly Expenses', expenses, setExpenses, 150, 6000, 50],
              ['Down Payment %', downPayment, setDownPayment, 10, 80, 5],
            ].map(([label, value, setter, min, max, step]) => (
              <label key={String(label)} className="space-y-2">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/45">{String(label)}</span>
                <input
                  type="range"
                  min={Number(min)}
                  max={Number(max)}
                  step={Number(step)}
                  value={Number(value)}
                  onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))}
                  className="w-full accent-gold"
                />
                <span className="block text-lg font-serif text-gold">
                  {String(label).includes('%') ? `${value}%` : currency(Number(value))}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border border-white/5 bg-charcoal-dark/60 p-4">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Annual Net</span>
              <strong className="mt-2 block text-2xl font-serif font-normal text-white">{currency(metrics.netIncome)}</strong>
            </div>
            <div className="border border-white/5 bg-charcoal-dark/60 p-4">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Cap Rate</span>
              <strong className="mt-2 block text-2xl font-serif font-normal text-white">{metrics.capRate.toFixed(1)}%</strong>
            </div>
            <div className="border border-white/5 bg-charcoal-dark/60 p-4">
              <span className="text-[10px] uppercase tracking-widest text-white/40">Cash Yield</span>
              <strong className="mt-2 block text-2xl font-serif font-normal text-white">{metrics.cashYield.toFixed(1)}%</strong>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 border border-gold/20 bg-gold/10 p-4 text-xs leading-relaxed text-white/65">
            <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>Use this as a first-pass investor screen. Final underwriting should include HOA, insurance, taxes, vacancy, furnishing, and financing.</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col gap-4 border border-white/5 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              AI Advisor Queue
            </span>
            <p className="mt-2 text-sm text-white/60">
              Natural-language property recommendations are staged here for the next phase.
            </p>
          </div>
          <a
            href="/buy"
            className="inline-flex items-center justify-center bg-gradient-gold px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-charcoal"
          >
            Browse Matching Listings
          </a>
        </div>
      </div>
    </section>
  );
}
