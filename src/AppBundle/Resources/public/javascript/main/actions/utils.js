export const getCurrencySymbol = code => {
    return (code === "EUR") ? "€" : "$";
};

export const goTo = route => {
    window.location.href = envhosturl + route
};

export const goToListing = id => {
    goTo("listing/"+ id)
};

export const goToMarketplace = () => {
    goTo("marketplace")
};

export const goToClosedDeals = () => {
    goTo("closeddeals")
};

export const getFee = (salesPackage) => {
    const feeNumber = parseFloat(salesPackage.fee);
    return feeNumber.toLocaleString() +" " + getCurrencySymbol(salesPackage.currency.code);
};

export const limitText = (txt, limit = 25) => {
    return (txt.length > limit) ? txt.substring(0,limit) + "..." : txt
};

export const editedProgramSelected = (rights) => {
    return rights.filter(r=>r.shortLabel === 'PR').length === 1
};

export const parseSeasons = (content) => {
    content.seasons.forEach((season)=>{
        season.selectedSchedules = {};
        Object.entries( season.schedules).filter((round) =>{  return round[1].selected} ).map((round)=>{
            if (!season.selectedSchedules[round[0]]) season.selectedSchedules[round[0]] = {matches:[]};
            if(round[1].selected){
                Array.from(round[1].matches.values()).filter(match => match.selected).forEach((match)=>{
                    season.selectedSchedules[round[0]].matches.push(match)

                })
            }
        })
    });

    return content;
};