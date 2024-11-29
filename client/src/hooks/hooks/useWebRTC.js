// hooks/useWebRTC.js
import { useState, useRef, useCallback, useEffect } from 'react';
import io from 'socket.io-client';

export const useWebRTC = (currentUser) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callStatus, setCallStatus] = useState('idle');

  const peerConnectionRef = useRef(null);
  const socketRef = useRef(io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000'));

  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { 
          urls: 'turn:your-turn-server.com', 
          username: 'your-username', 
          credential: 'your-password' 
        }
      ]
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current.emit('ice-candidate', {
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      setCallStatus('connected');
    };

    return pc;
  }, []);

  const startCall = useCallback(async (userId, type) => {
    try {
      const constraints = {
        audio: true,
        video: type === 'video'
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setLocalStream(stream);
      setCallStatus('connecting');

      peerConnectionRef.current = createPeerConnection();

      stream.getTracks().forEach(track => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socketRef.current.emit('call-offer', {
        offer,
        from: currentUser._id,
        to: userId,
        type
      });

    } catch (error) {
      console.error('Error starting call:', error);
      setCallStatus('ended');
    }
  }, [createPeerConnection, currentUser]);

  const endCall = useCallback(() => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    localStream?.getTracks().forEach(track => track.stop());
    remoteStream?.getTracks().forEach(track => track.stop());

    setLocalStream(null);
    setRemoteStream(null);
    setCallStatus('ended');

    socketRef.current.emit('end-call');
  }, [localStream, remoteStream]);

  useEffect(() => {
    const socket = socketRef.current;

    socket.on('call-offer', async (data) => {
      try {
        peerConnectionRef.current = createPeerConnection();

        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );

        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);

        socket.emit('call-answer', {
          answer,
        });

        const constraints = {
          audio: true,
          video: data.type === 'video'
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setLocalStream(stream);

        stream.getTracks().forEach(track => {
          peerConnectionRef.current?.addTrack(track, stream);
        });

      } catch (error) {
        console.error('Error handling call offer:', error);
      }
    });

    socket.on('call-answer', async (data) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      }
    });

    socket.on('ice-candidate', async (data) => {
      try {
        if (peerConnectionRef.current && data.candidate) {
          await peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    });

    return () => {
      socket.off('call-offer');
      socket.off('call-answer');
      socket.off('ice-candidate');
    };
  }, [createPeerConnection]);

  return {
    localStream,
    remoteStream,
    startCall,
    endCall,
    callStatus
  };
};