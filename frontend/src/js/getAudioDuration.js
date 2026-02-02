export default function getAudioDuration(fileOrUrl) {
    return new Promise((resolve, reject) => {
        const audio = document.createElement("audio");
        audio.preload = "metadata";

        audio.onloadedmetadata = () => {
            resolve(audio.duration * 1000);
        };

        audio.onerror = () => {
            reject("Cannot load audio metadata");
        };

        if (fileOrUrl instanceof File) {
            audio.src = URL.createObjectURL(fileOrUrl);
        } else {
            audio.src = fileOrUrl;
        }
    });
}