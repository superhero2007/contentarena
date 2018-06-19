export const companyIsValid = ( company ) =>{
    return company.legalName !== undefined
        && company.legalName !== ""
        && company.vat !== undefined
        && company.vat !== ""
        && company.zip !== undefined
        && company.zip !== ""
        && company.address !== undefined
        && company.address !== ""
        && company.registrationNumber !== undefined
        && company.registrationNumber !== ""
        && company.city !== undefined
        && company.city !== ""
        && company.country !== undefined;
};
