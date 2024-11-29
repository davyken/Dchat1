// components/CallModal.jsx
import React from 'react';

const CallModal = ({ 
  localStream, 
  remoteStream, 
  callStatus, 
  onEndCall, 
  name 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100">
      <div className="bg-gray-800 p-4 rounded-lg text-center w-3/4 max-w-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {callStatus === 'connecting' ? `Connecting with ${name}...` : 
             callStatus === 'connected' ? `In call with ${name}` : 'Call Ended'}
          </h2>
          <button 
            onClick={onEndCall}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            End Call
          </button>
        </div>

        <div className="flex space-x-4 justify-center">
          {localStream && (
            <video 
              ref={(video) => {
                if (video) video.srcObject = localStream;
              }}
              autoPlay 
              muted 
              className="w-1/2 rounded-lg"
            />
          )}
          
          {remoteStream && (
            <video 
              ref={(video) => {
                if (video) video.srcObject = remoteStream;
              }}
              autoPlay 
              className="w-1/2 rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CallModal;