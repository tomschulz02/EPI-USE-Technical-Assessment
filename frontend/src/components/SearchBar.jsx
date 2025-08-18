import React from 'react';

export default function SearchBar({ value, onChange, classname }) {
	return (
		<input
			className={classname}
			name="searchbar"
			type="text"
			placeholder="Search employees..."
			value={value}
			onChange={(e) => onChange(e.target.value)}
		/>
	);
}
