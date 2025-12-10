'use client'

import {currencyString} from "@/utils/string";
import {StripePlan} from "@/app/types";

type PlanProps = {
    plan: StripePlan
}

export default function PlanDisplay({plan}: PlanProps) {

    console.log("plan = ", plan)

    return (
        <div className="flex flex-col gap-2 product">
            <div className="description">
                <h5 className="text-gray-500">
                    {currencyString(plan.amount, plan.currency)} / {plan.interval}
                </h5>
            </div>
        </div>

    )
};