import React from "react";
import Modal from "react-modal";
import { PropTypes } from "prop-types";
import Translate from "@components/Translator/Translate";
import { customStyles } from "../styles/custom";

class PopupSeasonSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			value: props.value,
		};
	}


	openModal = () => {
		this.setState({ value: this.props.value, isOpen: true });
	};

	closeModal = () => {
		const {
			onSelect,
		} = this.props;
		const {
			value,
		} = this.state;
		onSelect(value);
		this.setState({
			isOpen: false,
			value: [],
		});
	};

	cancelModal = () => {
		this.setState({ isOpen: false });
	};

	handleChangedValue = (season) => {
		let { value } = this.state;
		if (value.find(element => element.value === season.id)) {
			value = value.filter(element => element.value !== season.id);
		} else {
			value.push({ value: season.id, label: season.name });
		}
		this.setState({ value });
	};

	renderModal = () => {
		const {
			value,
		} = this.state;

		const {
			allSeasons,
		} = this.props;

		return (
			<Modal
				isOpen={this.state.isOpen}
				bodyOpenClassName="selector"
				style={customStyles}
				onRequestClose={this.cancelModal}
			>

				<div className="modal-title">
					<Translate i18nKey="Season Selector" />
					<div className="close" onClick={this.cancelModal}>X</div>
				</div>

				<div className="step-content">
					<div className="region-filter">
						<div className="regions">
							{allSeasons.map(season => (
								<button
									key={season.id}
									onClick={() => this.handleChangedValue(season)}
									className={`region ${value.find(element => element.value === season.id) ? "region-selected" : ""}`}
								>
									{season.name}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="buttons">
					<button
						disabled={!value || value.length === 0}
						className="standard-button"
						onClick={this.closeModal}
					>
						Ok
					</button>

				</div>

			</Modal>
		);
	};


	render() {
		return (
			<div className="popup-country-selector">
				{this.renderModal()}
				<div className="filter-btn">
					<i className="fa fa-sliders" aria-hidden="true" onClick={this.openModal} />
				</div>
			</div>
		);
	}
}

PopupSeasonSelector.contextTypes = {
	t: PropTypes.func.isRequired,
};

export default PopupSeasonSelector;
