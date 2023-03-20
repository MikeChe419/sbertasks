import { useCallback, useEffect, useState } from "react"
import Modal from "../../../components/modal/Modal"
import LoginForm from "./loginForm/LoginForm"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@mui/material"

export function SigninButton() {

    const [active, setActive] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.pathname == '/login') {
            setActive(true)
        }
    }, [location, setActive])

    const close = useCallback(
        () => setActive(false),
        [setActive]
    )

    const open = useCallback(
        () => {
            navigate('/login')
            setActive(true)
        },
        [setActive]
    )


    const [userName, setUserName] = useState(null)

    const redirect = useCallback(() => {
        navigate('/')
    }, [])

    return (
        <>
            <button onClick={open}>
                Логин
            </button>
            <Modal active={active} close={close}>
                <LoginForm close={close} setUserName={setUserName} />
            </Modal>
            <Modal active={!!userName}>
                <div>
                    Здравствуйте, {userName}!
                </div>
                <Button sx={{ backgroundColor: 'red' }} onClick={redirect}>
                    OK
                </Button>
            </Modal>
        </>
    )
}