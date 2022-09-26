// Defined commands
const COMMANDS = {
  h: {
    func: output(h),
    help: helpText.HELP,
    flags: Object.keys(helpText.HELP.flags),
  },

  cc: {
    func: output(cc),
    help: helpText.CLEAR_CONSOLE,
    flags: Object.keys(helpText.CLEAR_CONSOLE.flags),
  },

  cl: {
    func: output(cl),
    help: helpText.CREATE_LINK,
    flags: Object.keys(helpText.CREATE_LINK.flags),
  },

  rl: {
    func: output(rl),
    help: helpText.REMOVE_LINK,
    flags: Object.keys(helpText.REMOVE_LINK.flags),
  },

  el: {
    func: output(el),
    help: helpText.EDIT_LINK,
    flags: Object.keys(helpText.EDIT_LINK.flags),
  },

  ol: {
    func: output(ol),
    help: helpText.OPEN_LINK,
    flags: Object.keys(helpText.OPEN_LINK.flags),
  },

  rc: {
    func: output(rc),
    help: helpText.REMOVE_CATEGORY,
    flags: Object.keys(helpText.REMOVE_CATEGORY.flags),
  },

  ec: {
    func: output(ec),
    help: helpText.EDIT_CATEGORY,
    flags: Object.keys(helpText.EDIT_CATEGORY.flags),
  },

  bm: {
    func: output(bm),
    help: helpText.BOOKMARKS,
    flags: Object.keys(helpText.BOOKMARKS.flags),
  },

  sq: {
    func: output(sq),
    help: helpText.SET_QUOTE,
    flags: Object.keys(helpText.SET_QUOTE.flags),
  },
};

// IIFE for setup
(() => {
  // Read saved values from localStorage
  lsReadBackground() && (background = lsReadBackground());
  lsReadGif() && (gif = lsReadGif());
  lsReadPromptCursor() && (promptCursor = lsReadPromptCursor());
  lsReadQuote() && (quote = lsReadQuote());
  lsReadBookmarks() && (bookmarks = lsReadBookmarks());

  // Set saved values
  setBackground();
  setGif();
  setPromptCursor();
  setQuote();

  // Create initial prompt
  outputText(greetingsText);
  bookmarks.length && outputBookmarks(bookmarks);
  writePrompt();
  focusPrompt();

  document.addEventListener("keypress", handleKeyPresses);
})();

function handleKeyPresses(event) {
  switch (event.key) {
    case "Enter":
      const promptInput = document.getElementById("prompt-input");
      runCommand(promptInput.value);
      break;
  }
}

function runCommand(input) {
  // After parsing fullCommand will be {command, attributes, flags}
  fullCommand = parseFullCommand(input);
  const commandToExecute = COMMANDS[fullCommand.command];

  let response;

  if (commandToExecute) {
    response = commandToExecute.func(fullCommand);
  } else {
    response = outputList(["no such command ＞﹏＜", "try 'h' or 'h -cl'"]);
  }

  if (response !== COMMANDS.cc) {
    replacePrompt();
  }

  focusPrompt();
}
