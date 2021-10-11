import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CloseIcon from '@mui/icons-material/Close';
import { resetCameraImage, selectCameraImage } from '../features/CameraSlice'
import './Preview.css'
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import { db, storage } from '../Firebase';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { selectUser } from '../features/appSlice';
function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(selectUser)
    const SendPost = () => {
        const id = uuidv4();
        const uploadTask = storage.ref(`posts/${id}`)
            .putString(cameraImage, "data_url");
        uploadTask.on('state_changed', null, (error) => {
            console.log(error);
        }, () => {
            // complete finction
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    Profilepic: user.Profilepic,
                    read: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.push("/sendpost")

            })
        })
    }
    const closePreview = () => {
        dispatch(resetCameraImage())
        // history.push("/")
    }
    useEffect(() => {
        if (!cameraImage) {
            history.replace("/")

        }

    }, [cameraImage, history])
    return (
        <div className='preview'>
            <CloseIcon className='preview__clone' onClick={closePreview} />
            <div className="preview__toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <AccessTimeIcon />


            </div>
            <img src={cameraImage} alt={cameraImage} />
            <div onClick={SendPost} className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon fontSize='small' className="preview__sendIcon" />
            </div>
        </div>
    )
}

export default Preview
