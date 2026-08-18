"use server"

export const OllamaConnector = async (prompt) => {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek-r1:1.5b",
            prompt,
            stream: false
        })
    })

    const data = await response.json()

    return data
}