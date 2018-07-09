export const getCurrencySymbol = code => {
    return (code === "EUR") ? "€" : "$";
};


export const goTo = route => {
    window.location.href = envhosturl + route
};