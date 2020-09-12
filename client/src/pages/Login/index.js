import React, {useState} from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

import './styles.css'

const LoginForm = ()=>{

    let history = useHistory();

    const [mainPassWord, changePassWord] = useState('');

    const handleLogin = () => {
        axios
        .post("http://localhost:3000/keychain/init", {
            body: {
                password:mainPassWord,
            },
        })
        .then(response =>
            response.status === 200 ? history.push('/home')
            : console.log(response))
    }

    return(
        <div className = 'form-wrapper'>
            <div className = 'title'>
                {'Insert Main Password'}
            </div>
            <input
                type = 'text'
                placeholder = 'Password'
                value = {mainPassWord}
                onChange = {e => changePassWord(e.target.value)}
            />
            <button className = 'submit' onClick = {handleLogin}>
                {'Submit'}
            </button>
        </div>
    )
}

export default LoginForm