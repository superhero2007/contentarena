import React from "react";

import Translate from "@components/Translator/Translate";
import { cmsWorldActive } from "../../main/components/Icons";

const watchlistIcon = `${assetsBaseDir}app/images/watchlist.png`;
const bucketicon = `${assetsBaseDir}app/images/bucket.png`;

const CmsEditedProgramList = ({
	programs, onSelect, onDelete,
}) => (
	<div>
		{programs.map((program, index) => (
			<div className="element" key={index}>
				<h3>{program.name}</h3>
				<h6>{program.description}</h6>
				<div className="d-flex">
					<button className="ca-btn link-button">
						<img src={cmsWorldActive} alt="" />
						{program.territories.length} Territories
					</button>
					<button
						className="ca-btn link-button"
						onClick={() => {
							if (onSelect) {
								onSelect(program);
							}
						}}
					>
						<img src={watchlistIcon} alt="" />
						View details
					</button>
					<button
						className="ca-btn text-danger"
						onClick={() => {
							if (onDelete) {
								onDelete(program);
							}
						}}
					>
						<img src={bucketicon} alt="" />
						Remove
					</button>
					<Translate i18nKey="CMS_EMPTY_EDIT_RIGHTS_BUTTON" />
				</div>
			</div>
		))}
	</div>
);

export default CmsEditedProgramList;
