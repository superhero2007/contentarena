import cn from "classnames";
import React from "react";
import moment from "moment";
import max from "lodash/max";
import store from "../../../main/store";

export const getListingImage = (props) => {
	const { imageBase64, image, sports } = props;
	let listingImageUrl = (imageBase64) || (image ? `${assetsBaseDir}../${image}` : null);
	let isSportPlaceholder = false;
	let caLogo = false;

	if (!listingImageUrl) {
		const sportId = sports && sports.length ? (sports[0].id || sports[0].externalId) : null;
		const imagesBaseDir = `${assetsBaseDir}app/images/listing/default-sports/`;
		let imageName = "";
		isSportPlaceholder = true;

		switch (sportId) {
		case 1:
		case "sr:sport:1":
			imageName = "soccer.svg"; // Soccer
			break;
		case 15:
		case "sr:sport:16":
			imageName = "america-futbol.svg"; // American Football
			break;
		case 7:
		case "sr:sport:3":
			imageName = "basketball.svg"; // Baseball
			break;
		case 3:
		case "sr:sport:2":
			imageName = "basketball.svg"; // Basketball
			break;
		case 10:
		case "sr:sport:21":
			imageName = "cricket.svg"; // Cricket
			break;
		case 11:
		case "sr:sport:24":
			imageName = "hockey.svg"; // Field Hockey
			break;
		case 4:
		case "sr:sport:20":
			imageName = "table-tennis.svg"; // Table Tennis
			break;
		case 5:
		case "sr:sport:5":
			imageName = "tennis.svg"; // Tennis
			break;
		case 16:
		case "sr:sport:23":
			imageName = "volleyball.svg"; // Volleyball
			break;
		case 9:
		case "sr:sport:9":
			imageName = "golf.svg"; // Golf
			break;
		default:
			imageName = "logo-content-arena.svg";
			caLogo = true;
			break;
		}

		listingImageUrl = imagesBaseDir + imageName;
	}

	return (
		<div className={cn("image", { "sport-placeholder": isSportPlaceholder, "ca-logo": caLogo })}>
			<img src={listingImageUrl} alt="" />
		</div>
	);
};

export const humanFileSize = (bytes, si) => {
	const thresh = si ? 1000 : 1024;
	if (Math.abs(bytes) < thresh) {
		return `${bytes} B`;
	}
	const units = si
		? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		: ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
	let u = -1;
	do {
		bytes /= thresh;
		++u;
	} while (Math.abs(bytes) >= thresh && u < units.length - 1);
	return `${bytes.toFixed(1)} ${units[u]}`;
};

export const getAutoGeneratedListingName = ({
	sports, sportCategory, tournament, seasons, customCategory, customTournament,
}) => {
	let summary = "";
	const rounds = [];
	let fixtures = [];
	const matches = [];

	if (sports.length === 0 && sportCategory.length === 0 && tournament.length === 0) return null;

	if (sports.length > 1) {
		summary += "Multiple sports";
	} else {
		summary += (sports[0].custom) ? (sports[0].value !== undefined) ? sports[0].value : "" : sports[0].name;
	}

	if (sportCategory.length > 0 && !sportCategory[0].custom) summary += ` - ${sportCategory[0].name}`;
	if (sportCategory.length === 0 && customCategory && customCategory !== "") summary += ` - ${customCategory}`;
	if (tournament.length > 0 && !tournament[0].custom) summary += ` - ${tournament[0].name}`;
	if (customTournament && customTournament !== "") summary += ` - ${customTournament}`;
	if (seasons.length > 0) {
		const seasonsStr = [];
		seasons.forEach((s) => {
			const str = s.custom && s.from && s.to && !isNaN(s.to)
				? `${s.from}/${s.to}`
				: (s.custom && s.from)
					? s.from
					: (s.year)
						? s.year
						: null;
			if (str) seasonsStr.push(str);
			if (s.fixtures) fixtures = [...fixtures, ...s.fixtures];
		});

		if (seasonsStr.length) {
			summary += ` - ${seasonsStr.join(" - ")}`;
		}
	}

	if (rounds.length <= 1 && fixtures.length === 1) summary += ` - ${fixtures[0].name} (${moment(fixtures[0].date).format("DD-MM-YYYY")})`;
	if (rounds.length <= 1 && fixtures.length > 1) summary += ` - ${fixtures.length} Fixtures`;
	if (rounds.length <= 1 && matches.length === 1) {
		summary += ` - ${matches[0].competitors.map(competitor => competitor.name).join(" vs ")}`;
	}
	if (rounds.length === 1 && matches.length !== 1) summary += ` - ${rounds[0]}`;
	if (rounds.length > 1) summary += " - Multiple rounds";

	return summary;
};

export const getMaxDate = (rightsPackage, seasons) => {
	const hasLiveTransmission = !!rightsPackage.find(item => item.shortLabel === "LT");
	let date = null;

	if (hasLiveTransmission) {
		let maxFixtureDate = null;
		let maxSeasonDate = null;

		if (seasons) {
			const fixtureDates = [];
			const dates = seasons.map((season) => {
				if (season.fixtures) {
					season.fixtures.forEach((fixture) => {
						fixtureDates.push(moment(fixture.date));
					});
				}

				return moment(season.customEndDate);
			});

			maxFixtureDate = max(fixtureDates);
			maxSeasonDate = max(dates);
		}

		date = max([maxFixtureDate, maxSeasonDate]);
	}

	return date;
};

export const contentParserFromServer = (content) => {
	if (content.parsed) return content;

	console.log(content);

	let sort = true;

	if (content.extraData) {
		Object.entries(content.extraData).forEach(
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
					label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId,
				}));
			}
			if (sp.territories) {
				sp.territories = sp.territories.map(t => ({
					name: t.name, label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId,
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
					label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId,
				}));
			}
			if (sp.territories) {
				sp.territories = sp.territories.map(t => ({
					label: t.name, value: t.name, regions: t.regions, territoryId: t.territoryId,
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
		if (sort) content.salesPackages.sort(sortSalesPackages).reverse();
	}

	if (content.endDate) content.endDate = moment(content.endDate);
	if (content.startDate) content.startDate = moment(content.startDate);
	if (content.signature) content.signature = hosturl + content.signature;

	content.step = Number(content.step);
	content.customSeasons = content.seasons.filter(s => s.externalId && s.externalId.startsWith("ca:")).map((s, i) => {
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
};

export const sortSalesPackages = function (a, b) {
	const c = (a, b) => ((a > b) ? 1 : ((b > a) ? -1 : 0));
	return c(a.territories.length, b.territories.length) || c(b.name, a.name);
};

export const serialize = function (obj, prefix) {
	const str = [];
	let p;
	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			const k = prefix ? `${prefix}[${p}]` : p;
			const v = obj[p];
			str.push((v !== null && typeof v === "object")
				? serialize(v, k)
				: `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
		}
	}
	return str.join("&");
};

export const validateEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const getSeasonDateString = (dateObj, hideMonth = false) => {
	const {
		customStartDate, startDate, customEndDate, endDate,
	} = dateObj;

	const start = moment(customStartDate || startDate).utc();
	const end = moment(customEndDate || endDate).utc();

	const startMonth = start.format("MMM");
	const endMonth = end.format("MMM");

	const startYear = start.format("YYYY");
	const endYear = end.format("YYYY");

	const isMonthAdded = startMonth && endMonth && !hideMonth;

	if (startYear === endYear) {
		return `${endYear}`;
	}
	if (startYear < endYear && !isMonthAdded) {
		return `${startYear}/${endYear.toString().substr(-2)}`;
	}
	if (startYear < endYear && isMonthAdded) {
		return `${startYear}/${endYear.toString().substr(-2)} (${startMonth} ${startYear} - ${endMonth} ${endYear})`;
	}
	return "";
};
