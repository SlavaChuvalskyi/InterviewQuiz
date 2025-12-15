
export const currencyString = (amount?: number, currency?: string) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ?? "aud",
    }).format(amount ?  amount / 100 : 0);
}

export function addInterval(date: Date, interval: string, count: number = 1): Date {
    const newDate = new Date(date);

    switch (interval) {
        case "day":
            newDate.setDate(newDate.getDate() + count);
            break;
        case "week":
            newDate.setDate(newDate.getDate() + 7 * count);
            break;
        case "month":
            newDate.setMonth(newDate.getMonth() + count);
            break;
        case "year":
            newDate.setFullYear(newDate.getFullYear() + count);
            break;
        default:
            throw new Error("Unknown interval: " + interval);
    }

    return newDate;
}

export const formattedDate = (date: Date) => {
    return date.toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};