import React from "react";
import DatePicker from "@components/DatePicker";
import { DATE_FORMAT } from "@constants";

const RightItem = ({ selected, onClick }) => (
	<div onClick={onClick} className="column right-item-selection">
		{selected && <i className="fa fa-check-circle-o" />}
	</div>
);

export const BigInputRightItem = ({ value, label, placeholder }) => (
	<div className="textarea-input">
		<label>{label}</label>
		<textarea defaultValue={value} placeholder={placeholder} />
	</div>
);

class Right extends React.Component {
	constructor(props) {
		super(props);

		const activePackages = new Map(props.data.packages.map(i => [i.id, i]));
		const selection = new Map(props.data.items.map(i => [i.id, new Map()]));
		const availablePackages = new Map(props.availablePackages.map(i => [i.id, i]));

		this.state = {
			rightPackages: props.rightPackages || [],
			activePackages,
			selection,
			all: false,
			availablePackages,
		};
	}

	componentWillReceiveProps(props) {
		// console.log("Right - props", props);
		this.setState({
			rightPackages: props.rightPackages,
		});
	}

	toggleAll = (rightItem) => {
		const { selection } = this.state;

		if (selection.get(rightItem)
			.has(0)) {
			selection.get(rightItem)
				.clear();
		} else {
			this.state.activePackages.forEach((rightPackage) => {
				selection.get(rightItem)
					.set(rightPackage.id, true);
			});

			selection.get(rightItem)
				.set(0, true);
		}

		this.setState({ selection });
	};

	select = (rightItem, rightPackage) => {
		const { selection } = this.state;

		if (!this.state.activePackages.has(rightPackage)) return false;

		if (!this.props.data.multiple) {
			selection.forEach((item, key) => {
				if (key !== rightItem) item.clear();
			});
		}
		selection.get(rightItem)
			.set(rightPackage, true);
		this.setState({ selection });
	};

	unselect = (rightItem, rightPackage) => {
		const { selection } = this.state;
		selection.get(rightItem)
			.delete(rightPackage);
		selection.get(rightItem)
			.delete(0);
		this.setState({ selection });
	};

	toggle = (rightItem, rightPackage) => {
		const { selection } = this.state;
		if (selection.get(rightItem)
			.has(rightPackage)) {
			this.unselect(rightItem, rightPackage);
		} else {
			this.select(rightItem, rightPackage);
		}
	};

	isSelected = (rightItem, rightPackage) => {
		const { selection } = this.state;
		return selection.get(rightItem)
			.has(rightPackage);
	};

	getProgramsName = () => this.props.programs.filter(program => (program.saved))
		.map(program => (program.name));

	showProgramColumns = rightPackage => (rightPackage.shortLabel !== "PR" || (rightPackage.shortLabel === "PR" && this.getProgramsName().length === 0));

	packageIsActive = id => this.state.activePackages.has(id) && this.state.availablePackages.has(id);

	setDate = (date, rightItem, rightPackage) => {
		const { selection } = this.state;

		if (!this.state.activePackages.has(rightPackage)) return false;

		selection.get(rightItem)
			.set(rightPackage, date);
		this.setState({ selection });
	};

	render() {
		if (this.props.data.textarea) {
			return (<BigInputRightItem placeholder="" value="" label={this.props.data.name} />);
		}

		return (
			<div>
				<div className="table-right">
					<div className="row">
						<div className="column right-name">{this.props.data.name}</div>
						{
							<div
								className={(this.props.data.all_enabled)
									? "column right-package" : "column right-package disabled"}
							>All
							</div>
						}
						{
							this.props.rightPackages && Array.from(this.props.rightPackages.values())
								.map(rightPackage => this.showProgramColumns(rightPackage) && (
									<div
										className={(this.packageIsActive(rightPackage.id)) ? "column right-package" : "column right-package disabled"}
									>
										{rightPackage.shortLabel}
									</div>
								))
						}

						{
							this.getProgramsName()
								.map(program => (
									<div className="column right-package">
										{program}
									</div>
								))
						}

					</div>
					{
						this.props.data.items && this.props.data.items.map((rightItem, i, list) => (
							<div className={(i < list.length - 1) ? "row bordered-row" : "row"}>
								<div className=" column right-item-content">{rightItem.form_content}</div>
								<div
									className="column right-item-selection"
									onClick={() => {
										this.props.data.all_enabled && this.toggleAll(rightItem.id);
									}}
								>
									{this.isSelected(rightItem.id, 0) && <i className="fa fa-check-circle-o" />}
								</div>
								{
									this.props.rightPackages
									&& Array.from(this.props.rightPackages.values())
										.map((rightPackage) => {
											if (!this.packageIsActive(rightPackage.id)) {
												return (
													<div
														className="column right-item-selection"
													/>
												);
											}

											if (this.showProgramColumns(rightPackage) && rightItem.calendar) {
												return (
													<div className="column right-item-selection">
														<DatePicker
															className="date-picker"
															dateFormat={DATE_FORMAT}
															selected={this.state.selection.get(rightItem.id)
																.get(rightPackage.id)}
															onChange={date => this.setDate(date, rightItem.id, rightPackage.id)}
															placeholderText={DATE_FORMAT.toLowerCase()}
														/>
													</div>
												);
											}


											return this.showProgramColumns(rightPackage)
												&& (
													<RightItem
														selected={this.isSelected(rightItem.id, rightPackage.id)}
														onClick={() => {
															this.toggle(rightItem.id, rightPackage.id);
														}}
													/>
												);
										})
								}

								{
									this.getProgramsName()
										.map(() => (
											<div className="column right-item-selection" />
										))
								}

							</div>
						))
					}

				</div>
			</div>
		);
	}
}

export default Right;
