function setUserName(newUserName) {
    const oldUserName = userName;

    userName = newUserName;
    lsWriteUserName();

    const promptCursors = $(".prompt-cursor", true);

    promptCursors.forEach((cursor) => {
        cursor.textContent = cursor.textContent.replace(
            `${oldUserName}@`,
            `${userName}@`
        );
    });
}

function setBackground(newBackground) {
    background = newBackground;
    lsWriteBackground();

    document.body.style.backgroundImage = `url(${background})`;
}

function setGif(newGif) {
    gif = newGif;
    lsWriteGif();

    const windowGif = document.getElementById("window-gif");
    windowGif.style.backgroundImage = `url(${gif})`;
}

function setQuote(newQuote) {
    quote = newQuote;
    lsWriteQuote();

    const windowQuote = document.getElementById("window-quote");
    windowQuote.textContent = quote;
}

function setGreetingMessage(newGreetingMessage) {
    greetingMessage = newGreetingMessage;
    lsWriteGreetingMessage();
}

function setLineAnimationState(newLineAnimationState) {
    lineAnimationState = newLineAnimationState;
    lsWriteLineAnimationState();
}

function setPromptAnimationState(newPromptAnimationState) {
    promptAnimationState = newPromptAnimationState;
    lsWritePromptAnimationState();
}

function setOpenLinkDefaultTarget(newOpenLinkDefaultTarget) {
    openLinkDefaultTarget = newOpenLinkDefaultTarget;
    lsWriteOpenLinkDefaultTarget();
}

function setBookmarksDefaultTarget(newBookmarksDefaultTarget) {
    bookmarksDefaultTarget = newBookmarksDefaultTarget;
    lsWriteBookmarksDefaultTarget();
}
