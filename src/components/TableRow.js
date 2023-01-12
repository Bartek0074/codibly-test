import React, { useState } from 'react';

export default function TableRow({ setActiveModal, setModalData, el }) {
	const [alpha, setAlpha] = useState('44');
	let color = el.color + alpha;

	return (
		<tr
			onMouseEnter={() => {
				setAlpha('ff');
			}}
			onMouseLeave={() => {
				setAlpha('44');
			}}
			onClick={() => {
				setActiveModal(true);
				setModalData(el);
			}}
			style={{ backgroundColor: `${color}` }}
			key={el.id}
		>
			<td>{el.id}</td>
			<td>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</td>
			<td>{el.year}</td>
		</tr>
	);
}
