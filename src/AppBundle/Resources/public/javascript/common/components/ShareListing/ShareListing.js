import React, { Component } from "react";
import PropTypes from "prop-types";
import TagsInput from "react-tagsinput";
import Modal from "../Modal";
import api from "../../../api";
import Loader from "../Loader";

class ShareListing extends Component {
	state = {
		success: false,
		error: false,
		loading: false,
		modalOpen: false,
		emails: [],
		comment: "",
	};

	handleEmailChange = (emails) => {
		this.setState({ emails });
	};

	handleCommentChange = (e) => {
		this.setState({ comment: e.target.value });
	};

	handleSubmit = (e) => {
		const { comment, emails } = this.state;
		const { listingId } = this.props;
		this.setState({
			loading: true,
			success: false,
			error: false,
		});

		api.share.shareListing({
			listingId,
			recipients: emails,
			message: comment,
		}).then(() => {
			this.setState({
				loading: false,
				emails: [],
				comment: "",
				success: true,
				error: false,
			});
			setTimeout(() => {
				this.setState({
					modalOpen: false,
					success: false,
				});
			}, 3000);
		}).catch(() => {
			this.setState({
				loading: false,
				success: false,
				error: true,
			});
		});
		e.preventDefault();
	};

	render() {
		const {
			success, error, loading, comment,
		} = this.state;
		return (
			<div className="ca-share-listing">
				<span onClick={(e) => {
					this.setState({ modalOpen: true });
					e.preventDefault();
					e.stopPropagation();
				}}
				>
					<span className="fa fa-share-alt" />
					{this.context.t("SHARE")}
				</span>
				<Modal
					isOpen={this.state.modalOpen}
					onRequestClose={() => this.setState({ modalOpen: false })}
					title={this.context.t("SHARE_WITH_OTHER_USERS")}
					titleIcon={<i className="fa fa-share-alt" />}
				>
					<form onSubmit={this.handleSubmit}>
						<section style={{ marginBottom: "45px" }}>
							<label htmlFor="email">
								<p>
									<b>
										{this.context.t("SHARE_EMAIL_ADDRESS")}
										{" "}
										<span className="text-danger">*</span>
									</b>
								</p>
							</label>
							<TagsInput
								inputProps={{ placeholder: "mail@mail.com", name: "email" }}
								value={this.state.emails}
								onChange={this.handleEmailChange}
								className="ca-tags-input ca-form-control"
								validationRegex={/\S+@\S+\.\S+/}
								onlyUnique
								addOnBlur
							/>
						</section>
						<section style={{ marginBottom: "25px" }}>
							<label htmlFor="comment">
								<p>
									<b>
										{this.context.t("SHARE_COMMENT")}
									</b>
								</p>
							</label>
							<textarea
								cols="30"
								rows="10"
								name="comment"
								placeholder={this.context.t("SHARE_ADD_COMMENT")}
								className="ca-form-control"
								onChange={this.handleCommentChange}
								value={comment}
							/>
						</section>

						{success && (
							<p className="text-center text-success">
								<i className="fa fa-check" />
								{" "}
								{this.context.t("SHARE_SUCCESS")}
							</p>
						)}
						{error && (
							<p className="text-center text-danger">
								<i className="fa fa-exclamation-triangle" />
								{" "}
								{this.context.t("SHARE_FAILED")}
							</p>
						)}

						{loading ? (
							<Loader loading={loading} small />
						) : (
							<section className="d-flex align-items-center justify-content-center">
								<div style={{ marginRight: "20px", cursor: "pointer" }}>
									<b
										className="text-uppercase"
										onClick={() => this.setState({ modalOpen: false })}
									>
										{this.context.t("SHARE_CANCEL")}
									</b>
								</div>
								<button
									type="submit"
									className="ca-btn primary large"
									disabled={this.state.emails.length === 0}
								>
									<b className="text-uppercase">
										{this.context.t("SHARE")}
									</b>
								</button>
							</section>
						)}
					</form>
				</Modal>
			</div>
		);
	}
}

ShareListing.contextTypes = {
	t: PropTypes.func.isRequired,
};

ShareListing.propTypes = {
	listingId: PropTypes.any.isRequired,
};
ShareListing.defaultProps = {};

export default ShareListing;
