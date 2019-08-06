import React, { useState } from "react";

import Translate from "@components/Translator/Translate";
import { cmsWorldActive } from "../../main/components/Icons";
import ConfirmationTooltip from "../../common/components/Tooltips/ConfirmationTooltip";

const watchlistIcon = `${assetsBaseDir}app/images/watchlist.png`;
const bucketicon = `${assetsBaseDir}app/images/bucket.png`;

const CmsEditedProgramList = ({
	programs, onSelect, onDelete,
}) => {
	const [showConfirmationTooltip, setShowConfirmationTooltip] = useState(false);
	return (
		<div>
			{programs.map((program, index) => (
				<div className="element" key={index}>
					<h3>{program.name}</h3>
					<h6>{program.description}</h6>
					<div className="d-flex">
						<button className="ca-btn link-button action">
							<img src={cmsWorldActive} alt="" />
							{program.territories.length}&nbsp;
							<Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_TERRITORIES_BUTTON" />
						</button>
						<button
							className="ca-btn link-button action"
							onClick={() => {
								if (onSelect) {
									onSelect(program);
								}
							}}
						>
							<img src={watchlistIcon} alt="" />
							<Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_VIEW_BUTTON" />
						</button>
						<div className="action">
							<button
								className="ca-btn text-danger"
								onClick={() => {
									setShowConfirmationTooltip(true);
								}}
							>
								<img src={bucketicon} alt="" />
								<Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_REMOVE_BUTTON" />
							</button>
							<ConfirmationTooltip
								isOpen={showConfirmationTooltip}
								onConfirm={(confirmed) => {
									setShowConfirmationTooltip(false);
									if (confirmed && onDelete) {
										onDelete(program);
									}
								}}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CmsEditedProgramList;
