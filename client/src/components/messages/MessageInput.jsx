import React, { useState, useRef } from "react";  
import { Send, Smile, X, Paperclip } from "lucide-react";  
import EmojiPicker from 'emoji-picker-react';  
import useSendMessage from "../../hooks/useSendMessage";  
import axios from 'axios';  

const MessageInput = () => {  
    const [message, setMessage] = useState("");  
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);  
    const [selectedFile, setSelectedFile] = useState(null);  
    const [error, setError] = useState("");  
    const fileInputRef = useRef(null);  
    const { loading, sendMessage } = useSendMessage();  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        if (!message && !selectedFile) return;  

        try {  
            let fileUrl = null;  

            if (selectedFile) {  
                fileUrl = await uploadFile(selectedFile);  
            }  

            await sendMessage(message, { type: selectedFile ? "image" : "text", url: fileUrl });  

            // Clear inputs  
            setMessage("");   
            setSelectedFile(null);   
            setError(""); // Clear any previous errors  
        } catch (error) {  
            console.error("Error sending message or uploading file:", error);  
            setError("Failed to send message. Please try again.");  
        }  
    };  

    const uploadFile = async (file) => {  
        const formData = new FormData();  
        formData.append('file', file);  
        try {  
            const response = await axios.post('/api/upload', formData, {  
                headers: { 'Content-Type': 'multipart/form-data' }  
            });  
            return response.data.fileUrl; // Assuming the response has the file URL  
        } catch (error) {  
            console.error("Error uploading file:", error);  
            throw error;  
        }  
    };  

    const handleEmojiClick = (emojiObject) => {  
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);  
        setShowEmojiPicker(false);  
    };  

    const toggleEmojiPicker = () => {  
        setShowEmojiPicker((prev) => !prev);  
    };  

    const handleFileChange = (e) => {  
        const file = e.target.files[0];  
        if (file) {  
            // Optional: Validate file type and size  
            if (file.size > 5 * 1024 * 1024) { // example: 5MB limit  
                setError("File size exceeds 5MB.");  
                return;  
            }  
            setSelectedFile(file);  
            setError(""); // Clear any previous error  
        }  
    };  

    const triggerFileInput = () => {  
        fileInputRef.current.click();  
    };  

    return (  
        <form className='px-4 my-3' onSubmit={handleSubmit}>  
            {error && <div className="text-red-500">{error}</div>} {/* Display error */}  
            <div className='w-full relative'>  
                <input  
                    type='text'  
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white pr-28'  
                    placeholder='Send a message'  
                    value={message}  
                    onChange={(e) => setMessage(e.target.value)}  
                />  
                <div className='absolute inset-y-0 end-0 flex items-center pe-3'>  
                    <button  
                        type='button'  
                        className='mr-2 text-blue-500 hover:text-white'  
                        onClick={triggerFileInput}  
                        aria-label="Attach file"  
                    >  
                        {/* <Paperclip size={20} />   */}
                    </button>  
                    <input  
                        type='file'  
                        ref={fileInputRef}  
                        onChange={handleFileChange}  
                        className='hidden'  
                        accept="image/*,.pdf,.doc,.docx,.txt"  
                    />  
                    <button  
                        type='button'  
                        className='mr-2 text-blue-500 hover:text-white'  
                        onClick={toggleEmojiPicker}  
                        aria-label="Add emoji"  
                    >  
                        <Smile size={20} />  
                    </button>  
                    <button type='submit' className='text-blue-500 hover:text-white' disabled={loading}>  
                        {loading ? <div className='loading loading-spinner'></div> : <Send size={20} />}  
                    </button>  
                </div>  
                {showEmojiPicker && (  
                    <div className='absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg shadow-lg'>  
                        <div className='flex justify-end p-2'>  
                            <button  
                                type='button'  
                                className='text-blue-500 hover:text-white'  
                                onClick={toggleEmojiPicker}  
                                aria-label="Close emoji picker"  
                            >  
                                <X size={24} />  
                            </button>  
                        </div>  
                        <EmojiPicker  
                            onEmojiClick={handleEmojiClick}  
                            autoFocusSearch={false}  
                            theme="dark"  
                            width={300}  
                            height={400}  
                        />  
                    </div>  
                )}  
            </div>  
            {selectedFile && (  
                <div className='mt-2 text-sm text-gray-300'>  
                    Selected file: {selectedFile.name}  
                    {selectedFile.type.startsWith('image/') && (  
                        <img   
                            src={URL.createObjectURL(selectedFile)}   
                            alt="Selected file preview"   
                            className="mt-2 max-w-xs max-h-40 object-contain"  
                        />  
                    )}  
                </div>  
            )}  
        </form>  
    );  
};  

export default MessageInput;