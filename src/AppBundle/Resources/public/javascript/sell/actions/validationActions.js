export const companyIsValid = ( company ) =>{
    return company.legalName !== undefined
        && company.legalName !== ""
        && company.vat !== undefined
        && company.vat !== ""
        && company.zip !== undefined
        && company.zip !== ""
        && company.address !== undefined
        && company.address !== ""
        && company.city !== undefined
        && company.city !== ""
        && company.country !== undefined;
};


export const programIsValid = ( program ) =>{

    if (!program) return false;

    return program.name !== undefined
        && program.name !== ""
        && program.duration !== undefined
        && program.duration !== ""
        && program.episodes !== undefined
        && program.episodes !== ""
        && program.releaseYear !== undefined
        && program.releaseYear !== ""
};

export const programsEnabled = ( rightsPackage ) =>{

    let programsEnabled = false;

    rightsPackage.forEach(( rightPackage )=>{
        if ( rightPackage.shortLabel === "PR" ) programsEnabled = true ;
    });

    return programsEnabled;

};
