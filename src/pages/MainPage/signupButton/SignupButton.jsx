import { useCallback, useEffect, useState } from "react"
import Modal from "../../../components/modal/Modal"
import RegistrationForm from "./registrationForm/RegistrationForm"
import { useNavigate, useLocation } from "react-router-dom"

export function SignupButton() {

    const [active, setActive] = useState(false)

    const [successModalActive, setSuccessModalActive] = useState(false)

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (successModalActive) {
            setActive(false)
        }
    }, [successModalActive])

    useEffect(() => {
        setSuccessModalActive(false)
    }, [])

    useEffect(() => {
        if (location.pathname === '/signup') {
            setActive(true)
        }
    }, [location.pathname])

    const close = useCallback(
        () => setActive(false),
        [setActive]
    )

    const open = useCallback(
        () => {
            navigate('/signup')
        },
        [setActive]
    )

    const closeSuccessModal = useCallback(
        () => setSuccessModalActive(false),
        []
    )

    return (
        <>
            <button onClick={open}>
                Зарегистрироваться
            </button>
            <Modal active={active} close={close}>
                <RegistrationForm
                    setSuccessModalActive={setSuccessModalActive} />
            </Modal>
            <Modal
                active={successModalActive}
                close={closeSuccessModal}>
                Вы успешно зарегистрировались!

                <button onClick={closeSuccessModal}>
                    OK
                </button>
            </Modal>
        </>
    )
}