import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './pages/Page';
import Modal from './components/Modal';

function App() {
	const [activeModal, setActiveModal] = useState(false);
	const [modalData, setModalData] = useState();
	return (
		<BrowserRouter>
			<Modal activeModal={activeModal} setActiveModal={setActiveModal} modalData={modalData} />
			<Routes>
				<Route
					path='/'
					element={<Page setActiveModal={setActiveModal} setModalData={setModalData} />}
				></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
