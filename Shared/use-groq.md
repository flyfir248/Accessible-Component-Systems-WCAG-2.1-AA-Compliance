# Use Groq for free

A short guide: get a free API key, then call the model from Python, JavaScript or curl.

---

## 1. Get your free API key (2 minutes)

1. Go to **https://console.groq.com** and sign up (Google, GitHub or email). No credit card is needed for the Free plan.
2. Open **https://console.groq.com/keys**.
3. Click **Create API Key**, give it a name (for example `lab`), and click **Submit**.
4. **Copy the key now.** It starts with `gsk_` and is shown only once. If you lose it, create a new one.

> Keep the key private. Never paste it into code that you commit to GitHub, and never share it in screenshots.

---

## 2. Save the key as an environment variable

Do this once per terminal session so the key stays out of your code.

**Mac / Linux**
```bash
export GROQ_API_KEY="gsk_your_key_here"
```

**Windows (PowerShell)**
```powershell
$env:GROQ_API_KEY="gsk_your_key_here"
```

**Google Colab:** click the key icon in the left sidebar (Secrets), add `GROQ_API_KEY`, turn on notebook access, then in a cell:
```python
from google.colab import userdata
import os
os.environ["GROQ_API_KEY"] = userdata.get("GROQ_API_KEY")
```

---

## 3. Python

```bash
pip install groq
```

```python
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
```

Run it:
```bash
python hello.py
```

### Optional settings
```python
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[{"role": "user", "content": "Write a React button component."}],
    temperature=0.2,             # lower = more predictable
    max_completion_tokens=800,   # cap the answer length
    reasoning_effort="low",      # "low", "medium" or "high": faster vs deeper thinking
)
```

### Stream the answer as it is written
```python
stream = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[{"role": "user", "content": "Give me 3 tips for keyboard accessibility."}],
    stream=True,
)
for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")
```

---

## 4. Use it with the OpenAI SDK

Groq is OpenAI-compatible. Only the key and the base URL change.

```bash
pip install openai
```

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["GROQ_API_KEY"],
    base_url="https://api.groq.com/openai/v1",
)

r = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(r.choices[0].message.content)
```

---
