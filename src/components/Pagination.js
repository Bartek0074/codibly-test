import React from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import '../styles/Pagination.scss';

export default function Pagination({ page, setPage, totalPages }) {
	return (
		<div className='pagination'>
			<button
				className={
					page > 1
						? 'pagination__button pagination__button--active'
						: 'pagination__button'
				}
				onClick={() => {
					if (page !== 1) {
						setPage(parseInt(page) - 1);
					}
				}}
			>
				<IoIosArrowBack className='icon' />
			</button>
			<p className='pagination__page'>
				{page}/{totalPages}
			</p>
			<button
				className={
					page < totalPages
						? 'pagination__button pagination__button--active'
						: 'pagination__button'
				}
				onClick={() => {
					if (page < totalPages) {
						setPage(parseInt(page) + 1);
					}
				}}
			>
				<IoIosArrowForward className='icon' />
			</button>
		</div>
	);
}
