To set up the `GROQ_API_KEY` environment and Python Groq SDK in VS Code on Windows from the `use-groq.md` guide, open the integrated terminal in VS Code (`Ctrl + ~` or **Terminal > New Terminal**) and run the steps below. Because the snippet in the screenshot sets `$env:GROQ_API_KEY` in PowerShell, make sure your terminal is using PowerShell (or set it persistently in your Windows user environment so it works across sessions and scripts).

### 1. Set `GROQ_API_KEY` in VS Code (Windows)

**Option A: Session-only in PowerShell** (matches the `use-groq.md` snippet, resets when you close that PowerShell session):

```powershell
$env:GROQ_API_KEY="gsk_your_key_here"

```

**Option B: Persistent for your Windows user account** (recommended if you open new terminals or run scripts outside a single session):

```powershell
[Environment]::SetEnvironmentVariable("GROQ_API_KEY", "gsk_your_key_here", "User")

```

If you use Option B, restart VS Code (or open a fresh terminal) so newly spawned processes pick up the updated user environment variable.

*Verification:* Run `echo $env:GROQ_API_KEY` in PowerShell and confirm it prints your `gsk_...` key rather than being blank.

---

### 2. Install the Groq Python SDK

In your project directory (and virtual environment, if you use one), install the `groq` package:

```powershell
pip install groq

```

*Verification:* Run `python -c "import groq; print(groq.__version__)"` and confirm it prints a version number without a `ModuleNotFoundError`.

---

### 3. Create and Run `hello.py`

Create `hello.py` in your project folder with the script shown in `use-groq.md`:

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

Then run it from the VS Code terminal:

```powershell
python hello.py

```

*Verification:* The script exits with status `0` and prints a 3-sentence explanation of WCAG 2.1 AA to the terminal.