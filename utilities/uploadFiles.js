import multer from "multer";
import { v4 as uuidv4 } from 'uuid'

const uploadFile = (FileName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = '/' + uuidv4() + '-' + file.originalname
            cb(null, uniqueSuffix)
        }
    })

    function fileFilter(req, file, cb) {

        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        } else {

            cb("Upload Image Only", false);
        }
    }


    const upload = multer({ storage: storage, fileFilter, limits: { fileSize: 1024 * 1024 } })

    return upload.single(FileName)
}
export { uploadFile };
