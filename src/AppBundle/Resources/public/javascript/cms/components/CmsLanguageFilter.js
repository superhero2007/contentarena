import React, { useState } from "react";
import Loader from "../../common/components/Loader";

const CmsLanguageFilter = ({ languages, items, onUpdate }) => {
	// const [items, setItems] = useState(value || []);
	const handleRemove = (selected) => {
		const updatedValue = items.filter(element => element.id !== selected.id);
		// setItems(updatedValue);
		onUpdate(updatedValue);
	};

	const handleSearch = (e) => {
		const { value } = e.target;
		const selected = languages.find(element => element.value.includes(value));
		const updatedValue = items.slice(0);
		updatedValue.push(selected);
		// setItems(updatedValue);
		onUpdate(updatedValue);
	};

	const handleClear = () => {
		onUpdate([]);
	};

	return (
		<div className="language-filter">
			<div className="language-filter-input">
				<input
					type="text"
					placeholder="Select language..."
					onChange={handleSearch}
				/>
				<i className="language-filter-input fa fa-sort" />
			</div>
			{
				items.length && (
					<div className="language-filter-content">
						{items.map((item, index) => (
							<div className="language-filter-item" key={index}>
								<div className="language-filter-item-text">
									{item.value}
								</div>
								<i
									className="icon-remove"
									onClick={() => handleRemove(item)}
								/>
							</div>
						))}
					</div>
				)
			}
			<div className="language-filter-clear">
				<div
					onClick={handleClear}
					className="secondary-link"
				>
					<span className="restore-text">
						Clear All
					</span>
				</div>
			</div>
		</div>
	);
};

export default CmsLanguageFilter;
