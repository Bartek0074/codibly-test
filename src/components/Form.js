import React, { useState } from 'react';

import { BsSearch } from 'react-icons/bs';

import '../styles/Form.scss';

export default function Form({ setId, setPage }) {
	const [input, setInput] = useState('');

	const inputHandle = (e) => {
		setInput(e.target.value.replace(/\D/g, ''));
	};

	const submitHandle = (e) => {
		e.preventDefault();
		if (input) {
			setId(input);
			setPage();
			setInput('');
		}
	};

	return (
		<form className='form'>
			<input
				className='form__input'
				onChange={inputHandle}
				value={input}
				type='text'
				placeholder='Search ID'
			></input>
			<button className='form__button' onClick={submitHandle} type='submit'>
				<BsSearch className='icon' />
			</button>
		</form>
	);
}
