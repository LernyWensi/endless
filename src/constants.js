const gifs = {
  CLOUDS: "assets/gifs/clouds.gif",
};

const backgrounds = {
  VILLAGE: "assets/backgrounds/village.png",
  TREE: "assets/backgrounds/tree.png",
};

const promptCursors = {
  1: "$",
  2: ">>",
  3: ">",
  4: "<>",
  5: "▶",
};

const lsKeys = {
  BACKGROUND: "endless-installed-background",
  GIF: "endless-installed-gif",
  PROMPT_PLACEHOLDER: "endless-installed-quote",
  PROMPT_CURSOR: "endless-installed-prompt-cursor",
  QUOTE: "endless-installed-quote",
  BOOKMARKS: "endless-saved-bookmarks",
  USER_BACKGROUNDS: "endless-saved-user-backgrounds",
};

const helpText = {
  CREATE_LINK: {
    usage: "cl {category} {name} {url}",
    flags: {},
  },

  BOOKMARKS: {
    usage: "bm [{category}]",
    flags: {},
  },

  CLEAR_CONSOLE: {
    usage: "cc",
    flags: {},
  },

  SET_QUOTE: {
    usage: "sq {quote}",
    flags: {},
  },

  HELP: {
    usage: "h",
    flags: {
      "-cl": "to print command list",
      "-a": "to print command list",
      "-b": "to print command list",
      "-c": "to print command list",
    },
  },

  OPEN_LINK: {
    usage: "ol {link}",
    flags: {},
  },

  REMOVE_LINK: {
    usage: "rl {link}",
    flags: {},
  },

  REMOVE_CATEGORY: {
    usage: "rc {category}",
    flags: {},
  },

  EDIT_LINK: {
    usage: "el {link} {new value}",
    flags: {},
  },

  EDIT_CATEGORY: {
    usage: "ec {category} {new value}",
    flags: {},
  },
};

const helpGeneral = [
  `All commands go like:
    > first letter of first word + first letter of second word
    > if there is only one word => only one letter
    > use quotes when you need combine
      words to one string
  `,

  `Examples:
    > [c]reate [l]ink: 
          cl - usage: ${helpText.CREATE_LINK.usage}

    > [h]elp: 
          h - usage: ${helpText.HELP.usage}

    > [s]et [q]uote:
          sq - usage: ${helpText.SET_QUOTE.usage}
  `,

  `Enter 'h -cl' for command list`,
];
