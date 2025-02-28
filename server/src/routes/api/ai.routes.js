const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const formatResponse = require('../../utils/formatResponse');
const { HttpsProxyAgent } = require('https-proxy-agent');

const proxy = process.env.PROXY_URL;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function aiOperations(text, type) {
  try {
    const agent = new HttpsProxyAgent(proxy);

    if (type === 'moderations') {
      const { data } = await axios.post(
        `https://api.openai.com/v1/${type}`,
        {
          model: 'text-moderation-latest',
          input: text.toLowerCase().trim(),
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

      return { result: data.results[0].flagged, error: null };
    }

    if (type === 'completions') {
      const { data } = await axios.post(
        `https://api.openai.com/v1/chat/${type}`,
        {
          model: 'gpt-4o',
          messages: [
            {
              role: 'user',
              content: text.toLowerCase().trim(),
            },
          ],
          max_tokens: 100,
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
      return { result: data.choices[0].message.content, error: null };
    }
    return {
      result: false,
      error: new Error('Ошибка aiOperations: не передан аргумент "type"'),
    };
  } catch (error) {
    // console.error('Ошибка openAI:', error?.response?.data || error.message);
    return { result: false, error }; //
  }
}

router.post('/moderations', verifyAccessToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    const isProfane = await aiOperations(title + ' ' + description, 'moderations');

    if (isProfane.error) {
      return res.status(200).json(formatResponse(200, null, null, isProfane.error));
    }

    if (isProfane.result) {
      return res
        .status(200)
        .json(
          formatResponse(
            200,
            'Текст содержит нецензурные слова или не удовлетворяет нормам приличия',
            isProfane.result,
            'Текст содержит нецензурные слова или не удовлетворяет нормам приличия',
          ),
        );
    }

    res.status(200).json(formatResponse(200, 'Текст прошел проверку', isProfane.result));
  } catch (error) {
    res
      .status(500)
      .json(formatResponse(500, 'Ошибка обращения к внешнему API', null, error.message));
  }
});

router.post('/generations', verifyAccessToken, async (req, res) => {
  try {
    const { prompt } = req.body;

    const generated = await aiOperations(prompt, 'completions');

    if (generated.error) {
      return res.status(400).json(formatResponse(400, null, null, generated.error));
    }

    res
      .status(200)
      .json(formatResponse(200, 'Гененрация прошла успешно', generated.result));
  } catch (error) {
    res
      .status(500)
      .json(formatResponse(500, 'Ошибка обращения к внешнему API', null, error.message));
  }
});

module.exports = router;
