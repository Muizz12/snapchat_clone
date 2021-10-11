import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectSelectedImage } from '../features/appSlice'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './Open.css'
function Open() {
    const selectedImage = useSelector(selectSelectedImage)
    const history = useHistory()
    useEffect(() => {
        if (!selectedImage) {
            exit();
        }

    }, [selectedImage])
    const exit = () => {
        history.push("/sendpost")
    }
    return (
        <div className='open'>
            <img src={selectedImage} onClick={exit} alt={selectedImage} />
            <div className="open__time">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit()
                        }
                        return remainingTime
                    }}

                </CountdownCircleTimer>

            </div>


        </div>
    )
}

export default Open
