import { FFmpegKit, ReturnCode } from "ffmpeg-kit-react-native";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
export const createVideo = async (videoUrl: string, imageUrl: string) => {
try{
    const ouputFilename = `${videoUrl.split('/').pop()}-${Date.now()}-output.mp4`;
    const outputVideo = `${RNFS.DocumentDirectoryPath}/${ouputFilename}`;
    let videoPath = `${RNFS.DownloadDirectoryPath}/${ouputFilename}`;
    if(Platform.OS !== 'android')
        videoPath = `${RNFS.LibraryDirectoryPath}/${ouputFilename}`;
    const maskUrl = `${RNFS.DocumentDirectoryPath}/mask.png`;
    const exists = await RNFS.exists(maskUrl);
    
    if(!exists)
        await RNFS.copyFileAssets('mask.png', maskUrl);

    const ffmpegCommand = `-i ${imageUrl} -i ${maskUrl} -i ${videoUrl}  -filter_complex "[0:v]scale=400:400[ava];[1:v]alphaextract[alfa];[ava][alfa]alphamerge[masked_sel];[2:v]scale=1080:1920,setsar=1[v];[masked_sel]scale=300:300[mask];[v][mask]overlay=10:main_h-overlay_h-10" -pix_fmt yuv420p -c:a copy ${outputVideo}`;

    const session = await FFmpegKit.execute(ffmpegCommand);
    const returnCode = await session.getReturnCode();
    if (ReturnCode.isSuccess(returnCode)){
        await RNFS.moveFile(outputVideo, videoPath);
        return videoPath;
      } else if (ReturnCode.isCancel(returnCode)) {
        return 'CANCELLED';
      } else {
        return 'FAILED';
      }
}
catch(error){
    console.log(error);
    return 'FAILED';
}
}


// ffmpeg -i Selfie1.jpeg -i mask.png -i Video1.mp4 -filter_complex "[0:v]scale=400:400[ava];[1:v]alphaextract[alfa];[ava][alfa]alphamerge[masked_sel];[2:v]scale=1080:1920,setsar=1[v];[masked_sel]scale=300:300[mask];[v][mask]overlay=10:main_h-overlay_h-10" -pix_fmt yuv420p -c:a copy output.mp4


