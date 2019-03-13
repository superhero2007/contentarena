/**
 * Created by JuanCruz on 4/1/2018.
 */

const __apiStore = {
	tournaments: {},
};

window.ContentArena = window.ContentArena || {};
ContentArena.ContentApi = ContentArena.ContentApi || {};

ContentArena.ContentApi = {
	saveContentAsDraft(content) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}content/draft/save`,
			type: "POST",
			data: JSON.stringify(content),
			contentType: "application/json",
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
	saveContentAsInactive(content) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listing/save`,
			type: "POST",
			data: JSON.stringify(content),
			contentType: "application/json",
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
	saveContentAsActive(content) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listing/publish`,
			type: "POST",
			data: JSON.stringify(content),
			contentType: "application/json",
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
	republishListing(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listing/republish`,
			type: "POST",
			data: JSON.stringify({ customId }),
			contentType: "application/json",
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
	sendMessage(message) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/messages/send`,
			type: "POST",
			data: JSON.stringify(message),
			contentType: "application/json",
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
	getUserInfo() {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/user/info`,
			type: "POST",
			contentType: "application/json",
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
	getUserInfoByActivationCode(activationCode) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/user/code`,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({ activationCode }),
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
	getCompanyUsers() {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/company/users`,
			type: "POST",
			contentType: "application/json",
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
	updateCompany(company) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/company/update`,
			type: "POST",
			data: JSON.stringify({ company }),
			contentType: "application/json",
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
	updatePassword(data) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/user/password`,
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json",
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
	updateUser(user) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/user/update`,
			type: "POST",
			data: JSON.stringify({ user }),
			contentType: "application/json",
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
	activateUser(user, password) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/user/activate`,
			type: "POST",
			data: JSON.stringify({ user, id: user.id, password }),
			contentType: "application/json",
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
	updateUserProfile(profile) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/user/profile`,
			type: "POST",
			data: JSON.stringify({ profile }),
			contentType: "application/json",
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
	getThread(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/messages/thread`,
			type: "POST",
			data: JSON.stringify({ customId }),
			contentType: "application/json",
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
	getThreads() {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/messages/threads`,
			type: "POST",
			contentType: "application/json",
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
	placeBid(bid) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/bid/place`,
			type: "POST",
			data: JSON.stringify(bid),
			contentType: "application/json",
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
	placeBids(bid) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/bids/place`,
			type: "POST",
			data: JSON.stringify(bid),
			contentType: "application/json",
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
	acceptBid(bid, signature, signatureName, signaturePosition) {
		const deferred = jQuery.Deferred();
		const _this = this;

		bid.signature = signature;
		bid.signatureName = signatureName;
		bid.signaturePosition = signaturePosition;

		$.ajax({
			url: `${envhosturl}api/bid/accept`,
			type: "POST",
			data: JSON.stringify(bid),
			contentType: "application/json",
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
	rejectBid(bid) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/bid/reject`,
			type: "POST",
			data: JSON.stringify(bid),
			contentType: "application/json",
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
	removeBid(bid) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/bid/remove`,
			type: "POST",
			data: JSON.stringify(bid),
			contentType: "application/json",
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

	saveTmpFile(files) {
		const deferred = jQuery.Deferred();
		const _this = this;

		const data = new FormData();
		data.append("file", files[0]);

		$.ajax({
			url: `${envhosturl}content/save/file`,
			type: "POST",
			data,
			processData: false,
			contentType: false,
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
	saveAttachmentFile(files) {
		const deferred = jQuery.Deferred();
		const _this = this;

		const data = new FormData();
		data.append("file", files[0]);

		$.ajax({
			url: `${envhosturl}content/save/attachment`,
			type: "POST",
			data,
			processData: false,
			contentType: false,
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				console.log("FAILED");
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	removeAttachmentFile(file) {
		const deferred = jQuery.Deferred();


		$.ajax({
			url: `${envhosturl}content/remove/attachment`,
			type: "POST",
			data: {
				file,
			},
			success(response) {
				deferred.resolve(response);
			},
			error(data, status) {
				console.log("FAILED");
				deferred.reject({
					data,
					status,
				});
			},
		});

		return deferred.promise();
	},
	getByCustomId(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}listing/details`,
			type: "POST",
			data: {
				customId,
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

	getDraftListings() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/listings/draft`,
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
	getInactiveListings() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/listings/inactive`,
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
	getActiveListings() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/listings/active`,
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
	getExpiredListings() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/listings/expired`,
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
	removeListing(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listings/remove`,
			type: "POST",
			data: {
				customId,
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
	duplicateListing(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listings/duplicate`,
			type: "POST",
			data: {
				customId,
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
	deactivateListing(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listings/deactivate`,
			type: "POST",
			data: {
				customId,
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
	archiveListing(customId) {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listings/archive`,
			type: "POST",
			data: {
				customId,
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

	getClosedDeals() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/bid/closed`,
			type: "POST",
			data: {},
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
	getAllDeals() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/bid/all`,
			type: "POST",
			data: {},
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
	getPendingDeals() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/bid/pending`,
			type: "POST",
			data: {},
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
	getRejectedDeals() {
		const deferred = jQuery.Deferred();

		$.ajax({
			url: `${envhosturl}api/bid/rejected`,
			type: "POST",
			data: {},
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
	getWatchlistListings() {
		const deferred = jQuery.Deferred();
		const _this = this;

		$.ajax({
			url: `${envhosturl}api/listings/watchlist`,
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

};
