import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/appSlice'
import { auth, provider } from '../Firebase'
import './Login.css'
function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                dispatch(login({
                    username: result.user.displayName,
                    Profilepic: result.user.photoURL,
                    id: result.user.uid

                }))

            }).catch((error) => {
                alert(error)
            })

    }

    return (
        <div className='login'>
            <div className="login__container">
                <img src='https://th.bing.com/th/id/R.01d85ad0fb5c80379bf077349345982a?rik=rw%2fHZ%2fXquJ3TYA&pid=ImgRaw&r=0' />
                <Button varient='outline' onClick={signIn}><strong>Sign in</strong></Button>
            </div>
        </div>
    )
}

export default Login
