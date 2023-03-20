import {SignupButton} from "./signupButton/SignupButton"
import {SigninButton} from "./signinButton/SigninButton"
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import { Button } from "@mui/material";
import './main-page.css';

export function MainPage() {

    const navigate = useNavigate();

    return (
        <div>
            <div>Dog Food - лучший магазин!</div>
            <div>
                <SignupButton/>
                <SigninButton/>

                {/* <NavLink to="/login/favorites">Избранное</NavLink>
                <NavLink to="/login/faq">FAQ</NavLink> */}

                <Button onClick={() => navigate("/login/favorites")}>
                    Избранное
                </Button>
                <Button onClick={() => navigate("/login/faq")}>
                    FAQ
                </Button>
            </div>

            <Routes>
                <Route path='favorites' element={
                    <FavoritePage />
                }
                />
                <Route path="faq" element={<FaqPage />} />
            </Routes>
        </div>
    )
}