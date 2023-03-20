import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { SortContext } from '../../context/sortContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import './index.css';
import Skeleton from '@mui/material/Skeleton';
import TablePagination from '@mui/material/TablePagination';


const CardList = ({ cards }) => {
	const navigate = useNavigate();
	const { isLoading } = useContext(UserContext)
	const { selectedTabId } = useContext(SortContext);

	const {
		page,
		setPage,
		rowsPerPage,
		setRowsPerPage,
		total
	} = useContext(CardContext);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			{!cards.length && !isLoading && <NotFound buttonText='Назад' title="Простите по вашему запросу ничего не найдено" buttonAction={() => navigate(-1)} />}
			<div className='cards'>
				{
					isLoading
						? (
							<>
								{[...Array(4).keys()].map(index =>
									<Skeleton key={index.toString()} variant="rectangular" width={244} height={340} />
								)}
							</>
						)
						: cards
							? cards
								.sort((a, b) => {
									switch (selectedTabId) {
										case "cheap":
											return (a.price - a.discount) - (b.price - b.discount)
										case "low":
											return (b.price - b.discount) - (a.price - a.discount)
										case "sale":
											return b.discount - a.discount
									}
								})
								.map((item, index) => <Card key={item._id} {...item} />)
							: null // NotFound
				}
			</div>


			<TablePagination
				component="div"
				count={total}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</>

	);
};

export default CardList;
