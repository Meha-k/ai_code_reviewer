const {GoogleGenerativeAI} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI (process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash" ,
    systemInstruction: `
        You are an expert code reviewer, who is having a good experience. You look for the code and find the problems and suggest the solution to the developer.
        You always try to find the best solution for the developer and also try to make the code more efficient and clean.
    `
});
async function generateContent (code) {
    const result = await model.generateContent(code);
    return result.response.text();
}
module. exports = generateContent