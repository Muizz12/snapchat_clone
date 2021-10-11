import { Avatar } from '@mui/material'
import React from 'react'
import StopIcon from '@mui/icons-material/Stop';
import TimeAgo from 'react-timeago'

import './Chat.css'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { selectImage } from '../features/appSlice';
import { db } from '../Firebase';
function Chat({ id, Profilepic, imageUrl, username, timestamp, read }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const open = () => {
        dispatch(selectImage(imageUrl));
        db.collection('posts').doc(id).set({
            read: true,
        }, { merge: true })
        history.push('/open')

    }
    return (
        <div onClick={open} className='chat'>
            <Avatar className='chat__avatar' src={Profilepic} />
            <div className="chat__info">
                <h2>{username}</h2>
                <p>{!read && "Tap to View"}{" "}<TimeAgo date={new Date(timestamp?.toDate()).toUTCString()} /></p>


            </div>
            {!read && <StopIcon className="chat__readIcon" />}




        </div>
    )
}

export default Chat
