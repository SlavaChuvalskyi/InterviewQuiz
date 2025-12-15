'use client'

import { currencyString } from "@/utils/string";
import { StripePlan } from "@/app/types";

type PlanProps = {
    plan: StripePlan,
    highlight?: boolean
}

export default function PlanDisplay({ plan, highlight }: PlanProps) {

    // Simple parser for demonstration; ideally use a robust formatted currency splitter if available
    const fullPrice = currencyString(plan.amount, plan.currency);
    const [currencySymbol, ...amountParts] = fullPrice.split('');
    const amount = fullPrice.replace(/[^0-9.,]/g, '');
    const symbol = fullPrice.replace(/[0-9.,]/g, '').trim();

    return (
        <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold tracking-tight ${highlight ? 'text-blue-900' : 'text-gray-900'}`}>
                    {fullPrice}
                </span>
                <span className={`text-sm font-medium ${highlight ? 'text-blue-600/80' : 'text-gray-500'}`}>
                    / {plan.interval}
                </span>
            </div>
        </div>
    )
};