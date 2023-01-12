import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Form from '../components/Form';
import ShowAllBtn from '../components/ShowAllBtn';
import Table from '../components/Table';
import Pagination from '../components/Pagination';

import '../styles/Page.scss';

export default function Page({ setActiveModal, setModalData }) {
	const [error, setError] = useState();

	const [searchParams, setSearchParams] = useSearchParams();
	const [id, setId] = useState(searchParams.get('id'));
	const [page, setPage] = useState(searchParams.get('page'));

	const [data, setData] = useState();
	const [idArr, setIdArr] = useState();

	const perPage = 5;

	useEffect(() => {
		if (!id && !page) {
			setSearchParams({ page: 1 });
			setPage(1);
		} else if (!id) {
			setSearchParams({ page: page });
		}
	}, [page]);

	useEffect(() => {
		if (id) {
			setSearchParams({ id: id });
		}
	}, [id]);

	useEffect(() => {
		axios
			.get('https://reqres.in/api/products?per_page=100')
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					setData(response?.data?.data);
				} else if (response.status >= 300 && response.status < 500) {
					setError(response.status);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		let newArr = [];
		data?.forEach((el) => newArr.push(el.id));
		setIdArr(newArr);
	}, [data]);

	return (
		<div className='app'>
			{!error ? (
				<>
					<Form setId={setId} setPage={setPage} />
					{idArr?.includes(parseInt(id)) && (
						<ShowAllBtn setId={setId} setPage={setPage} />
					)}
					{(page > 0 && page < Math.ceil(data?.length / perPage) + 1) ||
					idArr?.includes(parseInt(id)) ? (
						<>
							<Table
								data={data}
								id={id}
								setActiveModal={setActiveModal}
								setModalData={setModalData}
								page={page}
								perPage={perPage}
							/>
							{page && (
								<Pagination
									data={data}
									page={page}
									setPage={setPage}
									perPage={perPage}
								/>
							)}
						</>
					) : (
						<>
							<ShowAllBtn setId={setId} setPage={setPage} />
							<p className='info'>No data for this page/id</p>
						</>
					)}
				</>
			) : (
				<p className='info'>Error {error}! Try again later.</p>
			)}
		</div>
	);
}
