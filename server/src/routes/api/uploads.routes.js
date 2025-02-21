const router = require('express').Router();
const UploadController = require('../../controllers/Upload.controller');
const upload = require('../../config/multerConfig');

router.post('/single', upload.single('file'), UploadController.singleFile);

module.exports = router;
