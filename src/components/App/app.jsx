import { useState, useEffect, useCallback } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
//import useDebounce from '../../hooks/useDebounce';
import { isLiked } from '../../utils/product';
import { IndexPage } from '../../pages/IndexPage/index-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { SortContext } from '../../context/sortContext';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { MainPage } from '../../pages/MainPage/main-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import { useDebounce } from 'react-use';
// import { useAppState } from '../../hooks/useAppState';

function App() {

  // const [token, setToken] = useLocalStorage('token', null, { raw: true });
  const [token, setToken] = useState(null);

  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  useDebounce(setSearchQuery, 300, []);

  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("cheap");
  //const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(10)


  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery, page, rowsPerPage)
      .then((searchResult) => {
        setCards(searchResult.products)
        setTotal(searchResult.total)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  useEffect(() => {
    const tokenLS = localStorage.getItem('token')
    api.setToken(tokenLS)
    setToken(tokenLS)
  }, [])

  console.log('Token state:' + token)

  useEffect(() => {
    if (token && searchQuery) {
      handleRequest()
    }
  }, [searchQuery, token, page, rowsPerPage])

  const handleFormSubmit = useCallback((inputText) => {
    navigate('/');
    setSearchQuery(inputText);
    handleRequest();
  }, [navigate, setSearchQuery, handleRequest])

  const handleInputChange = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, [setSearchQuery])

  const handleUpdateUser = (userUpdateData) => {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])

  console.log('App rerender')

  return (
    <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
      <UserContext.Provider value={{
        user: currentUser,
        setCurrentUser,
        isLoading,
        token,
        setToken
      }}>
        <CardContext.Provider value={{
          isLoading,
          setIsLoading,
          cards,
          setCards,
          favorites,
          handleLike: handleProductLike,
          setFavorites,
          searchQuery,
          setSearchQuery,
          page,
          setPage,
          rowsPerPage,
          setRowsPerPage,
          total,
          setTotal
        }}>
          <Header>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Routes>
                <Route path='/' element={
                  <Search
                    onSubmit={handleFormSubmit}
                    onInput={handleInputChange}
                  />
                } />
              </Routes>
            </>
          </Header>
          <main className='content container'>
            <SeachInfo searchText={searchQuery} />

            <Routes>
              <Route index element={
                <IndexPage />
              } />
              <Route path='/product/:productId' element={
                <ProductPage
                  token={token}
                />
              } />
              <Route path='/signup' element={<MainPage />} />
              <Route path='/faq' element={<FaqPage />} />
              <Route path='/login/*' element={<MainPage />} />
              <Route path='/favorites' element={
                <FavoritePage />}
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>

          </main>
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </SortContext.Provider>
  )
}

export default App;
