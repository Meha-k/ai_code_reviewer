const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const code = req.body.code;
  if (!code) return res.status(400).send("Code is required");
  
  try {
    const response = await generateContent(code);
    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("AI failed to generate review");
  }
};
