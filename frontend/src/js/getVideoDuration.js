export default function getVideoDuration(fileOrUrl) {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
            resolve(video.duration * 1000);
        };
        video.onerror = () => {
            reject("Cannot load video metadata");
        };
        if (fileOrUrl instanceof File) {
            video.src = URL.createObjectURL(fileOrUrl);
        } else {
            video.src = fileOrUrl;
        }
    });
}