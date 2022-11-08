const backgrounds = {
    VILLAGE: "assets/backgrounds/village.png",
    TREE: "assets/backgrounds/tree.png",
    FOREST: "assets/backgrounds/forest.jpg",
};

const gifs = {
    CLOUDS: "assets/gifs/clouds.gif",
};

const lsKeys = {
    BOOKMARKS: "endless-saved-bookmarks",
    USER_NAME: "endless-installed-user-name",
    BACKGROUND: "endless-installed-background",
    USER_BACKGROUNDS: "endless-saved-user-backgrounds",
    GIF: "endless-installed-gif",
    USER_GIFS: "endless-saved-user-gifs",
    QUOTE: "endless-installed-quote",
    GREETING_MESSAGE: "endless-installed-greeting-message",
    LINE_ANIMATION_STATE: "endless-saved-line-animation-state",
    PROMPT_ANIMATION_STATE: "endless-saved-prompt-animation-state",
    OPEN_LINK_DEFAULT_TARGET: "endless-saved-open-link-default-target",
    BOOKMARKS_DEFAULT_TARGET: "endless-saved-bookmarks-default-target",
};

const help = {
    CLEAR_TERMINAL: {
        usage: "ct",
        description: "use to clear terminal",
        parameters: "command doesn't have parameters",
        flags: "command doesn't have flags",
    },

    HELP: {
        usage: "h [command]",
        description: "use to get help",
        parameters: [["command", "command to output help for"]],
        flags: "command doesn't have flags",
    },

    SEARCH: {
        usage: 's "(query)"',
        description: "use to search something",
        parameters: "command doesn't have parameters",
        flags: "command doesn't have flags",
    },

    CREATE_LINK: {
        usage: "cl (category name) (link name) (link url)",
        description: [
            "use to create link in specific category",
            "if category doesn't exists, command will create this category",
        ],
        parameters: [
            ["category name", "name of category to put link in"],
            ["link name", "name for new link"],
            ["link url", "url for new link"],
        ],
        flags: "command doesn't have flags",
    },

    EDIT_LINK: {
        usage: "el (link name) (parameter to edit) (new value)",
        description: "use to edit link",
        parameters: [
            ["link name", "name of link to edit"],
            ["parameter to edit", "parameter of link to edit: 'name', 'url'"],
            ["new value", "new value for selected parameter"],
        ],
        flags: "command doesn't have flags",
    },

    DELETE_LINK: {
        usage: "dl (link name)",
        description: "use to delete link",
        parameters: [["link name", "name of link to delete"]],
        flags: "command doesn't have flags",
    },

    OPEN_LINK: {
        usage: "ol [link name]",
        description: "use to open link",
        parameters: [["link name", "name of link to open"]],
        flags: [
            ["-nt", "open link in new tab"],
            ["-tdt", "toggle default target for opening links"],
            ["-cs", "output current default location target"],
        ],
    },

    CREATE_CATEGORY: {
        usage: "cc (category name)",
        description: "use to create category",
        parameters: [["category name", "name for new category"]],
        flags: "command doesn't have flags",
    },

    CHANGE_CATEGORY_NAME: {
        usage: "ccn (current name) (new name)",
        description: "use to change name of category",
        parameters: [
            ["current name", "name of category to change"],
            ["new name", "new name for selected category"],
        ],
        flags: "command doesn't have flags",
    },

    DELETE_CATEGORY: {
        usage: "dc (category name)",
        description: "use to delete category",
        parameters: [["category name", "name of category to delete"]],
        flags: "command doesn't have flags",
    },

    BOOKMARKS: {
        usage: "b ['all'] | [category name]",
        description: "use to output your bookmarks",
        parameters: [
            ["category name", "name of category to output"],
            ["'all'", "output all bookmarks"],
        ],
        flags: [
            ["-tdt", "toggle default target for opening links"],
            ["-cs", "output current default target"],
        ],
    },

    SET_USER_NAME: {
        usage: "sun (user name)",
        description: "use to set user name",
        parameters: [["use name", "new user name"]],
        flags: "command doesn't have flags",
    },

    SET_BACKGROUND: {
        usage: "sb [background name] | [('link') (background link)]",
        description: "use to set page background",
        parameters: [
            ["background name", "name of background to apply"],
            ["'link'", "filler for name when using (background link)"],
            ["background link", "link to background"],
        ],
        flags: [["-ab", "output list of available backgrounds"]],
    },

    SAVE_USER_BACKGROUND: {
        usage: "sub (background name) (background link)",
        description: "use to save link to background",
        parameters: [
            ["background name", "name for new background"],
            ["background link", "link to background"],
        ],
        flags: "command doesn't have flags",
    },

    DELETE_USER_BACKGROUND: {
        usage: "dub (background name)",
        description: "use to delete user background",
        parameters: [["background name", "name of background to delete"]],
        flags: "command doesn't have flags",
    },

    SET_GIF: {
        usage: "sg [gif name] | [('link') (gif link)]",
        description: "use to set window gif",
        parameters: [
            ["gif name", "name of gif to apply"],
            ["'link'", "filler for name when using (gif link)"],
            ["gif link", "link to gif"],
        ],
        flags: [["-ag", "output list of available gifs"]],
    },

    SAVE_USER_GIF: {
        usage: "sug (gif name) (gif link)",
        description: "use to save link to gif",
        parameters: [
            ["gif name", "name for new gif"],
            ["gif link", "link to gif"],
        ],
        flags: "command doesn't have flags",
    },

    DELETE_USER_GIF: {
        usage: "dug (gif name)",
        description: "use to delete user gif",
        parameters: [["gif name", "name of gif to delete"]],
        flags: "command doesn't have flags",
    },

    SET_QUOTE: {
        usage: 'sq "(quote)"',
        description: "use to set quote",
        parameters: [["quote", "new quote"]],
        flags: "command doesn't have flags",
    },

    SET_GREETING_MESSAGE: {
        usage: 'sgm "(greeting message)"',
        description: "use to set greeting message",
        parameters: [["greeting message", "new greeting message"]],
        flags: "command doesn't have flags",
    },

    TOGGLE_ANIMATIONS: {
        usage: "ta ['line'] | ['prompt']",
        description: "use to toggle line animation",
        parameters: [
            ["'line'", "toggle animation for line"],
            ["'prompt'", "toggle animation for prompt"],
        ],
        flags: [["-csl", "output current states list"]],
    },
};
