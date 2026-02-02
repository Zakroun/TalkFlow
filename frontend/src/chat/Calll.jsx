import { useDispatch, useSelector } from "react-redux";
import { updatecall, endcall } from "../data/ChatSlice";
import { useState, useEffect, useRef } from "react";
import { FaPhone, FaVideo, FaCircle, FaRegCircle } from "react-icons/fa";
import { IoMicOff, IoMic } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import { setErrorMessage, setWarnningMessage, setSuccessMessage } from "../data/ChatSlice";
import { useNavigate } from "react-router-dom";
export default function Call() {
    const callobject = useSelector(s => s.chat.callobject);
    const activeChat = useSelector(s => s.chat.activeChat);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLocalMain, setIsLocalMain] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [callTime, setCallTime] = useState("00:00:00");
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const timerRef = useRef(null);
    const [callStarted, setCallStarted] = useState(false);

    useEffect(() => {
        if (callobject?.id) {
            setIsRecording(callobject.isRecorded || false);
        }
    }, [callobject?.id]);

    const checkPermissions = async () => {
        try {
            const cameraPermission = await navigator.permissions.query({ name: 'camera' });
            const microphonePermission = await navigator.permissions.query({ name: 'microphone' });
            
            if (cameraPermission.state === 'denied' || microphonePermission.state === 'denied') {
                dispatch(setWarnningMessage("Camera or Microphone access denied. Please enable permissions in browser settings."));
                return false;
            }
            return true;
        } catch (error) {
            console.error("Permission check error:", error);
            return true;
        }
    };

    const startCall = async () => {
        if (!callobject?.id || callStarted) return;

        const hasPermissions = await checkPermissions();
        if (!hasPermissions) return;

        try {
            let stream;
            
            if (callobject.type === "video") {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: true 
                });
            } else {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: true 
                });
            }

            setLocalStream(stream);
            
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            if (callobject.status === "ongoing") {
                const mockRemoteStream = new MediaStream();
                if (callobject.type === "video") {
                    const videoTrack = stream.getVideoTracks()[0];
                    if (videoTrack) mockRemoteStream.addTrack(videoTrack.clone());
                }
                const audioTrack = stream.getAudioTracks()[0];
                if (audioTrack) mockRemoteStream.addTrack(audioTrack.clone());
                
                setRemoteStream(mockRemoteStream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = mockRemoteStream;
                }
            }

            setCallStarted(true);
            dispatch(setSuccessMessage("Call started successfully"));
            
        } catch (error) {
            console.error("Media error:", error);
            if (error.name === "NotAllowedError") {
                dispatch(setErrorMessage("Camera or microphone permission denied"));
            } else if (error.name === "NotFoundError") {
                dispatch(setErrorMessage("No camera or microphone found"));
            } else {
                dispatch(setErrorMessage("Failed to start call: " + error.message));
            }
        }
    };

    const answerCall = async () => {
        if (!callobject?.id || callStarted) return;

        const hasPermissions = await checkPermissions();
        if (!hasPermissions) return;

        try {
            let stream;
            
            if (callobject.type === "video") {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: true 
                });
            } else {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: false, 
                    audio: true 
                });
            }

            setLocalStream(stream);
            
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            if (callobject.status === "ongoing") {
                const mockRemoteStream = new MediaStream();
                if (callobject.type === "video") {
                    const videoTrack = stream.getVideoTracks()[0];
                    if (videoTrack) mockRemoteStream.addTrack(videoTrack.clone());
                }
                const audioTrack = stream.getAudioTracks()[0];
                if (audioTrack) mockRemoteStream.addTrack(audioTrack.clone());
                
                setRemoteStream(mockRemoteStream);
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = mockRemoteStream;
                }
            }

            setCallStarted(true);
            dispatch(updatecall({
                chatId: callobject.chatId,
                callId: callobject.id,
                data: {
                    status: "ongoing"
                }
            }));
            dispatch(setSuccessMessage("Call answered"));
            
        } catch (error) {
            console.error("Media error:", error);
            dispatch(setErrorMessage("Failed to answer call"));
        }
    };

    useEffect(() => {
        if (callobject?.id && !callStarted) {
            if (callobject.status === "outgoing") {
                startCall();
            } else if (callobject.status === "incoming") {
                answerCall();
            } else if (callobject.status === "ongoing") {
                startCall();
            }
        }

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (remoteStream) {
                remoteStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [callobject?.id, callobject?.status]);

    useEffect(() => {
        if (callobject?.status === "ongoing") {
            const startTime = new Date(callobject.datetime).getTime();

            if (timerRef.current) clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);

                const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
                const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
                const s = String(elapsed % 60).padStart(2, "0");
                const time = `${h}:${m}:${s}`;

                setCallTime(time);

                dispatch(updatecall({
                    chatId: callobject.chatId,
                    callId: callobject.id,
                    data: {
                        duration: time,
                        isRecorded: isRecording
                    }
                }));
            }, 1000);
        }
        return () => timerRef.current && clearInterval(timerRef.current);
    }, [callobject?.status, isRecording]);

    const handleEndCall = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        if (remoteStream) {
            remoteStream.getTracks().forEach(track => track.stop());
        }
        
        dispatch(updatecall({
            chatId: activeChat,
            callId: callobject.id,
            data: {
                status: "ended",
                duration: callTime,
                isRecorded: isRecording
            }
        }));
        navigate(`/chat/chats`);
        dispatch(endcall());
        setCallStarted(false);
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = isMuted;
            });
        }
        setIsMuted(!isMuted);
    };

    const toggleRecording = () => {
        const newRecordingState = !isRecording;
        setIsRecording(newRecordingState);
    };

    const toggleVideoLayout = () => {
        setIsLocalMain(prev => !prev);
    };

    if (!callobject?.id) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full border border-gray-200">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                            <FaPhone className="text-blue-500 text-4xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">No Active Call</h2>
                        <p className="text-gray-600 text-lg mb-2">No call is currently active</p>
                        <p className="text-gray-500 text-sm">Start a call from the chat to begin</p>
                    </div>
                </div>
            </div>
        );
    }

    const isOngoing = callobject.status === "ongoing";
    const isIncoming = callobject.status === "incoming";
    const isOutgoing = callobject.status === "outgoing";
    const isVideoCall = callobject.type === "video";

    return (
        <div className="h-full overflow-y-auto p-4 md:p-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200">
                <div className="p-8 md:p-12 flex flex-col items-center text-center">
                    {isVideoCall && isOngoing && callStarted ? (
                        <>
                            <div className="flex flex-col items-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                    {callobject.username}
                                </h1>
                                <p className="text-gray-500 text-lg mb-3">
                                    {callobject.phone}
                                </p>
                                <span className="px-4 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                                    Video Call
                                </span>
                            </div>
                            <div className="w-full max-w-4xl mx-auto mb-10">
                                <div className="relative w-full max-w-4xl h-[420px] mx-auto mb-10 rounded-2xl overflow-hidden bg-black">
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        className={`absolute object-contain transition-all duration-500
                                            ${isLocalMain
                                                ? 'w-40 h-48 bottom-4 right-4 rounded-xl border border-white/30 shadow-2xl z-20'
                                                : 'w-full h-full top-0 left-0 z-10'
                                            }`}
                                    />
                                    <video
                                        ref={localVideoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className={`absolute object-contain transition-all duration-500 scale-x-[-1]
                                            ${isLocalMain
                                                ? 'w-full h-full top-0 left-0 z-10'
                                                : 'w-40 h-48 bottom-4 right-4 rounded-xl border border-white/30 shadow-2xl z-20'
                                            }`}
                                        onClick={toggleVideoLayout}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg mb-4 bg-gray-200 flex items-center justify-center">
                                {callobject.avatar ? (
                                    <img
                                        src={callobject.avatar}
                                        alt={callobject.username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${isVideoCall ? 'bg-blue-600' : 'bg-green-600'}`}>
                                        {isVideoCall ? <FaVideo className="text-white text-2xl" /> : <FaPhone className="text-white text-2xl" />}
                                    </div>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                                {callobject.username}
                            </h1>

                            <p className="text-gray-500 text-lg mb-3">
                                {callobject.phone}
                            </p>

                            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${isVideoCall ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                {isVideoCall ? 'Video Call' : 'Voice Call'}
                            </span>
                        </div>
                    )}

                    {isOngoing && (
                        <div className="mb-6">
                            <div className="text-3xl font-mono font-bold text-gray-900">
                                {callTime}
                            </div>
                            <div className="text-gray-500 text-sm mt-2">
                                Call Duration
                            </div>
                        </div>
                    )}

                    {(isIncoming || isOutgoing) && !callStarted && (
                        <div className="mb-8">
                            <div className="text-xl font-bold text-gray-900 mb-4">
                                {isIncoming ? "Incoming Call..." : "Calling..."}
                            </div>
                            <button
                                onClick={isIncoming ? answerCall : startCall}
                                className={`px-8 py-3 rounded-full font-semibold text-white ${isIncoming ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                            >
                                {isIncoming ? "Answer Call" : "Start Call"}
                            </button>
                        </div>
                    )}
                    {isOngoing && callStarted && (
                        <div className="flex justify-center gap-6 mb-8">
                            <button onClick={toggleMute} className="flex flex-col items-center">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    {isMuted ? <IoMicOff size={20} /> : <IoMic size={20} />}
                                </div>
                                <div className="text-sm text-gray-600">Mute</div>
                            </button>
                            <button onClick={toggleRecording} className="flex flex-col items-center">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    {isRecording ? <FaCircle size={18} /> : <FaRegCircle size={18} />}
                                </div>
                                <div className="text-sm text-gray-600">Record</div>
                            </button>
                            <button onClick={handleEndCall} className="flex flex-col items-center">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2 bg-red-100 text-red-600 hover:bg-red-200">
                                    <MdCallEnd size={20} />
                                </div>
                                <div className="text-sm text-gray-600">End Call</div>
                            </button>
                        </div>
                    )}
                    {callobject.notes && (
                        <div className="w-full max-w-3xl bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                Call Notes
                            </h3>
                            <p className="text-gray-700 text-base">
                                {callobject.notes}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}