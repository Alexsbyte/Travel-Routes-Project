const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const formatResponse = require('../../utils/formatResponse');
const { HttpsProxyAgent } = require('https-proxy-agent');

const proxy = process.env.PROXY_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function checkProfanity(text) {
  try {
    const agent = new HttpsProxyAgent(proxy);

    const response = await axios.post(
      // 'https://api.openai.com/v1/moderations',
      'https://api.openai.com/v1/completions',
      // {
      //   input: text,
      // },
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'красивый текст о путешествии',
          },
        ],
        max_tokens: 20,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        httpAgent: agent,
        httpsAgent: agent,
      },
    );

    console.log(response);

    // const result = response.data;

    // if (result.labels[0] === 'not profanity') {
    //   return false;
    // }
    // const profanityScore = result.scores[0];
    // return profanityScore > 0.66;
  } catch (error) {
    console.error('Ошибка openAI:', error?.response?.data || error.message);
    return false; // В случае ошибки пропускаем
  }
}

router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { title, description } = req.body;

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
