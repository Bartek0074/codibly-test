import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';

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
	const [totalPages, setTotalPages] = useState();

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
		fetchData(`page=${page}&per_page=5`)
			.then((response) => {
				setData(response?.data);
				setTotalPages(response.total_pages);
			})
			.catch((err) => {
				if (err?.response?.status >= 400) setError(err?.response?.status);
			});
	}, [page]);

	useEffect(() => {
		if (id) {
			fetchData(`id=${id}&per_page=100`)
				.then((response) => {
					let newData = [];
					newData.push(response?.data);
					setData(newData);
					setTotalPages(response.total_pages);
				})
				.catch((err) => {
					if (err?.response?.status >= 400) setError(err?.response?.status);
				});
		}
	}, [id]);

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
					{(page > 0 && page < totalPages + 1) ||
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
									page={page}
									setPage={setPage}
									totalPages={totalPages}
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
				<p className='info'>Error {error}!</p>
			)}
		</div>
	);
}
