import ImageCropPicker, { Video } from "react-native-image-crop-picker";
import { createThumbnail } from "react-native-create-thumbnail";

export type VideoInfo =  {
    thumbnail: string;
    videoUrl: string;
}
const E_PICKER_CANCELLED = 'E_IMAGE_PICKER_CANCELLED'; // common error message
export const pickImage = async (width: number = 300, height: number = 300) => { // default width and height
    try {
        const image = await ImageCropPicker.openPicker({
            width: width,
            height: height,
            cropping: true,
            cropperCircleOverlay: true,
            forceJpg: true,

        }); // open image picker with circlular crop overlay

        if (!image.path) // if no image is selected
            throw new Error(E_PICKER_CANCELLED);

        return image;


    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const pickVideo = async () => {
    try {
        const video: Video & { // type for video with thumbnail
            thumbnail?: string;
        } = await ImageCropPicker.openPicker({
            mediaType: 'video',
        }); // open video picker

        if (!video.path) // if no video is selected
            throw new Error(E_PICKER_CANCELLED);

        const thumbnail = await createThumbnail({
            url: video.path,
            timeStamp: 1000,
        }); // create thumbnail for the video

        video.thumbnail = thumbnail.path; // set the thumbnail path

        return <VideoInfo>{
            thumbnail: video.thumbnail,
            videoUrl: video.path,
        };


    } catch (error) {
        console.log(error);
        throw error;
    }
}