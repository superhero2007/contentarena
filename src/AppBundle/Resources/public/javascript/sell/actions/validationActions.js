export const companyIsValid = ( company ) =>{
    return company.legalName !== undefined
        && company.legalName !== ""
        && company.zip !== undefined
        && company.zip !== ""
        && company.address !== undefined
        && company.address !== ""
        && company.city !== undefined
        && company.city !== ""
        && company.country !== undefined;
};
