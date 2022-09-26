// Parse fullCommand and return {command, attributes, flags}
function parseFullCommand(fullCommand) {
  fullCommand = fullCommand.split(" ");
  const command = fullCommand.shift();
  const flags = fullCommand.filter(
    (item) => item.length > 1 && item[0] === "-"
  );
  const attributes = [];

  const regularExp = /"([^"]+)"|([^\s]+)/g;
  let input = fullCommand.filter((item) => !flags.includes(item)).join(" ");

  while ((temp = regularExp.exec(input)) !== null) {
    const val = temp[1] || temp[2]; // Get the correct capture group
    attributes.push(val);
  }

  return {
    command: command,
    flags: flags,
    attributes: attributes,
  };
}

// Checking length of command attributes
function checkAttributesLength(attributes, min, max = min) {
  if (min > max) return undefined;

  return attributes.length >= min && attributes.length <= max;
}

// Check if command has flags
function haveFlags(command, passedFlags) {
  return passedFlags.every((passedFlag) => {
    return COMMANDS[command].flags.some((flag) => flag === passedFlag);
  });
}

// Universal output function
function output(command) {
  return (fullCommand) => {
    const [outputFunction, output] = command(fullCommand);
    return outputFunction(output);
  };
}

function isObjectEmpty(object) {
  return !Object.keys(object).length;
}

function isValidURL(url) {
  var a = document.createElement("a");
  a.href = url;
  return a.host && a.host != window.location.host;
}

function writePrompt() {
  const terminal = document.getElementById("terminal");
  const prompt = document.createElement("div");

  prompt.classList.add("prompt");
  prompt.innerHTML = `
    <div class="prompt-title">
      <span class="prompt-symbol">~</span>
      <span class="prompt-cursor">${promptCursor}</span>
    </div>
    <input id="prompt-input" type="text"/>
  `;

  terminal.appendChild(prompt);
}

function focusPrompt() {
  const prompt = document.getElementById("prompt-input");
  prompt.focus();
}

// Replace the existing prompt with paragraph and create a new working prompt
function replacePrompt() {
  const promptInput = document.getElementById("prompt-input");
  const promptText = document.createElement("p");

  promptText.classList.add("prompt-text");
  promptText.textContent = promptInput.value;

  promptInput.replaceWith(promptText);

  writePrompt();
  focusPrompt();
}
