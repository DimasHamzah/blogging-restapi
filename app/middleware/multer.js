const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/blog/'));
    },
    filename: function(req, file,cb){
        cb(null, new Date().toISOString() .replace (/:/g, '-') + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(
            {
                message: 'Unsupported file format',
            },
            false
        );
    }
};

const uploadMiddleware = multer({
    storage: storage,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: fileFilter,
});

module.exports = { uploadMiddleware };