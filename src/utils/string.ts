
export const currencyString = (amount?: number, currency?: string) => {

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ?? "aud",
    }).format(amount ?  amount / 100 : 0);

}
