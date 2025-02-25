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

    console.log(text);

    // const res = await axios.post(
    //   'https://api.openai.com/v1/moderations',
    //   // 'https://api.openai.com/v1/completions',
    //   {
    //     input: text.toLowerCase().trim(),
    //   },
    //   // { model: 'omni-moderation-latest' },
    //   // {
    //   //   model: 'gpt-3.5-turbo',
    //   //   messages: [
    //   //     {
    //   //       role: 'user',
    //   //       content: 'красивый текст о путешествии',
    //   //     },
    //   //   ],
    //   //   max_tokens: 20,
    //   //   temperature: 0.7,
    //   // },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${OPENAI_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     httpAgent: agent,
    //     httpsAgent: agent,
    //   },
    // );

    const { data } = await axios.post(
      'https://api.openai.com/v1/moderation',
      {
        model: 'omni-moderation-latest',
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

    // console.log(res.data.results[0].flagged);
    // console.log(res.data.results[0].category_applied_input_types);
    // console.log(res);

    return { success: data.results[0].flagged, error: null };
  } catch (error) {
    console.error('Ошибка openAI:', error?.response?.data || error.message);
    return { success: false, error }; //
  }
}

router.post('/', verifyAccessToken, async (req, res) => {
  try {
    const { title, description } = req.body;

    const isProfane = await checkProfanity(title + ' ' + description);

    if (isProfane.error) {
      return res.status(400).json(formatResponse(400, null, null, isProfane.error));
    }

    if (!isProfane.success) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Текст содержит нецензурные слова или не удовлетворяет нормам приличия',
            null,
            'Текст содержит нецензурные слова или не удовлетворяет нормам приличия',
          ),
        );
    }

    res.status(200).json(formatResponse(200, 'Текст прошел проверку', isProfane.success));
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json(formatResponse(500, 'Ошибка обращения к внешнему API', null, error.message));
  }
});

module.exports = router;
