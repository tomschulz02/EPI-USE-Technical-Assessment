import React from 'react';

export default function SearchBar({ value, onChange }) {
	return (
		<input type="text" placeholder="Search employees..." value={value} onChange={(e) => onChange(e.target.value)} />
	);
}
