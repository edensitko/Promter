# Promter Skills

Skill files for integrating Promter with AI bots and agents.

## Files

| File | Description |
|------|-------------|
| `promter-skill.md` | System prompt / skill file for any AI bot. Teaches the bot how to fetch prompts from promter.dev and generate websites. |
| `bot-example.py` | Ready-to-use Python bot example using Claude API. |

## Quick Start

```bash
pip install anthropic requests
export ANTHROPIC_API_KEY=your-key-here
python bot-example.py "Build me a modern SaaS landing page"
```

## Remote Skill Access

The skill file is also served at:

```
https://promter.dev/api/skill.md
```

Your bot can fetch it at startup:

```python
import requests
skill = requests.get("https://promter.dev/api/skill.md").text
```

## Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/prompts.json` | All prompt modules (50+) |
| `/api/presets.json` | All template configs (27) |
| `/api/skill.md` | Bot skill / system prompt |
