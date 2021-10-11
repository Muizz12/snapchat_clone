import { createSlice } from '@reduxjs/toolkit';
export const CameraSlice = createSlice({
    name: 'camera',
    initialState: {
        cameraImage: null,
    },
    reducers: {

        setCameraImage: (state, action) => {
            state.cameraImage = action.payload;
        },
        resetCameraImage: (state) => {
            state.cameraImage = null
        },
    },

});
export const { setCameraImage, resetCameraImage } = CameraSlice.actions;
export const selectCameraImage = (state) => state.camera.cameraImage;
export default CameraSlice.reducer;
