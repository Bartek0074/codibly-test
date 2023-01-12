import React from 'react';

import '../styles/ShowAllBtn.scss';

export default function ShowAllBtn({ setId, setPage }) {
	return (
		<button
			className='showAllBtn'
			onClick={() => {
				setId();
				setPage(1);
			}}
		>
			Show All
		</button>
	);
}
