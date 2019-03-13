import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Loader from "../../common/components/Loader/Loader";
import api from "../../api";
import { DefaultBox } from "../../common/components/Containers";
import PropertyList from "./PropertyList";
import Property from "./Property";
import { CMS_PROPERTY_TABS, ROUTE_PATHS } from "../../common/constants";
import { cmsFile } from "../../main/components/Icons";

const CreatePropertyButton = ({ history }, context) => (
	<button
		className="cms-button"
		onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY)}
	>
		{context.t("CMS_CREATE_PROPERTY_BUTTON")}
	</button>
);

class Properties extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingProperties: false,
			propertiesLoaded: false,
			properties: [],
		};
	}

	componentDidMount() {
		this.fetchAllProperties();
	}

	fetchAllProperties = () => {
		this.setState({ loadingProperties: true });
		api.properties.fetchProperties()
			.then(({ data }) => {
				this.setState({ properties: data.properties });
			})
			.catch(() => {
				console.log("fetch properties error");
			})
			.finally(() => {
				this.setState({ loadingProperties: false, propertiesLoaded: true });
			});
	};

	render() {
		const { history } = this.props;
		const {
			loadingProperties,
			propertiesLoaded,
			properties,
		} = this.state;

		return (
			<div className="default-container no-title property">
				<DefaultBox>
					{
						propertiesLoaded
						&& properties.length > 0
						&& (
							<div className="property-list-header">
								<CreatePropertyButton history={history} />
							</div>
						)
					}
					{
						loadingProperties
						&& <Loader loading />
					}
					{
						propertiesLoaded
						&& properties.length > 0
						&& <PropertyList properties={properties} history={history} />
					}
					{
						propertiesLoaded
						&& properties.length === 0
						&& (
							<div className="property-empty-list">
								<img src={cmsFile} alt="" />
								<span className="title">
									{this.context.t("CMS_PROPERTIES_EMPTY_LIST_1")}
								</span>
								<span className="subtitle">
									{this.context.t("CMS_PROPERTIES_EMPTY_LIST_2")}
								</span>
								<CreatePropertyButton history={history} />
							</div>
						)
					}
				</DefaultBox>
			</div>
		);
	}
}

Properties.contextTypes = {
	t: PropTypes.func.isRequired,
};

CreatePropertyButton.contextTypes = {
	t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(Properties);
