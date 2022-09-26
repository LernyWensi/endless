function outputText(output) {
  const terminal = document.getElementById("terminal");
  const terminalOutput = document.createElement("div");

  terminalOutput.classList.add("terminal-output");
  terminalOutput.innerHTML = `
    <div class="output-text">
      <p class="output-symbol">></p>
      <pre><p class="text">${output}</p></pre>
    </div>
  `;

  terminal.appendChild(terminalOutput);
}

function outputList(output) {
  const terminal = document.getElementById("terminal");
  const terminalOutput = document.createElement("div");

  terminalOutput.classList.add("terminal-output");
  terminalOutput.innerHTML = `
    <ul class="output-list">
      ${output
        .map((item) => {
          return `
          <li class="list-item">
            <pre><p class="text">${item}</p></pre>
          </li>
        `;
        })
        .join("")}
    </ul>
  `;

  terminal.appendChild(terminalOutput);
}

function outputHelp(output) {
  const terminal = document.getElementById("terminal");
  const terminalOutput = document.createElement("div");

  const flagList = `
    <ul class="flag-list">
    ${Object.entries(output.flags)
      .map(([key, value]) => {
        return `
          <li class="help-flag">
            <p class="text">${key}: ${value}</p>
          </li>
          `;
      })
      .join("")}
  </ul>
  `;

  terminalOutput.classList.add("terminal-output");
  terminalOutput.innerHTML = `
    <div class="output-help">
      <p class="output-symbol">></p>

      <div class="help-wrapper">
        <p class="text">usage: ${output.usage}</p>

        <div class="help-flags">
          <p class="text">flags: ${
            isObjectEmpty(output.flags) ? "this command has no flags!" : ""
          }</p>

          ${!isObjectEmpty(output.flags) ? flagList : ""}
        </div>
      </div>
    </div>
  `;

  terminal.appendChild(terminalOutput);
}

function outputBookmarks(output) {
  const terminal = document.getElementById("terminal");
  const terminalOutput = document.createElement("div");

  terminalOutput.classList.add("terminal-output");
  terminalOutput.innerHTML = `
    <ul class="output-bookmarks">
      ${output
        .map(({ category, links }) => {
          return `
          <div class="bookmarks-category">
            <p class="category-title">${category}</p>
            
            <ul class="category-links">
              ${links
                .map(({ name, url }) => {
                  return `
                    <li class="links-item">
                      <a class="item-link" href=${url}>${name}</a>
                    </li>
                  `;
                })
                .join("")}
            </ul>
          </div>
        `;
        })
        .join("")}
    </ul>
  `;

  terminal.appendChild(terminalOutput);
}
