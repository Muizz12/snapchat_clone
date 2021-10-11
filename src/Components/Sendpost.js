import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import './Sendpost.css'
import { auth, db } from '../Firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/appSlice';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useHistory } from 'react-router';
import { resetCameraImage } from '../features/CameraSlice';

function Sendpost() {
    const [post, setpost] = useState([]);
    const user = useSelector(selectUser);
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setpost(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))))

    }, [])
    const takesnap = () => {
        dispatch(resetCameraImage())
        history.push('/')

    }
    // console.log('post--->', post);
    return (
        <div className='sendpost'>
            <div className="sendposts__header">
                <Avatar src={user.Profilepic} onClick={() => auth.signOut()} className='sendposts__avatar' />
                <div className="sendposts__search">
                    <SearchIcon />
                    <input placeholder='Friends' type='text' />

                </div>
                <ChatBubbleIcon className='sendposts__chatIcon' />
            </div>
            <div className="sendposts__post">
                {post.map(({ id, data: { Profilepic, imageUrl, username, timestamp, read } }) => (
                    <Chat
                        Profilepic={Profilepic}
                        key={id}
                        id={id}

                        username={username}
                        timestamp={timestamp}
                        read={read}
                        imageUrl={imageUrl} />
                ))}

            </div>
            <RadioButtonUncheckedIcon className='sendposts__button'
                onClick={takesnap}
                fontSize='large'
            />


        </div>
    )
}

export default Sendpost
