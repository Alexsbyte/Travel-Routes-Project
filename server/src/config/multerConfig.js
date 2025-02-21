const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dirName = req.headers.title;

    console.log(dirName, '<<<<<<<');

    // здесь cb - колбек, который возвращает значение для св-ва destination
    cb(null, path.resolve(__dirname, `../../public/images/${dirName}`)); // папка куда сохранять файлы
  },
  filename(req, file, cb) {
    // здесь cb - колбек, который возвращает значение для св-ва filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // уникальное имя файла
    cb(null, uniqueSuffix + path.extname(file.originalname)); // file.originalname - расширение файла
  },
});

const fileFilter = (req, file, cb) => {
  console.log('<<<<<<<filter');
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  console.log('<<<<<<<filter2');
  if (extName && mimeType) {
    console.log('<<<<<<<filter3');
    return cb(null, true);
  }
  console.log('<<<<<<<filter4');
  cb(new Error('Только изображения форматов JPEG, PNG, GIF!'));
};

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter, // Максимальный размер файла 5MB
}); // Обработка до 5 файлов (в поле 'photos')

// // Создаем endpoint для загрузки файлов
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'Файл не загружен' });
//   }
//   res.json({ message: 'Файл успешно загружен', filename: req.file.filename });
// });
