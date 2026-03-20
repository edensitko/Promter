"""
Promter Bot — Example implementation for EC2 or any server.

Uses the Promter skill to fetch prompt modules from promter.dev
and generate websites via Claude API.

Requirements:
    pip install anthropic requests

Usage:
    python bot-example.py "Build me a modern SaaS landing page with glassmorphism"
"""

import sys
import json
import requests
import anthropic
from pathlib import Path

# ─── Config ────────────────────────────────────────────────────────────────

API_BASE = "https://promter.dev/api"
SKILL_PATH = Path(__file__).parent / "promter-skill.md"
CACHE_DIR = Path(__file__).parent / ".cache"
MODEL = "claude-sonnet-4-20250514"


# ─── Fetch & Cache ─────────────────────────────────────────────────────────

def fetch_prompts(force_refresh=False):
    """Fetch all prompt modules from Promter API with local caching."""
    cache_file = CACHE_DIR / "prompts.json"
    CACHE_DIR.mkdir(exist_ok=True)

    if not force_refresh and cache_file.exists():
        return json.loads(cache_file.read_text())

    print("Fetching prompts from promter.dev...")
    data = requests.get(f"{API_BASE}/prompts.json").json()
    cache_file.write_text(json.dumps(data))
    return data


def fetch_presets(force_refresh=False):
    """Fetch all preset configs from Promter API with local caching."""
    cache_file = CACHE_DIR / "presets.json"
    CACHE_DIR.mkdir(exist_ok=True)

    if not force_refresh and cache_file.exists():
        return json.loads(cache_file.read_text())

    print("Fetching presets from promter.dev...")
    data = requests.get(f"{API_BASE}/presets.json").json()
    cache_file.write_text(json.dumps(data))
    return data


def load_skill():
    """Load the Promter skill file."""
    return SKILL_PATH.read_text()


# ─── Module Selection ──────────────────────────────────────────────────────

def pick_modules(user_request, prompts_data):
    """
    Use Claude to pick the right prompt modules based on user request.
    Returns a list of prompt paths.
    """
    available = list(prompts_data["prompts"].keys())

    client = anthropic.Anthropic()
    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": f"""Given this user request: "{user_request}"

Pick the best prompt modules from this list to generate their website.
Pick exactly: 1 UI style, 1 layout, 1-3 animations, and optionally 1 3D effect.

Available modules:
{json.dumps(available, indent=2)}

Respond with ONLY a JSON array of the selected paths, nothing else.
Example: ["ui/modern-ui.md", "layouts/landing-layout.md", "animations/scroll-animations.md"]"""
        }]
    )

    text = response.content[0].text.strip()
    # Extract JSON array from response
    start = text.index("[")
    end = text.rindex("]") + 1
    return json.loads(text[start:end])


# ─── Generate ──────────────────────────────────────────────────────────────

def generate_website(user_request, output_dir="./generated"):
    """Main function: fetch prompts, pick modules, generate website."""

    # 1. Load data
    skill = load_skill()
    prompts_data = fetch_prompts()

    # 2. Pick the right modules
    print(f"\nRequest: {user_request}")
    print("Selecting prompt modules...")
    selected_paths = pick_modules(user_request, prompts_data)
    print(f"Selected: {', '.join(selected_paths)}")

    # 3. Combine selected prompts
    combined_prompt = ""
    for path in selected_paths:
        content = prompts_data["prompts"].get(path, "")
        if content:
            combined_prompt += f"\n\n{'='*60}\n# Module: {path}\n{'='*60}\n\n{content}"

    # 4. Generate with Claude
    print("Generating website...")
    client = anthropic.Anthropic()
    response = client.messages.create(
        model=MODEL,
        max_tokens=16000,
        system=skill,
        messages=[{
            "role": "user",
            "content": f"""Generate a complete website based on this request: "{user_request}"

Use the following prompt modules as your design system and instructions:

{combined_prompt}

Generate the complete code for all files needed. Output each file with its path like:

```filepath: src/app/page.tsx
// code here
```

Make sure the website is complete, responsive, and follows all the module instructions."""
        }]
    )

    result = response.content[0].text

    # 5. Save output
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    output_file = output_path / "generated-website.md"
    output_file.write_text(result)
    print(f"\nDone! Output saved to: {output_file}")
    print(f"Tokens used: {response.usage.input_tokens + response.usage.output_tokens}")

    return result


# ─── CLI ───────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python bot-example.py \"Build me a modern landing page\"")
        sys.exit(1)

    request = " ".join(sys.argv[1:])
    generate_website(request)
