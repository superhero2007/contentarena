import React, { useState } from "react";

import Translate from "@components/Translator/Translate";
import ConfirmationTooltip from "../../common/components/Tooltips/ConfirmationTooltip";

const CmsEditedProgramList = ({
	programs, onSelect, onDelete,
}) => {
	const [showConfirmationTooltip, setShowConfirmationTooltip] = useState(false);
	return (
		<div className="program-list">
			{programs.map((program, index) => (
				<div className="program-list-item" key={index}>
					<h4>{program.name}</h4>
					<div className="d-flex">
						<button
							className="link-button "
							onClick={() => onSelect && onSelect(program)}
						>
							<Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_VIEW_BUTTON" />
						</button>
						<div className="action">
							<button
								className="link-button"
								onClick={() => setShowConfirmationTooltip(program.id)}
							>
								<Translate i18nKey="CMS_EMPTY_EDIT_PROGRAM_REMOVE_BUTTON" />
							</button>
							<ConfirmationTooltip
								isOpen={showConfirmationTooltip === program.id}
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
