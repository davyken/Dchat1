// In multerconfig.js  
import multer from 'multer';  

// Store files in memory (for quick access)  
const storage = multer.memoryStorage();   

// Create multer instance  
const upload = multer({ storage });   

// Export the upload instance  
export { upload }; // Named export