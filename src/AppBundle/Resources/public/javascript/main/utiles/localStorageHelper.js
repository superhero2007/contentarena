import localStorageEnums from '../constants/localStorageEnums';

class LocalStorageClass {
    constructor() {
        this.worldwideCountries = 242;
    }

    getRightsCheckboxSelected() {
        const LTFromStorage = localStorage.getItem(localStorageEnums.LT) &&
            JSON.parse(localStorage.getItem(localStorageEnums.LT));

        const LBFromStorage = localStorage.getItem(localStorageEnums.LB) &&
            JSON.parse(localStorage.getItem(localStorageEnums.LB));

        const DTFromStorage = localStorage.getItem(localStorageEnums.DT) &&
            JSON.parse(localStorage.getItem(localStorageEnums.DT));

        const NAFromStorage = localStorage.getItem(localStorageEnums.NA) &&
            JSON.parse(localStorage.getItem(localStorageEnums.NA));

        const HLFromStorage = localStorage.getItem(localStorageEnums.HL) &&
            JSON.parse(localStorage.getItem(localStorageEnums.HL));

        const PRFromStorage = localStorage.getItem(localStorageEnums.PR) &&
            JSON.parse(localStorage.getItem(localStorageEnums.PR));

        return [
            parseInt(LTFromStorage, 10),
            parseInt(LBFromStorage, 10),
            parseInt(DTFromStorage, 10),
            parseInt(NAFromStorage, 10),
            parseInt(HLFromStorage, 10),
            parseInt(PRFromStorage, 10),
        ].filter(checkboxItem => checkboxItem);
    }

    getCountriesSelected() {
        const countriesFromStorage = localStorage.getItem(localStorageEnums.TERRITORIES) &&
            JSON.parse(localStorage.getItem(localStorageEnums.TERRITORIES));

        return countriesFromStorage || [];
    }

    getAllCountries() {
        const countriesFromStorage = localStorage.getItem(localStorageEnums.TERRITORIES) &&
            JSON.parse(localStorage.getItem(localStorageEnums.TERRITORIES));

        return countriesFromStorage && countriesFromStorage.length === this.worldwideCountries;
    }

    getExclusive () {
        const exclusiveFromStorage = localStorage.getItem(localStorageEnums.EXCLUSIVE) &&
            JSON.parse(localStorage.getItem(localStorageEnums.EXCLUSIVE));

        return exclusiveFromStorage || false;
    }

    getSportsSelected () {
        const sports = localStorage.getItem(localStorageEnums.SPORTS) &&
            JSON.parse(localStorage.getItem(localStorageEnums.SPORTS));

        return sports || null;
    }
}

const LocalStorageHelper = new LocalStorageClass();

export default LocalStorageHelper;