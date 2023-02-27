import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext";
import { SortContext } from "../../context/sortContext";

const tabs = [
	{
		id: "cheap",
		title: "Сначала дешёвые",
	},
	{
		id: "low",
		title: "Сначала дорогие",
	},
	{
		id: "sale",
		title: "По скидке",
	}
];

export const CatalogPage = () => {
	const { cards } = useContext(CardContext);
	const { selectedTabId, setSelectedTabId } = useContext(SortContext);
	return (
		<>
			<Sort tabs={tabs}
				currentSort={selectedTabId}
				onChangeSort={(tabid) => { setSelectedTabId(tabid) }} />
			<div className='content__cards'>
				<CardList cards={cards} />
			</div>
		</>
	)
}