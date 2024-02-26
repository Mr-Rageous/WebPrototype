// Function to send a prompt to ChatGPT and get a response
export async function getChatGPTResponse(prompt) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // DO NOT TOUCH THIS
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // You can use a different model if you prefer
            prompt: prompt,
            max_tokens: 50 // Adjust the number of tokens to control the length of the response
        })
    });
    const data = await response.json();
    return data.choices[0].text.trim();
}

// Define a function to prompt the user for input and get the item name from ChatGPT
export async function getItemNameFromChatGPT(parts) {
    // Prompt the user for the item name
    var itemPrompt = 'Please identify the objects in this array, as well as their parts, and return the name of the item described by the parts inside:' + JSON.stringify(parts);
    var itemName = await getChatGPTResponse(itemPrompt);

    // Return the item name
    return itemName;
}
