import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import "./index.css";

const SeachInfo = ({ searchText }) => {
	const { total } = useContext(CardContext);
	const searchCount = total;

	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} товаров
		</section>
	);
};

export default SeachInfo;
