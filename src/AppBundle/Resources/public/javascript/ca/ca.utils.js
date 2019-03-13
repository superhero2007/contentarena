/**
 * Created by JuanCruz on 4/1/2018.
 */

import moment from "moment";
import store from "../main/store";


window.ContentArena = window.ContentArena || {};
ContentArena.Utils = {

	contentParserFromServer(content) {
		if (content.parsed) return content;

		let sort = true;

		if (content.extraData) {
			Object.entries(content.extraData)
				.forEach(
					([key, value]) => {
						content[key] = value;
						return content;
					},
				);
		}

		content.tournament = (content.tournament) ? Array.isArray(content.tournament) ? content.tournament : [content.tournament] : [];
		content.sportCategory = (content.sportCategory) ? Array.isArray(content.sportCategory) ? content.sportCategory : [content.sportCategory] : [];

		if (content.selectedRightsBySuperRight) {
			content.rightsPackage.forEach((rp) => {
				rp.selectedRights = content.selectedRightsBySuperRight[rp.id].items;
				rp.exclusive = content.selectedRightsBySuperRight[rp.id].exclusive;
			});
		}

		if (content.fixturesBySeason) {
			content.seasons = content.seasons.map((s, i) => {
				if (content.fixturesBySeason[i]) {
					if (!s.fixtures) s.fixtures = [];
					content.fixturesBySeason[i].forEach((fixture) => {
						s.fixtures.push(fixture);
					});
				}
				return s;
			});
		}


		if (content.law) {
			content.law.label = content.law.name;
			content.law.value = content.law.name;
		}

		if (content.customBundles) {
			content.customBundles.forEach((sp) => {
				if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
				if (sp.excludedCountries) {
					sp.excludedTerritories = sp.excludedCountries.map(t => ({
						label: t.name,
						value: t.name,
						regions: t.regions,
						territoryId: t.territoryId,
					}));
				}
				if (sp.territories) {
					sp.territories = sp.territories.map(t => ({
						name: t.name,
						label: t.name,
						value: t.name,
						regions: t.regions,
						territoryId: t.territoryId,
					}));
				}
				if (!sp.territories) sort = false;

				try {
					if (sp.installments) {
						sp.installments.forEach((i) => {
							if (i.date) i.date = moment(i.date);
						});
					}
				} catch (e) {
					// continue regardless of error
				}
			});
		}

		if (content.salesPackages) {
			content.salesPackages.forEach((sp) => {
				if (sp.salesMethod) sp.salesMethod = sp.salesMethod.name;
				if (sp.excludedCountries) {
					sp.excludedTerritories = sp.excludedCountries.map(t => ({
						label: t.name,
						value: t.name,
						regions: t.regions,
						territoryId: t.territoryId,
					}));
				}
				if (sp.territories) {
					sp.territories = sp.territories.map(t => ({
						label: t.name,
						value: t.name,
						regions: t.regions,
						territoryId: t.territoryId,
					}));
				}
				if (!sp.territories) sort = false;

				try {
					if (sp.installments) {
						sp.installments.forEach((i) => {
							if (i.date) i.date = moment(i.date);
						});
					}
				} catch (e) {
					// continue regardless of error
				}
			});
			if (sort) {
				content.salesPackages.sort(this.sortSalesPackages)
					.reverse();
			}
		}

		if (content.endDate) content.endDate = moment(content.endDate);
		if (content.startDate) content.startDate = moment(content.startDate);
		if (content.signature) content.signature = hosturl + content.signature;

		content.step = Number(content.step);
		content.customSeasons = content.seasons.filter(s => s.externalId && s.externalId.startsWith("ca:"))
			.map((s) => {
				let years;
				if (s.year) {
					years = s.year.split("/");
					s.from = years.length === 1 ? years[0] : 2000 + Number(years[0]);
					s.to = years.length === 1 ? null : 2000 + Number(years[1]);
				}

				/*
				if (content.fixturesBySeason) {
					s.fixtures = content.fixturesBySeason[i];
				}
				*/
				return s;
			});


		content.seasons = content.seasons.map((s) => {
			if (s.externalId && s.externalId.startsWith("ca:")) {
				s.custom = true;
			}

			if (content.extraData && content.extraData.seasonDurations) {
				const customSeasonDur = content.extraData.seasonDurations[s.externalId];

				if (customSeasonDur) {
					s.customStartDate = customSeasonDur.startDate;
					s.customEndDate = customSeasonDur.endDate;
				}
			}

			return s;
		});

		const { user } = store.getState();

		if (!content.signatureName) content.signatureName = `${user.firstName} ${user.lastName}`;
		if (!content.signaturePosition) content.signaturePosition = user.title;

		content.parsed = true;

		return content;
	},

	filterCompanyInfo(data) {
		const company = {};

		company.legalName = data.legalName;
		company.registrationNumber = data.registrationNumber;
		company.vat = data.vat;
		company.address = data.address;
		company.address2 = data.address2;
		company.city = data.city;
		company.zip = data.zip;
		company.country = data.country;

		return company;
	},

	sortSalesPackages(a, b) {
		const c = (a, b) => ((a > b) ? 1 : ((b > a) ? -1 : 0));
		return c(a.territories.length, b.territories.length) || c(b.name, a.name);
	},

	getWebsiteURl(str) {
		if (str.includes("http://") || str.includes("https://")) {
			return str;
		}
		return `http://${str}`;
	},
};
