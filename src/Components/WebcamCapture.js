import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import './WebcamCapture.css'
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../features/CameraSlice';
import { useHistory } from 'react-router';

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: 'user',
};


function WebcamCapture() {
    const webcamRef = useRef(null)
    const dispatch = useDispatch();
    const history = useHistory();
    // const [image, setImage] = useState('')
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
        dispatch(setCameraImage(imageSrc));
        history.push('/Preview')

        // setImage(imageSrc)
    }, [webcamRef])
    return (
        <div className='webcamCapture'>
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={videoConstraints.width}
                videoConstraints={videoConstraints}

            />
            <RadioButtonUncheckedIcon className='webcamCapture__button'
                onClick={capture}
                fontSize='large'
            />




        </div>
    )
}

export default WebcamCapture
