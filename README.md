# YouTrack Branch Generator Extension

A Chrome extension that simplifies Git branch creation by generating branch names automatically based on YouTrack issue details. The extension can optionally use GPT-4 API to translate and format branch names into English for better readability.

---

## Features

- Automatically detects YouTrack issues on pages under _.youtrack.cloud/issue/_.
- Adds a button to the YouTrack issue page to copy the branch name.
- Two modes for branch name generation:
  1. **Local Mode**: Formats the branch name directly from the issue details.
  2. **GPT Mode**: Translates the issue title into English using the GPT API before formatting.
- Saves GPT token securely in Chrome's local storage.

---

## Installation

1. Clone the repository:
   REPLACE_ITbash
   git clone <repository-url>
   cd <repository-folder>
2. Open Chrome and navigate to chrome://extensions/.
3. Enable Developer mode in the top-right corner.
4. Click Load unpacked and select the project folder.

---

## Usage

1. Navigate to a YouTrack issue page (e.g., https://example.youtrack.cloud/issue/ISSUE-123).
2. A Copy branch name button will appear in the top-right corner of the page.
3. Click the button to copy the branch name to the clipboard.
4. Optionally, open the extension popup and save your GPT API token to enable branch name translation.

---

## Branch Naming Rules

### Local Mode

- Extracts the issue key and title from the URL.
- Converts the title to lowercase, replaces spaces with -, and removes invalid characters.
- Example:
  - URL: https://example.youtrack.cloud/issue/ISSUE-123/Task-title-here
  - Branch name: ISSUE-123_task-title-here

### GPT Mode

- Uses GPT API to translate the issue title into English and formats it.
- Limits the branch name length to 100 characters.
- Example:
  - URL: https://example.youtrack.cloud/issue/ISSUE-456/Nazvanie-zadachi-zdes
  - Translated: ISSUE-456_task-title-in-english

---

## Configuration

1. Open the extension popup from the Chrome toolbar.
2. Enter your GPT API token in the provided input field.
3. Click Save to store the token securely in Chrome's local storage.

---

## Development

1. Make changes to the codebase.
2. Reload the extension in chrome://extensions/ to apply updates.
3. Test on pages under _.youtrack.cloud/issue/_.

---

## Contribution

Feel free to submit issues or pull requests for bug fixes or new features.

---

## License

This project is licensed under the MIT License.
