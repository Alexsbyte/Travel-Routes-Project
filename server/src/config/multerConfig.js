const multer = require('multer');
const { transliterate } = require('transliteration');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      const { email, title } = req.body;

      const transTitle = transliterate(title);

     

      let preFixDirName = 'avatars';

      if (file && file.fieldname === 'files') {
        preFixDirName = 'routes';
      }

      const dirPath = path.resolve(
        __dirname,
        `../../public/images/${preFixDirName}/${email || transTitle}`,
      );

      // Создаём директорию, и если она не существует
      fs.mkdirSync(dirPath, { recursive: true });

      // здесь cb - колбек, который возвращает значение для св-ва destination
      cb(
        null,
        path.resolve(
          __dirname,
          `../../public/images/${preFixDirName}/${email || transTitle}`,
        ),
      ); // папка куда сохранять файлы
    } catch (error) {
      cb(new Error('Ошибка создания папки или файла: ' + error.message));
    }
  },
  filename(req, file, cb) {
    // здесь cb - колбек, который возвращает значение для св-ва filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`; // уникальное имя файла
    cb(null, uniqueSuffix + path.extname(file.originalname)); // file.originalname - расширение файла
  },
});

const fileFilter = (req, file, cb) => {
  // console.log('<<<<<<<filter');
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);
  if (extName && mimeType) {
    return cb(null, true);
  }
  cb(new Error('Только изображения форматов JPEG, PNG, GIF!'));
};

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter, // Максимальный размер файла 5MB
}); // Обработка до 5 файлов (в поле 'photos')
