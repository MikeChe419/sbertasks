import { useContext } from "react";
import CardList from "../../components/CardList/card-list"
import { ContentHeader } from "../../components/ContentHeader/content-header";
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext";


export const FavoritePage = () => {
    const { favorites } = useContext(CardContext);
    return (
        <>
            <ContentHeader title="Избранное"/>
            <Sort />
            <div className='content__cards'>
                <CardList cards={favorites}/>
            </div>
        </>
    )
}