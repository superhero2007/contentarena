import React from "react";
import cn from "classnames";
import { connect } from "react-redux";
import Translate from "@components/Translator/Translate";
import Loader from "../../common/components/Loader/Loader";
import api from "../../api";
import { DefaultBox } from "../../common/components/Containers";
import PropertyList from "./PropertyList";
import { ROUTE_PATHS } from "../../common/constants";
import { cmsFile } from "../../main/components/Icons";

const CreatePropertyButton = ({ history }) => (
	<button
		className="button"
		onClick={() => history.push(ROUTE_PATHS.CREATE_PROPERTY)}
	>
		<Translate i18nKey="CMS_CREATE_PROPERTY_BUTTON" />
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
		const { history, skin } = this.props;
		const {
			loadingProperties,
			propertiesLoaded,
			properties,
		} = this.state;

		return (
			<div className={cn({ skin }, skin, "container")}>
				<DefaultBox>
					{propertiesLoaded && (
						<div className="default-box-header">
							<div className="dashboard-header">
								<i className="fa fa-home" />
								<Translate i18nKey="CMS_PROPERTIES_DASHBOARD" />
							</div>
							<CreatePropertyButton history={history} />
						</div>
					)}

					{propertiesLoaded && (
						<div className="default-tab">
							<a
								key="tab-properties"
								className="tab active"
								onClick={() => {
									history.push(`${ROUTE_PATHS.PROPERTIES}`);
								}}
							>
								<Translate i18nKey="CMS_TAB_MY_PROPERTIES" />
							</a>
							<a
								key="tab-commercial"
								className="tab"
								onClick={() => {
								}}
							>
								<Translate i18nKey="CMS_TAB_COMMERCIAL" />
							</a>
							<a
								key="tab-manage"
								className="tab"
								onClick={() => {
								}}
							>
								<Translate i18nKey="CMS_TAB_LISTING" />
							</a>
						</div>
					)}

					{loadingProperties && <Loader loading />}

					{propertiesLoaded && properties.length > 0 && (
						<PropertyList properties={properties} history={history} />
					)}

					{propertiesLoaded && properties.length === 0 && (
						<div className="property-empty-list">
							<img src={cmsFile} alt="" />
							<span className="title">
								<Translate i18nKey="CMS_PROPERTIES_EMPTY_LIST_1" />
							</span>
							<span className="subtitle">
								<Translate i18nKey="CMS_PROPERTIES_EMPTY_LIST_2" />
							</span>
							<CreatePropertyButton history={history} />
						</div>
					)}
				</DefaultBox>
			</div>
		);
	}
}

const mapStateToProps = state => state;

export default connect(
	mapStateToProps,
	null,
)(Properties);
