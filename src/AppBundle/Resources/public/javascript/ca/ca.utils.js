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
					([key, value]) => content[key] = value,
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
			content.seasons.forEach((s, i) => {
				s.fixtures = content.fixturesBySeason[i];
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
			.map((s, i) => {
				let years;
				if (s.year) {
					years = s.year.split("/");
					s.from = years.length === 1 ? years[0] : 2000 + Number(years[0]);
					s.to = years.length === 1 ? null : 2000 + Number(years[1]);
				}

				if (content.fixturesBySeason) {
					s.fixtures = content.fixturesBySeason[i];
				}
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


	isAPIAvailable() {
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			// Great success! All the File APIs are supported.
			return true;
		}
		// source: File API availability - http://caniuse.com/#feat=fileapi
		// source: <output> availability - http://html5doctor.com/the-output-element/
		document.writeln("The HTML5 APIs used in this form are only available in the following browsers:<br />");
		// 6.0 File API & 13.0 <output>
		document.writeln(" - Google Chrome: 13.0 or later<br />");
		// 3.6 File API & 6.0 <output>
		document.writeln(" - Mozilla Firefox: 6.0 or later<br />");
		// 10.0 File API & 10.0 <output>
		document.writeln(" - Internet Explorer: Not supported (partial support expected in 10.0)<br />");
		// ? File API & 5.1 <output>
		document.writeln(" - Safari: Not supported<br />");
		// ? File API & 9.2 <output>
		document.writeln(" - Opera: Not supported");
		return false;
	},
	addOrdinal(n) {
		const str = n.toString()
			.slice(-1);
		let ord = "";
		switch (str) {
		case "1":
			ord = "st";
			break;
		case "2":
			ord = "nd";
			break;
		case "3":
			ord = "rd";
			break;
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "0":
			ord = "th";
			break;
		default:
		}
		return n + ord;
	},
	/**
	 *
	 * @param value
	 * @param arr
	 * @param prop
	 * @returns {number}
	 */
	getIndex(value, arr, prop) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i][prop] === value) {
				return i;
			}
		}
		return -1; // to handle the case where the value doesn't exist
	},

	getWebsiteURl(str) {
		if (str.includes("http://") || str.includes("https://")) {
			return str;
		}
		return `http://${str}`;
	},

	isListingPublished(status) {
		return (status && (status.name === "APPROVED" || status.name === "PENDING" || status.name === "EDITED"));
	},

};
