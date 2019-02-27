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

		api.postShareListing({
			listingId,
			recipients: emails,
			message: comment,
		}).then((res) => {
			this.setState({
				loading: false,
				success: true,
				error: false,
			});
		}).catch((error) => {
			this.setState({
				loading: false,
				success: false,
				error: true,
			});
		});
		e.preventDefault();
	};

	render() {
		const { success, error, loading } = this.state;
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
							/>
						</section>

						{success && (
							<div className="text-center text-success">
								<p>
									<i className="fa fa-check fa-3x" />
								</p>
							</div>
						)}
						{error && (
							<div className="text-center text-danger">
								<p>
									<i className="fa fa-exclamation-triangle fa-3x" />
								</p>
							</div>
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
