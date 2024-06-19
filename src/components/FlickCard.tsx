import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity, TouchableNativeFeedback, Alert, StyleSheetProperties } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { pickImage, pickVideo } from '../utils/MediaPicker';
import { createVideo } from '../utils/FFmpeg';
import {VideoInfo} from '../utils/MediaPicker';
import LottieView from 'lottie-react-native';
import { NotificationContext, NotificationContextType } from '../context/NotoficationContext';
const LoadingAnimation = require('../assets/loading_animation.json');
const FlickCard = ({ flick }: { flick: Flick }) => {
    const {showNotification}:any = useContext(NotificationContext); // get the showNotification function from NotificationContext

    const [image, setImage] = React.useState(flick.imageUrl || "https://via.placeholder.com/150"); // set the image path
    const [video, setVideo] = React.useState<VideoInfo>({
        thumbnail: "https://via.placeholder.com/150",
        videoUrl: flick.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"
    }); // set the video path

    const [isLoading, setIsLoading] = React.useState(false); // set the loading state
    const [isSaved, setIsSaved] = React.useState(false); // set the saved state


    const handleSelfieSelect = () => { // handle selfie select
        setIsLoading(false); // set loading state
        setIsSaved(false); // set saved state

        pickImage() // open image picker
            .then((image) => {
                console.log(image);
                setImage(image.path); // set the cropped image path
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleVideoSelect = () => { // handle video select

        setIsLoading(false); // set loading state
        setIsSaved(false); // set saved state
        pickVideo() // open video picker
            .then((video) => {
                console.log(video);
                setVideo(video); // set the thumbnail path
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleSave = async () => {
        // check if video and image are selected
        if (!video.videoUrl|| video.thumbnail == "https://via.placeholder.com/150" || image == "https://via.placeholder.com/150") {
            showNotification('Please select video and image', 'ERROR',0,'BOTTOM'); // showNotification error notification
            return;
        }

        setIsLoading(true); // set loading state
        // save the flick
        const result = await createVideo(video.videoUrl, image); // create video

        if (result !== 'FAILED' && result !== 'CANCELLED') {
            showNotification('Flick Saved', 'INFO', 3000, 0, 'TOP'); // showNotification info notification
            console.log(result);
            setIsSaved(true); // set saved state
        }
        else if (result === 'CANCELLED') {
            console.log('Flick creation cancelled');
            showNotification('Flick creation cancelled', 'INFO',0, 'TOP'); // showNotification info notification
        }
        else {
            console.log('Flick creation failed');
            showNotification('Flick creation failed', 'ERROR',0, 'TOP'); // showNotification error notification
        }
        setIsLoading(false); // set loading state
    }
    return (
        <View style={styles.container}>

            <Text style={styles.text}>{flick.id}.</Text>

            <View style={styles.videoContainer}>
                <Text style={styles.text}>Video {flick.id}</Text>
                <TouchableNativeFeedback
                    onPress={handleVideoSelect}>
                    <Image
                        style={{ width: 90, height: 160 }}
                        source={{ uri: video.thumbnail }} />
                </TouchableNativeFeedback>
            </View>

            <View style={styles.imageContainer}>
                <Text style={styles.text}>Selfie {flick.id}</Text>
                <TouchableNativeFeedback
                    onPress={handleSelfieSelect}>
                    <Image
                        style={{ width: 90, height: 160 }}
                        source={{ uri: image }} />
                </TouchableNativeFeedback>
            </View>
            
            <View style={styles.buttonContainer}>
                <Text style={[styles.text, { marginBottom: 5 }]}>{(!isLoading)?(!isSaved)?'Save':'Saved':''}</Text>
                { !isLoading 
                && <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}>
                    <Icon name={!isSaved?'download':'file-download-done'} size={30} color={colors.primaryBackground} />
                </TouchableOpacity>}
                { isLoading && <LoadingAnimationView style={{width: 50, height: 50}}/>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    imageContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: colors.primaryText
    },
    saveButton: {
        backgroundColor: colors.primaryButtonBackground,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const LoadingAnimationView = ({style}:any) => {
    return (
        <LottieView
            source={LoadingAnimation}
            autoPlay
            style={{ ...style}}
            loop/>
    )
}
export default FlickCard