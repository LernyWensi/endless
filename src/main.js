const COMMANDS = {
    ct: {
        function: ct,
        help: help.CLEAR_TERMINAL,
        flags: null,
    },

    h: {
        function: h,
        help: help.HELP,
        flags: null,
    },

    s: {
        function: s,
        help: help.SEARCH,
        flags: null,
    },

    cl: {
        function: cl,
        help: help.CREATE_LINK,
        flags: null,
    },

    el: {
        function: el,
        help: help.EDIT_LINK,
        flags: null,
    },

    dl: {
        function: dl,
        help: help.DELETE_LINK,
        flags: null,
    },

    ol: {
        function: ol,
        help: help.OPEN_LINK,
        flags: ["-nt", "-tdt", "-cs"],
    },

    cc: {
        function: cc,
        help: help.CREATE_CATEGORY,
        flags: null,
    },

    ccn: {
        function: ccn,
        help: help.CHANGE_CATEGORY_NAME,
        flags: null,
    },

    dc: {
        function: dc,
        help: help.DELETE_CATEGORY,
        flags: null,
    },

    b: {
        function: b,
        help: help.BOOKMARKS,
        flags: ["-tdt", "-cs"],
    },

    sun: {
        function: sun,
        help: help.SET_USER_NAME,
        flags: null,
    },

    sb: {
        function: sb,
        help: help.SET_BACKGROUND,
        flags: ["-ab", "-s"],
    },

    sub: {
        function: sub,
        help: help.SAVE_USER_BACKGROUND,
        flags: null,
    },

    dub: {
        function: dub,
        help: help.DELETE_USER_BACKGROUND,
        flags: null,
    },

    sg: {
        function: sg,
        help: help.SET_GIF,
        flags: ["-ag"],
    },

    sug: {
        function: sug,
        help: help.SAVE_USER_GIF,
        flags: null,
    },

    dug: {
        function: dug,
        help: help.DELETE_USER_GIF,
        flags: null,
    },

    sq: {
        function: sq,
        help: help.SET_QUOTE,
        flags: null,
    },

    sgm: {
        function: sgm,
        help: help.SET_GREETING_MESSAGE,
        flags: null,
    },

    ta: {
        function: ta,
        help: help.TOGGLE_ANIMATIONS,
        flags: ["-csl"],
    },
};

(() => {
    lsReadBookmarks() !== null && (bookmarks = lsReadBookmarks());
    lsReadUserName() !== null && (userName = lsReadUserName());

    lsReadBackground() !== null && (background = lsReadBackground());
    lsReadUserBackgrounds() !== null &&
        (userBackgrounds = lsReadUserBackgrounds());

    lsReadGif() !== null && (gif = lsReadGif());
    lsReadUserGifs() !== null && (userGifs = lsReadUserGifs());

    lsReadQuote() !== null && (quote = lsReadQuote());
    lsReadGreetingMessage() !== null &&
        (greetingMessage = lsReadGreetingMessage());

    lsReadLineAnimationState() !== null &&
        (lineAnimationState = lsReadLineAnimationState());
    lsReadPromptAnimationState() !== null &&
        (promptAnimationState = lsReadPromptAnimationState());
    lsReadOpenLinkDefaultTarget() !== null &&
        (openLinkDefaultTarget = lsReadOpenLinkDefaultTarget());
    lsReadBookmarksDefaultTarget() !== null &&
        (bookmarksDefaultTarget = lsReadBookmarksDefaultTarget());

    setUserName(userName);
    setBackground(background);
    setGif(gif);
    setQuote(quote);
    setGreetingMessage(greetingMessage);
    setLineAnimationState(lineAnimationState);
    setPromptAnimationState(promptAnimationState);
    setOpenLinkDefaultTarget(openLinkDefaultTarget);
    setBookmarksDefaultTarget(bookmarksDefaultTarget);

    outputLine(greetingMessage);
    createPrompt();
    focusPrompt();
})();

async function runCommand(userInput) {
    const { command, parameters, flags } = parseUserInputToCommand(userInput);

    let response;
    if (COMMANDS[command]) {
        response = await COMMANDS[command].function(parameters, flags);
    } else {
        outputLine("such command doesn't exists", "error");
        outputLine(
            `try ${coloredSpan("'h -cl'", "secondary")} for command list`,
        );
    }

    if (response === false) {
        createPrompt();
    } else {
        replacePrompt();
    }

    focusPrompt();
}
