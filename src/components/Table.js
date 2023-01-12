import React from 'react';

import TableRow from './TableRow';

import '../styles/Table.scss';

export default function Table({
	setActiveModal,
	setModalData,
	data,
	id,
	page,
	perPage,
}) {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Year</th>
				</tr>
			</thead>
			<tbody>
				{data &&
					data.map((el) => {
						if (
							(page &&
								el.id > perPage * (page - 1) &&
								el.id <= perPage * page) ||
							(id && id == el.id)
						)
							return (
								<TableRow
									key={el.id}
									setActiveModal={setActiveModal}
									setModalData={setModalData}
									el={el}
								/>
							);
						else return null;
					})}
			</tbody>
		</table>
	);
}
