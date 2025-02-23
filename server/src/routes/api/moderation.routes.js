const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const formatResponse = require('../../utils/formatResponse');

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function checkProfanity(text) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/joeddav/xlm-roberta-large-xnli',
      {
        inputs: text,
        parameters: {
          candidate_labels: ['profanity', 'not profanity'],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const result = response.data;
    console.log('Модерация:', result);

    if (result.labels[0] === 'not profanity') {
      return false;
    }
    const profanityScore = result.scores[0];
    return profanityScore > 0.69;
  } catch (error) {
    console.error('Ошибка Hugging Face:', error?.response?.data || error.message);
    return false; // В случае ошибки пропускаем
  }
}

router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title, description);

    const isProfane = await checkProfanity(title + ' ' + description);
    if (isProfane) {
      return res
        .status(400)
        .json(formatResponse(400, null, null, 'Текст содержит нецензурные выражения'));
    }

    res.status(200).json(formatResponse(200, 'Текст прошел проверку', !isProfane));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(formatResponse(500, 'Ошибка обращения к внешнему API', null, error.message));
  }
});

module.exports = router;
