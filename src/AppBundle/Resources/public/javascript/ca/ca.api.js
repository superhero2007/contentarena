import axios from "axios";

/**
 * Created by JuanCruz on 4/1/2018.
 */

const __apiStore = {
	tournaments: {},
};

window.ContentArena = window.ContentArena || {};

ContentArena.Api = {
	sortByLabel(a, b) {
		return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);
	},
	sortBySport(a, b) {
		if (a.sport.name > b.sport.name) return 1;
		if (a.sport.name < b.sport.name) return -1;
		if (a.sportCategory.name > b.sportCategory.name) return 1;
		if (a.sportCategory.name < b.sportCategory.name) return -1;
		if (a.name > b.name) return 1;
		if (a.name < b.name) return -1;
		return 0;
	},
	prepareList(list, categoryId) {
		const _this = this;

		if (!Array.isArray(list)) list = [list];

		list = $.map(list, (item) => {
			// Filter by category
			if (categoryId && item.category["@attributes"].id !== categoryId) return null;

			return {
				name: item["@attributes"].name,
				externalId: item["@attributes"].id,
				scheduled: item["@attributes"].scheduled,
				scheduledEnd: item["@attributes"].scheduled_end,
			};
		});

		list.sort(_this.sortByLabel);

		return list;
	},
	filterDoubles(list, sportId) {
		const names = [];

		if (sportId === "sr:sport:5") {
			list = list.map((item) => {
				item.name = item.name.replace(/ singles/gi, "")
					.replace(/ double/gi, "");
				return item;
			})
				.filter((item) => {
					if (names.indexOf(item.name) === -1) {
						names.push(item.name);
						return true;
					}
					return false;
				});
		}

		return list;
	},
	getCompanyTerms() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/terms/company`,
			type: "POST",
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},

	getCompanyDefinitions() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/definitions/company`,
			type: "POST",
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},

	restoreCompanyTerms() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/terms/restore`,
			type: "POST",
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},

	restoreDefinitions() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/definitions/restore`,
			type: "POST",
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},

	updateTerm(term) {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/terms/update`,
			type: "POST",
			data: {
				term,
			},
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	updateDefinition(definition) {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/definitions/update`,
			type: "POST",
			data: {
				definition,
			},
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	removeDefinition(definition) {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/definitions/remove`,
			type: "POST",
			data: {
				definition,
			},
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getContent(filter) {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}buy/search`,
			type: "POST",
			data: filter,
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getMarketplaceListings(filter) {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/marketplace/listings`,
			type: "POST",
			data: filter,
			success: (response) => {
				deferred.resolve(response);
			},
			error: (data, status) => {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	saveFilter(filter) {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}buy/filter/save`,
			type: "POST",
			data: filter,
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getCountries() {
		const deferred = jQuery.Deferred();
		const _this = this;

		if (ContentArena.Data.Countries && ContentArena.Data.Countries.length > 0) {
			deferred.resolve(ContentArena.Data.Countries);
		} else {
			$.ajax({
				url: `${envhosturl}api/search/countries/all`,
				type: "POST",
				/**
				 * @param {array} response
				 */
				success(response) {
					response.sort(_this.sortByLabel);
					response = response.map((c) => {
						c.regions = c.regions.map(r => r.id);
						c.externalId = c.id;
						return c;
					});
					ContentArena.Data.Countries = response;
					deferred.resolve(response);
				},
				error(data, status) {
					deferred.reject({
						data,
						status,
					});
				},
			});
		}

		return deferred.promise();
	},
	getActiveSports() {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/sports/active`,
			type: "POST",
			/**
			 * @param {array} response
			 */
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getAllSports(flags) {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/sports/all`,
			type: "POST",
			data: {
				flags,
			},
			/**
			 * @param {array} response
			 */
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getSportsGroups() {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/sports/groups`,
			type: "POST",
			/**
			 * @param {array} response
			 */
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getCountriesFull() {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/countries/full`,
			type: "POST",
			/**
			 * @param {array} response
			 */
			success(response) {
				response.sort(_this.sortByLabel);
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getTerritories() {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/territories`,
			type: "POST",
			/**
			 * @param {array} response
			 */
			success(response) {
				response.sort(_this.sortByLabel);
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getRegions() {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/regions`,
			type: "POST",
			/**
			 * @param {array} response
			 */
			success(response) {
				response.sort(_this.sortByLabel);
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getRights(rightsPackage, group) {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/rights`,
			type: "POST",
			data: {
				rightsPackage,
				group,
			},

			/**
			 * @param {array} response
			 */
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getRightsPackage(rightsPackage, group) {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${envhosturl}api/search/rights-package`,
			type: "POST",
			data: {
				rightsPackage,
				group,
			},

			/**
			 * @param {array} response
			 */
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getSports() {
		const deferred = jQuery.Deferred();
		const _this = this;
		$.ajax({
			url: `${externalApiUrl}v1/feed/sports`,
			type: "GET",
			/**
			 * @param {{sport:object}} response
			 */
			success(response) {
				const sports = _this.prepareList(response.sport);
				deferred.resolve(sports);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getContentDetails(id) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}content/details/`,
			type: "POST",
			data: { id },
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getPendingListings(id) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}content/pending-listings/`,
			type: "POST",
			data: { id },
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getCategories(sportId) {
		const deferred = jQuery.Deferred();
		const _this = this;
		let list = [];
		const cats = [];

		_this.getTournaments(sportId)
			.done(() => {
				if (!__apiStore.tournaments[sportId]) {
					deferred.resolve([]);
					return;
				}

				list = __apiStore.tournaments[sportId].tournament;

				if (!Array.isArray(list)) list = [list];

				list = $.map(list, (item) => {
					const { id } = item.category["@attributes"];

					if (cats.indexOf(id) !== -1) {
						return null;
					}
					cats.push(id);
					return item.category;
				});

				deferred.resolve(_this.prepareList(list));
			});


		return deferred.promise();
	},
	getTournaments(sportId, categoryId) {
		const deferred = jQuery.Deferred();
		const _this = this;
		let
			storedResponse;

		if (__apiStore.tournaments[sportId] !== undefined) {
			storedResponse = _this.prepareList(__apiStore.tournaments[sportId].tournament, categoryId);
			storedResponse = _this.filterDoubles(storedResponse, sportId);
			deferred.resolve(storedResponse);
			return deferred.promise();
		}

		$.ajax({
			url: `${externalApiUrl}v1/feed/tournaments`,
			type: "POST",
			data: { id: sportId },
			/**
			 * @param {{tournaments:{tournament:Array}}} response
			 */
			success(response) {
				// A comment
				if (response.tournaments === undefined || response.tournaments.tournament === undefined) {
					deferred.resolve([]);
					return;
				}

				__apiStore.tournaments[sportId] = response.tournaments;

				let list = _this.prepareList(response.tournaments.tournament, categoryId);
				list = _this.filterDoubles(list, sportId);
				deferred.resolve(list);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});
		return deferred.promise();
	},
	getSeasons(tournamentId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${externalApiUrl}v1/feed/seasons`,
			type: "POST",
			data: { id: tournamentId },
			/**
			 * @param {{tournaments:{tournament:Array}}} response
			 */
			success(response) {
				let list;

				if (response.seasons === undefined || response.seasons.season === undefined) {
					deferred.resolve([]);
					return false;
				}

				if ($.isArray(response.seasons.season)) {
					list = $.map(response.seasons.season, item => ({
						name: item["@attributes"].name,
						externalId: item["@attributes"].id,
						endDate: item["@attributes"].end_date,
						startDate: item["@attributes"].start_date,
						tournamentId: item["@attributes"].tournament_id,
						year: item["@attributes"].year,
					}))
						.reverse();
				} else {
					list = [{
						name: response.seasons.season["@attributes"].name,
						externalId: response.seasons.season["@attributes"].id,
						endDate: response.seasons.season["@attributes"].end_date,
						startDate: response.seasons.season["@attributes"].start_date,
						tournamentId: response.seasons.season["@attributes"].tournament_id,
						year: response.seasons.season["@attributes"].year,
					}];
				}

				deferred.resolve(list);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});
		return deferred.promise();
	},
	getSchedule(seasonId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${externalApiUrl}v1/feed/schedules`,
			type: "POST",
			data: { id: seasonId },
			/**
			 * @param {{tournaments:{tournament:Array}}} response
			 */
			success(response) {
				const list = {};

				if (response.sport_events === undefined || response.sport_events.sport_event === undefined) return false;

				response.sport_events.sport_event.forEach((item) => {
					const round = (item.tournament_round) ? item.tournament_round["@attributes"] : null;

					if (!round) return;

					const name = (round.number) ? `round_${round.number}` : round.name;

					if (!list[name]) list[name] = {};

					if (!list[name].matches) list[name].matches = new Map();

					list[name].matches.set(item["@attributes"].id, {
						scheduled: item["@attributes"].scheduled,
						externalId: item["@attributes"].id,
						status: item["@attributes"].status,
						tournamentRound: round,
						competitors: (item.competitors) ? item.competitors.competitor.map(competitor => competitor["@attributes"]) : null,
					});
				});

				deferred.resolve(list);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});
		return deferred.promise();
	},
	searchCompetition(request) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/search/tournament`,
			data: {
				content: request,
			},
			traditional: true,
			type: "POST",
			dataType: "json",
			success(data) {
				data.filter(item => !!item.sport)
					.sort(_this.sortBySport);

				deferred.resolve(data);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});
		return deferred.promise();
	},
	watchlist(id) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/watchlist/add`,
			type: "POST",
			data: { id },
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getNotifications() {
		return axios.get(`${envhosturl}api/notifications/`);
	},
	markNotificationAsVisited(id) {
		return axios.post(`${envhosturl}api/notifications/visited`, {
			id,
		});
	},
	markAllNotificationAsVisited() {
		return axios.post(`${envhosturl}api/notifications/all/visited`);
	},
	removeNotifications() {
		return axios.post(`${envhosturl}api/notifications/remove`);
	},
	markNotificationAsSeen() {
		return axios.get(`${envhosturl}api/notifications/seen`);
	},
	markMessagesAsSeen() {
		return axios.get(`${envhosturl}api/messages/seen?type=MESSAGE`);
	},
	signInUser(username, password) {
		return axios.post(`${envhosturl}api/users/login`, {
			username,
			password,
		});
	},
	recoverPassword(email) {
		return axios.post(`${envhosturl}api/users/password/recover`, {
			email,
		});
	},
	resetPassword(password, confirmationToken) {
		return axios.post(`${envhosturl}api/users/password/update`, {
			password,
			confirmationToken,
		});
	},
	signUpUser(firstName, lastName, email, companyLegalName) {
		return axios.post(`${envhosturl}api/users/register`, {
			firstName,
			lastName,
			email,
			companyLegalName,
		});
	},
};
