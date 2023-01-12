import React, { useState } from 'react';

import '../styles/Modal.scss';

export default function Modal({ activeModal, setActiveModal, modalData }) {
	const [alpha, setAlpha] = useState('44');
	let color = modalData?.color + alpha;

	return (
		<div
			className={
				activeModal === true
					? 'modal-background modal-background--active'
					: 'modal-background'
			}
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					setActiveModal(false);
				}
			}}
		>
			<div className='modal'>
				<div className='modal__data'>
					<div className='modal__data-el'>
						<p className='modal-data-label'>ID:</p>
						<p className='modal-data-value'>{modalData?.id}</p>
					</div>
					<div className='modal__data-el'>
						<p className='modal-data-label'>Year:</p>
						<p className='modal-data-value'>{modalData?.year}</p>
					</div>
					<div className='modal__data-el'>
						<p className='modal-data-label'>Name:</p>
						<p className='modal-data-value'>{modalData?.name}</p>
					</div>
					<div className='modal__data-el'>
						<p className='modal-data-label'>HEX:</p>
						<p className='modal-data-value'>{modalData?.color}</p>
					</div>
					<div className='modal__data-el'>
						<p className='modal-data-label'>Pantone code:</p>
						<p className='modal-data-value'>{modalData?.pantone_value}</p>
					</div>
				</div>
				<button
					onMouseEnter={() => {
						setAlpha('ff');
					}}
					onMouseLeave={() => {
						setAlpha('44');
					}}
					onClick={() => {
						setActiveModal(false);
					}}
					className='modal__close-btn'
					style={{ backgroundColor: `${color}` }}
				>
					Close
				</button>
				<div
					className='modal__ribbon'
					style={{ backgroundColor: `${modalData?.color}` }}
				></div>
			</div>
		</div>
	);
}
