import axios from 'axios';

const BASE_URL = 'https://reqres.in/api/products';

const options = {};

export const fetchData = async (page) => {
	const { data } = await axios.get(`${BASE_URL}/?${page}`, options);
	return data;
};
