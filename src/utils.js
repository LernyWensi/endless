function isObject(item) {
  return typeof item === "object" && !Array.isArray(item) && item !== null;
}

function isEmptyObject(object) {
  return Object.keys(object).length === 0;
}

function lowerCaseCompare(firstString, secondString) {
  return firstString.toLowerCase() === secondString.toLowerCase();
}

function isEmptyCall(parameters, flags) {
  if (parameters.length === 0 && flags.length === 0) {
    return false;
  }

  return true;
}

function checkCommand(
  command,
  flagsToCheck,
  parameters,
  minParametersLength,
  maxParametersLength = minParametersLength,
  checkIsEmptyCall
) {
  if (checkIsEmptyCall && !isEmptyCall(parameters, flagsToCheck)) {
    outputLine("provide parameters of flags", "error");
    return;
  }

  let falseCounter = 0;

  if (parameters.length < minParametersLength) {
    outputLine(
      `command requires minimum ${minParametersLength} parameters`,
      "error"
    );
    falseCounter++;
  } else if (parameters.length > maxParametersLength) {
    outputLine(
      `maximum number of parameters for this command ${maxParametersLength}`,
      "error"
    );
    falseCounter++;
  }

  if (!checkCommandFlags(command, flagsToCheck)) {
    const commandHelpFlags = COMMANDS[command].help.flags;

    if (Array.isArray(commandHelpFlags)) {
      outputLine("invalid flags", "error");
      outputLine("flags for this command:", "secondary");

      commandHelpFlags.forEach(([flag, description]) => {
        outputLine(
          `${coloredSpan(flag, "primary")}: ${description}`,
          "padding-left"
        );
      });
    } else {
      outputLine(commandHelpFlags, "secondary");
    }

    falseCounter++;
  }

  return falseCounter > 0 ? false : true;
}

function checkCommandFlags(command, flagsToCheck) {
  if (flagsToCheck.length === 0) return true;

  if (COMMANDS[command].flags === null) return false;

  return flagsToCheck.every((flag) => COMMANDS[command].flags.includes(flag));
}

// check if current item is part of a search query string
function isInSearchQuery(userInput, currentItemIndex)
{
  // if the first item starts with '"' AND any other item (including the first) ends with '"'
  // (i.e. if there is a search query string in userInput)
  // THEN check if the current item is part that search query
  let isInSearchQuery = false;
  if (userInput[0][0] === "\"") {
    userInput.forEach( function(item, index) {
      if (item[item.length - 1] === "\"") {
        if (currentItemIndex <= index)
          isInSearchQuery = true;
      }
    });
  }
  return isInSearchQuery;
}

function parseUserInputToCommand(userInput) {
  const re = /"([^"]+)"|([^\s]+)/g;

  userInput = userInput.trim().replace(/\s +/g, " ");

  userInput = userInput.split(" ");

  const command = userInput.shift();

  // if using the search command, don't add item as a flag if it starts with a '-'
  // and is part of a search query string
  const flags = userInput.filter((item, index) => 
    command === "s" 
    ? item.length > 1 && item[0] === "-" && !isInSearchQuery(userInput, index)
    : item.length > 1 && item[0] === "-"
    );

  const parameters = [];

  let noFlagsCommand = userInput
    .filter((item) => !flags.includes(item))
    .join(" ");

  let tmp;
  while ((tmp = re.exec(noFlagsCommand)) !== null) {
    const value = tmp[1] || tmp[2];
    parameters.push(value);
  }

  return {
    command: command,
    parameters: parameters,
    flags: flags,
  };
}

function $(selector, returnArray = false) {
  const nodes = document.querySelectorAll(selector);

  if (nodes.length > 1 || returnArray) {
    return nodes;
  }

  return nodes[0];
}

function elementFromHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();

  if (template.content.children.length > 1) {
    return template.content.children;
  }

  return template.content.children[0];
}

function elementWithClass(type, className) {
  const element = document.createElement(type);
  element.className = className;

  return element;
}

function replaceInput(input, className) {
  const p = elementFromHTML(
    `<p class=${className}-replaced-input>${input.value}</p>`
  );
  input.replaceWith(p);
}

function createPrompt() {
  const terminal = $("#window-terminal");

  const prompt = elementFromHTML(
    `<div class="prompt">
            <p class="prompt-cursor">${userName}@World:~$&nbsp;</p>
            <input type="text" id="prompt-input"/>
        </div>`
  );

  promptAnimationState && prompt.classList.add("prompt-animated");

  prompt.addEventListener("keydown", handlePromptKeyPresses);

  terminal.appendChild(prompt);
}

function replacePrompt() {
  replaceInput($("#prompt-input"), "prompt");
  createPrompt();
  focusPrompt();
}

function focusPrompt() {
  const prompt = $("#prompt-input");
  prompt.focus();
}

function handlePromptKeyPresses(event) {
  switch (event.key) {
    case "Enter":
      event.preventDefault();

      const userInput = $("#prompt-input").value;

      commandHistory.unshift(userInput);
      commandHistoryCursor = -1;

      runCommand(userInput);
      break;

    case "ArrowUp":
      event.preventDefault();
      scrollCommandUp();
      break;

    case "ArrowDown":
      event.preventDefault();
      scrollCommandDown();
      break;
  }
}

function scrollCommandUp() {
  if (commandHistoryCursor < commandHistory.length - 1) {
    commandHistoryCursor++;
  }

  changeCommandInPrompt();
}

function scrollCommandDown() {
  if (commandHistoryCursor > -1) {
    commandHistoryCursor--;
  }

  changeCommandInPrompt();
}

function changeCommandInPrompt() {
  const promptInput = $("#prompt-input");

  if (commandHistoryCursor < 0) {
    promptInput.value = "";
  } else {
    promptInput.value = commandHistory[commandHistoryCursor];
  }
}

function coloredSpan(text, color) {
  return `<span class="${color}">${text}</span>`;
}

function outputCommandHelpText(command) {
  Object.entries(command).forEach(([helpType, helpText]) => {
    if (typeof helpText === "string") {
      outputLine(`${coloredSpan(helpType, "primary")}: ${helpText}`);
    } else {
      outputLine(`${coloredSpan(helpType, "primary")}:`);

      if (Array.isArray(helpText[0])) {
        helpText.forEach(([value, description]) => {
          outputLine(
            `${coloredSpan(value, "additional")}: ${description}`,
            "padding-left"
          );
        });
      } else {
        outputMultipleLines(helpText, "padding-left");
      }
    }
  });
}
