// Help
function h({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 0)) {
    return [outputHelp, COMMANDS.h.help];
  }
  if (!haveFlags("h", flags)) {
    return [outputHelp, COMMANDS.h.help];
  }

  if (flags.includes("-cl")) {
    const commandList = Object.entries(helpText).map(
      ([key, value]) =>
        `${key.toLowerCase().replace("_", " ")}:<br>  usage: ${value.usage}`
    );

    return [outputList, commandList];
  }

  return [outputList, helpGeneral];
}

// Clear console
function cc({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 0)) {
    return [outputHelp, COMMANDS.cc.help];
  }
  if (!haveFlags("cc", flags)) {
    return [outputHelp, COMMANDS.cc.help];
  }

  const terminal = document.getElementById("terminal");

  while (terminal.firstChild) {
    terminal.removeChild(terminal.lastChild);
  }

  writePrompt();

  return [(func) => func, COMMANDS.cc];
}

// Create link
function cl({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 3)) {
    return [outputHelp, COMMANDS.cl.help];
  }
  if (!haveFlags("cl", flags)) {
    return [outputHelp, COMMANDS.cl.help];
  }

  const [category, name, url] = attributes;

  if (!isValidURL(url)) {
    return [outputText, "url is not valid! ＞﹏＜"];
  }

  const targetCategory = bookmarks.find((item) => item.category === category);
  const targetCategoryIndex = bookmarks.indexOf(targetCategory);

  if (targetCategory) {
    if (targetCategory.links.find((item) => item.name === name)) {
      return [outputText, "such link already exists!"];
    }

    bookmarks[targetCategoryIndex].links.push({
      name: name,
      url: url,
    });
  } else {
    bookmarks.push({
      category: category,
      links: [{ name: name, url: url }],
    });
  }

  lsWriteBookmarks();

  return [
    outputList,
    [`{${name}} added to {${category}} \\^o^/`, `url = ${url}`],
  ];
}

// Remove link
function rl({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 1)) {
    return [outputHelp, COMMANDS.rl.help];
  }
  if (!haveFlags("rl", flags)) {
    return [outputHelp, COMMANDS.rl.help];
  }

  const [target] = attributes;
  const category = bookmarks.find((category) =>
    category.links.some((link) => link.name == target)
  );

  if (!category) {
    return [outputText, "there is no such link ＞﹏＜"];
  }

  const linkToDelete = category.links.find((link) => link.name === target);
  category.links = category.links.filter((link) => link !== linkToDelete);

  lsWriteBookmarks();

  return [
    outputList,
    [
      `{${linkToDelete.name}} deleted from ${category.category}`,
      `url was = ${linkToDelete.url}`,
    ],
  ];
}

// Edit link
function el({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 2)) {
    return [outputHelp, COMMANDS.el.help];
  }
  if (!haveFlags("el", flags)) {
    return [outputHelp, COMMANDS.el.help];
  }

  const [name, newValue] = attributes;

  let category = bookmarks.find((category) =>
    category.links.some((link) => link.name == name)
  );

  if (!category) {
    return [outputText, "there is no such link ＞﹏＜"];
  }

  const linkToEdit = category.links.find((link) => link.name === name);

  let oldValue;
  let valueToChange;

  if (isValidURL(newValue)) {
    valueToChange = "url";
    oldValue = linkToEdit.url;

    linkToEdit.url = newValue;
  } else {
    valueToChange = "name";
    oldValue = linkToEdit.name;

    linkToEdit.name = newValue;
  }

  lsWriteBookmarks();

  return [
    outputList,
    [
      `{${name}} {${valueToChange}} will be changed`,
      `{${oldValue}} changed to {${newValue}}`,
    ],
  ];
}

// Open link
function ol({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 1)) {
    return [outputHelp, COMMANDS.ol.help];
  }
  if (!haveFlags("ol", flags)) {
    return [outputHelp, COMMANDS.ol.help];
  }

  const links = bookmarks.flatMap((category) => category.links);
  const target = links.find((link) => link.name === attributes[0]);

  if (!target) {
    return [outputText, "there is no such link ＞﹏＜"];
  }

  window.open(target.url, "_blank");

  return [
    outputList,
    [`{${target.name}} opened in new tab`, `url = ${target.url}`],
  ];
}

// Remove category
function rc({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 1)) {
    return [outputHelp, COMMANDS.rc.help];
  }
  if (!haveFlags("rc", flags)) {
    return [outputHelp, COMMANDS.rc.help];
  }

  let [target] = attributes;
  const category = bookmarks.find((item) => item.category === target);

  if (!category) {
    return [outputText, "there is no such category ＞﹏＜"];
  }

  const links = category.links;
  bookmarks = bookmarks.filter((item) => item !== category);

  lsWriteBookmarks();

  return [
    outputList,
    [
      `{${category.category}} deleted`,
      `links were:${
        links.length
          ? links
              .map(
                (link) =>
                  `<pre>   > ${link.name}<br>     url = ${link.url}</pre>`
              )
              .join("")
          : " no links"
      }`,
    ],
  ];
}

// Edit category
function ec({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 2)) {
    return [outputHelp, COMMANDS.ec.help];
  }
  if (!haveFlags("ec", flags)) {
    return [outputHelp, COMMANDS.ec.help];
  }

  const [oldName, newName] = attributes;
  let category = bookmarks.find((category) => category.category === oldName);

  if (!category) {
    return [outputText, "there is no such category ＞﹏＜"];
  }

  bookmarks[bookmarks.indexOf(category)].category = newName;

  lsWriteBookmarks();

  return [outputText, `{${oldName}} changed to {${newName}}`];
}

// Output list of bookmarks or bookmarks category
function bm({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 0, 1)) {
    return [outputHelp, COMMANDS.bm.help];
  }
  if (!haveFlags("bm", flags)) {
    return [outputHelp, COMMANDS.bm.help];
  }

  if (!bookmarks.length) {
    return [outputText, "you have no bookmarks ¯\\_(ツ)_/¯"];
  }

  const [target] = attributes;

  if (target) {
    return [
      outputBookmarks,
      bookmarks.filter((item) => item.category === target),
    ];
  }

  return [outputBookmarks, bookmarks];
}

// Set quote
function sq({ attributes, flags }) {
  if (!checkAttributesLength(attributes, 1)) {
    return [outputHelp, COMMANDS.sq.help];
  }
  if (!haveFlags("sq", flags)) {
    return [outputHelp, COMMANDS.sq.help];
  }

  const [newQuote] = attributes;

  setQuote(newQuote);

  lsWriteQuote();

  return [outputText, "Your quote successfully installed \\^o^/"];
}
