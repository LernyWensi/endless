function ct(parameters, flags) {
    if (!checkCommand("ct", flags, parameters, 0, 0, false)) return;
    $("#window-terminal").innerHTML = "";
    return false;
}

function h(parameters, flags) {
    if (!checkCommand("h", flags, parameters, 0, 1, false)) return;

    const [command] = parameters;

    if (command) {
        const targetCommand = COMMANDS[command] || null;

        if (targetCommand === null) {
            outputLine("such command doesn't exists", "error");
            return;
        }

        outputCommandHelpText(targetCommand.help);
        return;
    }

    outputLine("<br>");
    Object.entries(help).forEach(([key, value]) => {
        outputLine(
            key.replaceAll("_", " ").toLowerCase(),
            "secondary help-title",
        );
        outputCommandHelpText(value);
        outputLine("<br>");
    });
}

function s(parameters, flags) {
    if (!checkCommand("s", flags, parameters, 1, 1, false)) return;

    const [query] = parameters;

    window.open(`https://www.google.com/search?q=${query}`);
}

function cl(parameters, flags) {
    if (!checkCommand("cl", flags, parameters, 3, 3, false)) return;

    const [categoryName, linkName, linkUrl] = parameters;

    const targetCategory =
        bookmarks.find(({ name }) => lowerCaseCompare(name, categoryName)) ||
        null;

    if (targetCategory === null) {
        const newCategory = {
            name: categoryName,
            links: [
                {
                    name: linkName,
                    url: linkUrl,
                },
            ],
        };

        bookmarks.push(newCategory);
        lsWriteBookmarks();

        outputMultipleLines([
            `${coloredSpan(
                "created new category",
                "success",
            )}: ${categoryName}`,
            `${coloredSpan("created new link", "success")}:`,
        ]);
        outputMultipleLines(
            [
                `${coloredSpan("name", "primary")}: ${linkName}`,
                `${coloredSpan("url", "primary")}: ${linkUrl}`,
            ],
            "padding-left",
        );

        return;
    }

    const newLink =
        targetCategory.links.find(({ name }) =>
            lowerCaseCompare(name, linkName),
        ) || {};

    if (!isEmptyObject(newLink)) {
        outputLine("such link already exists", "error");
        return;
    }

    newLink.name = linkName;
    newLink.url = linkUrl;

    targetCategory.links.push(newLink);
    lsWriteBookmarks();

    outputLine(`${coloredSpan("created new link", "success")}:`);
    outputMultipleLines(
        [
            `${coloredSpan("name", "primary")}: ${linkName}`,
            `${coloredSpan("url", "primary")}: ${linkUrl}`,
        ],
        "padding-left",
    );
}

async function el(parameters, flags) {
    if (!checkCommand("el", flags, parameters, 3, 3, false)) return;

    const [linkName, parameterToEdit, newValue] = parameters;

    if (!(parameterToEdit === "name" || parameterToEdit === "url")) {
        outputLine(
            `second parameter should be ${coloredSpan(
                "'name'",
                "secondary",
            )} or ${coloredSpan("'url'", "secondary")}`,
            "error",
        );
        return;
    }

    const targetLinks = bookmarks
        .map((category) =>
            category.links.find(({ name }) => lowerCaseCompare(name, linkName)),
        )
        .filter(Boolean);

    let oldValue;
    switch (targetLinks.length) {
        case 0:
            outputLine("no such links", "error");
            return;

        case 1:
            oldValue = targetLinks[0][parameterToEdit];
            targetLinks[0][parameterToEdit] = newValue;
            break;

        default:
            outputMultipleLines([
                ["several links with such name found", "error"],
                "link from what category you want to edit?",
            ]);

            const options = bookmarks.filter((category) =>
                targetLinks.some((link) => category.links.includes(link)),
            );

            const targetCategory = await outputOptions(
                options.map((option) => ({
                    payload: option,
                    name: option.name,
                })),
            );

            const targetLink = targetCategory.links.find(({ name }) =>
                lowerCaseCompare(name, linkName),
            );

            oldValue = targetLink[parameterToEdit];
            targetLink[parameterToEdit] = newValue;
            break;
    }

    lsWriteBookmarks();

    outputMultipleLines(
        [
            `link ${coloredSpan(linkName, "secondary")} edited`,
            `parameter ${coloredSpan(parameterToEdit, "secondary")} changed`,
        ],
        "success",
    );
    outputMultipleLines(
        [
            `${coloredSpan("from", "primary")}: ${oldValue}`,
            `${coloredSpan("to", "primary")}: ${newValue}`,
        ],
        "padding-left",
    );
}

async function dl(parameters, flags) {
    if (!checkCommand("dl", flags, parameters, 1, 1, false)) return;

    const [linkName] = parameters;

    const targetLinks = bookmarks
        .map((category) =>
            category.links.find(({ name }) => lowerCaseCompare(name, linkName)),
        )
        .filter(Boolean);

    let targetCategory;
    switch (targetLinks.length) {
        case 0:
            outputLine("no such links", "error");
            return;

        case 1:
            targetCategory = bookmarks.find((category) =>
                category.links.includes(targetLinks[0]),
            );
            targetCategory.links = targetCategory.links.filter(
                (link) => link !== targetLinks[0],
            );
            break;

        default:
            outputMultipleLines([
                ["several links with such name found", "error"],
                "link from what category you want to delete?",
            ]);

            const options = bookmarks.filter((category) =>
                targetLinks.some((link) => category.links.includes(link)),
            );

            targetCategory = await outputOptions(
                options.map((option) => ({
                    payload: option,
                    name: option.name,
                })),
            );

            const targetLink = targetCategory.links.find(({ name }) =>
                lowerCaseCompare(name, linkName),
            );

            targetCategory.links = targetCategory.links.filter(
                (link) => link !== targetLink,
            );
            break;
    }

    lsWriteBookmarks();

    outputLine(
        `link ${coloredSpan(linkName, "secondary")} deleted from ${coloredSpan(
            targetCategory.name,
            "secondary",
        )}`,
        "success",
    );
}

async function ol(parameters, flags) {
    if (!checkCommand("ol", flags, parameters, 0, 1, true)) return;

    if (flags.includes("-tdt")) {
        setOpenLinkDefaultTarget(
            openLinkDefaultTarget === "_blank" ? "_self" : "_blank",
        );
        outputLine(
            `default target location changed to ${coloredSpan(
                openLinkDefaultTarget,
                "secondary",
            )}`,
            "success",
        );
    }

    if (flags.includes("-cs")) {
        outputLine(
            `current default target: ${coloredSpan(
                openLinkDefaultTarget,
                "secondary",
            )}`,
        );
    }

    const [linkName] = parameters;

    if (!linkName) return;

    const targetLinks = bookmarks
        .map((category) =>
            category.links.find(({ name }) => lowerCaseCompare(name, linkName)),
        )
        .filter(Boolean);

    let linkToOpen;
    switch (targetLinks.length) {
        case 0:
            outputLine("no such lins found", "error");
            return;
        case 1:
            linkToOpen = targetLinks[0];
            break;

        default:
            outputMultipleLines([
                ["several links with such name found", "error"],
                "link from what category you want to open?",
            ]);

            const options = bookmarks.filter((category) =>
                targetLinks.some((link) => category.links.includes(link)),
            );

            targetCategory = await outputOptions(
                options.map((option) => ({
                    payload: option,
                    name: option.name,
                })),
            );

            linkToOpen = targetCategory.links.find(({ name }) =>
                lowerCaseCompare(name, linkName),
            );
            break;
    }

    outputLine(`opening ${coloredSpan(linkToOpen.name, "secondary")}...`);
    setTimeout(() => {
        window.open(
            linkToOpen.url,
            flags.includes("-nt") ? "_blank" : openLinkDefaultTarget,
        );
    }, 1000);
}

function cc(parameters, flags) {
    if (!checkCommand("cc", flags, parameters, 1, 1, false)) return;

    const [newCategoryName] = parameters;

    const newCategory =
        bookmarks.find(({ name }) => lowerCaseCompare(name, newCategoryName)) ||
        {};

    if (!isEmptyObject(newCategory)) {
        outputLine("such category already exists", "error");
        return;
    }

    newCategory.name = newCategoryName;
    newCategory.links = [];

    bookmarks.push(newCategory);
    lsWriteBookmarks();

    outputLine(
        `created new category: ${coloredSpan(newCategoryName, "secondary")}`,
        "success",
    );
}

function ccn(parameters, flags) {
    if (!checkCommand("ccn", flags, parameters, 2, 2, false)) return;

    const [currentName, newName] = parameters;

    const targetCategory =
        bookmarks.find(({ name }) => lowerCaseCompare(name, currentName)) ||
        null;

    if (targetCategory === null) {
        outputLine("such category doesn't exists", "error");
        return;
    }

    if (bookmarks.find(({ name }) => lowerCaseCompare(name, newName))) {
        outputLine("category with new name already exists", "error");
        return;
    }

    targetCategory.name = newName;
    lsWriteBookmarks();

    outputLine(
        `category ${coloredSpan(
            currentName,
            " secondary",
        )} changed to ${coloredSpan(newName, "secondary")}`,
        "success",
    );
}

function dc(parameters, flags) {
    if (!checkCommand("dc", flags, parameters, 1, 1, false)) return;

    const [categoryName] = parameters;

    const targetCategory =
        bookmarks.find(({ name }) => lowerCaseCompare(name, categoryName)) ||
        null;

    if (targetCategory === null) {
        outputLine("such category doesn't exists", "error");
        return;
    }

    bookmarks = bookmarks.filter(
        ({ name }) => !lowerCaseCompare(name, categoryName),
    );
    lsWriteBookmarks();

    outputLine(
        `category ${coloredSpan(categoryName, "secondary")} deleted`,
        "success",
    );
}

function b(parameters, flags) {
    if (!checkCommand("b", flags, parameters, 0, 1, true)) return;

    const [categoryName] = parameters;

    if (flags.includes("-tdt")) {
        setBookmarksDefaultTarget(
            bookmarksDefaultTarget === "_blank" ? "_self" : "_blank",
        );
        outputLine(
            `default target location changed to ${coloredSpan(
                bookmarksDefaultTarget,
                "secondary",
            )}`,
            "success",
        );
    }

    if (flags.includes("-cs")) {
        outputLine(
            `current default target: ${coloredSpan(
                bookmarksDefaultTarget,
                "secondary",
            )}`,
        );
    }

    if (!categoryName) return;

    if (bookmarks.length === 0) {
        outputLine("you have no bookmarks", "error");
        return;
    }

    if (categoryName === "all") {
        outputBookmarks(bookmarks);
        return;
    }

    const targetCategory = bookmarks.filter(({ name }) =>
        lowerCaseCompare(name, categoryName),
    );

    if (targetCategory.length === 0) {
        outputLine("such category doesn't exists", "error");
        return;
    }

    outputBookmarks(targetCategory);
}

function sun(parameters, flags) {
    if (!checkCommand("sun", flags, parameters, 1, 1, false)) return;

    const [newUserName] = parameters;

    outputLine(
        `user name ${coloredSpan(
            userName,
            "secondary",
        )} changed to ${coloredSpan(newUserName, "secondary")}`,
        "success",
    );
    setUserName(newUserName);
}

function sb(parameters, flags) {
    if (!checkCommand("sb", flags, parameters, 0, 2, true)) return;

    const [backgroundName, backgroundLink] = parameters;

    if (flags.includes("-ab")) {
        outputLine("defaults:");
        Object.keys(backgrounds).forEach((background) =>
            outputLine(background.toLowerCase(), "padding-left secondary"),
        );

        if (isEmptyObject(userBackgrounds)) {
            outputLine(
                `user backgrounds: ${coloredSpan("empty", "secondary")}`,
            );
        } else {
            outputLine("user backgrounds:");
            Object.keys(userBackgrounds).forEach((background) =>
                outputLine(background, "padding-left secondary"),
            );
        }
    }

    if (backgroundName !== "link" && backgroundName && backgroundLink) {
        outputLine(
            `you have to provide ${coloredSpan(
                "name",
                "secondary",
            )} or ${coloredSpan("'link' url", "secondary")}`,
            "error",
        );
        return;
    }

    if (backgroundName === "link") {
        setBackground(backgroundLink);
        outputLine("new background applied", "success");
        return;
    }

    if (backgroundName) {
        const targetBackground =
            Object.keys(userBackgrounds).find((background) =>
                lowerCaseCompare(background, backgroundName),
            ) ||
            Object.keys(backgrounds).find((background) =>
                lowerCaseCompare(background, backgroundName),
            ) ||
            null;

        if (targetBackground === null) {
            outputLine("backgrounds with such name doesn't exists", "error");
            return;
        }

        setBackground(
            backgrounds[targetBackground] || userBackgrounds[targetBackground],
        );

        outputLine(
            `background ${coloredSpan(backgroundName, "secondary")} applied`,
            "success",
        );
    }
}

function sub(parameters, flags) {
    if (!checkCommand("sub", flags, parameters, 2, 2, false)) return;

    const [backgroundName, backgroundLink] = parameters;

    if (!backgroundName || !backgroundLink) {
        outputLine("provide both background name and background link", "error");
        return;
    }

    let newUserBackground =
        Object.keys(userBackgrounds).find((background) =>
            lowerCaseCompare(background, backgroundName),
        ) ||
        Object.keys(backgrounds).find((background) =>
            lowerCaseCompare(background, backgroundName),
        ) ||
        null;

    if (newUserBackground !== null) {
        outputLine("background with same name already exists", "error");
        return;
    }

    userBackgrounds[backgroundName] = backgroundLink;
    lsWriteUserBackgrounds();

    outputLine(
        `new background ${coloredSpan(backgroundName, "secondary")} saved`,
        "success",
    );
}

function dub(parameters, flags) {
    if (!checkCommand("dub", flags, parameters, 1, 1, false)) return;

    const [backgroundName] = parameters;

    const targetBackground =
        Object.keys(userBackgrounds).find((background) =>
            lowerCaseCompare(background, backgroundName),
        ) || null;

    if (targetBackground === null) {
        outputLine("such background doesn't exists", "error");
        return;
    }

    delete userBackgrounds[targetBackground];
    lsWriteUserBackgrounds();

    outputLine(
        `background ${coloredSpan(backgroundName, "secondary")} deleted`,
        "success",
    );
}

function sg(parameters, flags) {
    if (!checkCommand("sg", flags, parameters, 0, 2, true)) return;

    const [gifName, gifLink] = parameters;

    if (flags.includes("-ag")) {
        outputLine("defaults:");
        Object.keys(gifs).forEach(
            (gif) => outputLine(gif.toLowerCase(), "padding-left secondary"),
            "padding-left secondary",
        );

        if (isEmptyObject(userGifs)) {
            outputLine(`user gifs: ${coloredSpan("empty", "secondary")}`);
        } else {
            outputLine("user gifs:");
            Object.keys(userGifs).forEach((gif) =>
                outputLine(gif, "padding-left secondary"),
            );
        }
    }

    if (gifName !== "link" && gifName && gifLink) {
        outputLine(
            `you have to provide ${coloredSpan(
                "name",
                "secondary",
            )} or ${coloredSpan("'link' url", "secondary")}`,
            "error",
        );
        return;
    }

    if (gifName === "link") {
        setGif(gifLink);
        outputLine("your gif applied", "success");
        return;
    }

    if (gifName) {
        const targetGif =
            Object.keys(userGifs).find((gif) =>
                lowerCaseCompare(gif, gifName),
            ) ||
            Object.keys(gifs).find((gif) => lowerCaseCompare(gif, gifName)) ||
            null;

        if (targetGif === null) {
            outputLine("gif with such name doesn't exists", "error");
            return;
        }

        setGif(gifs[targetGif] || userGifs[targetGif]);

        outputLine(
            `gif ${coloredSpan(gifName, "secondary")} applied`,
            "success",
        );
    }
}

function sug(parameters, flags) {
    if (!checkCommand("sug", flags, parameters, 2, 2, false)) return;

    const [gifName, gifLink] = parameters;

    if (!gifName || !gifLink) {
        outputLine("provide both gif name and gif link", "error");
        return;
    }

    let newUserGif =
        Object.keys(userGifs).find((gif) => lowerCaseCompare(gif, gifName)) ||
        Object.keys(gifs).find((gif) => lowerCaseCompare(gif, gifName)) ||
        null;

    if (newUserGif !== null) {
        outputLine("gif with same name already exists", "error");
        return;
    }

    userGifs[gifName] = gifLink;
    lsWriteUserGifs();

    outputLine(`new gif ${coloredSpan(gifName, "secondary")} saved`, "success");
}

function dug(parameters, flags) {
    if (!checkCommand("dug", flags, parameters, 1, 1, false)) return;

    const [gifName] = parameters;

    const targetGif =
        Object.keys(userGifs).find((gif) => lowerCaseCompare(gif, gifName)) ||
        null;

    if (targetGif === null) {
        outputLine("such gif doesn't exists", "error");
        return;
    }

    delete userGifs[targetGif];
    lsWriteUserGifs();

    outputLine(`gif ${coloredSpan(gifName, "secondary")} deleted`, "success");
}

function sq(parameters, flags) {
    if (!checkCommand("sq", flags, parameters, 1, 1, false)) return;

    const [newQuote] = parameters;

    setQuote(newQuote);
    outputLine("new quote applied", "success");
}

function sgm(parameters, flags) {
    if (!checkCommand("sgm", flags, parameters, 1, 1, false)) return;

    const [newGreetingMessage] = parameters;

    setGreetingMessage(newGreetingMessage);

    outputLine("new greeting message applied", "success");
}

function ta(parameters, flags) {
    if (!checkCommand("ta", flags, parameters, 0, 1, true)) return;

    const [targetToChange] = parameters;

    if (flags.includes("-csl")) {
        outputLine(
            `line state: ${coloredSpan(lineAnimationState, "secondary")}`,
        );
        outputLine(
            `prompt state: ${coloredSpan(promptAnimationState, "secondary")}`,
        );
    }

    if (targetToChange === "line") {
        const oldState = lineAnimationState;
        setLineAnimationState(lineAnimationState ? false : true);
        outputLine(
            `line animation state changed from ${coloredSpan(
                oldState,
                "secondary",
            )} to ${coloredSpan(lineAnimationState, "secondary")}`,
            "success",
        );
        return;
    }

    if (targetToChange === "prompt") {
        const oldState = promptAnimationState;
        setPromptAnimationState(promptAnimationState ? false : true);
        outputLine(
            `prompt animation state changed from ${coloredSpan(
                oldState,
                "secondary",
            )} to ${coloredSpan(promptAnimationState, "secondary")}`,
            "success",
        );
        return;
    }

    outputLine("such parameter doesn't exists", "error");
    return;
}
