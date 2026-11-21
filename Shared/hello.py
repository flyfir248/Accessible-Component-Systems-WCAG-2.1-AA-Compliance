from groq import Groq

client = Groq()  # reads GROQ_API_KEY from the environment

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain what WCAG 2.1 AA means in 3 sentences."},
    ],
)

print(response.choices[0].message.content)
