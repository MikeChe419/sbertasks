import { useState, useCallback, useContext } from "react"
import {UserContext} from '../../context/userContext'
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"

export function LoginPage() {

    const {setToken} = useContext(UserContext)
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const onSignInClick = useCallback(() => {   
        const API = api 
        API.signIn(email, password)
          .then(obj => {
            API.setToken(obj.token)
            setEmail('')
            setPassword('')
            setToken(obj.token)
            localStorage.setItem('token', obj.token)
            navigate('/')
          })
      }, [email, password])

    //   const [showPassword, setShowPassword] = React.useState(false);
    //   const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={onSignInClick}>Показать пароль</button>
            </div>
            <button onClick={onSignInClick}>Sign In</button>
        </div>
    )
}