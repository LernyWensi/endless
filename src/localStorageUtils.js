function lsWriteBookmarks() {
  localStorage.setItem(lsKeys.BOOKMARKS, JSON.stringify(bookmarks));
}

function lsWriteUserName() {
  localStorage.setItem(lsKeys.USER_NAME, JSON.stringify(userName));
}

function lsWriteBackground() {
  localStorage.setItem(lsKeys.BACKGROUND, JSON.stringify(background));
}

function lsWriteUserBackgrounds() {
  localStorage.setItem(
    lsKeys.USER_BACKGROUNDS,
    JSON.stringify(userBackgrounds)
  );
}

function lsWriteGif() {
  localStorage.setItem(lsKeys.GIF, JSON.stringify(gif));
}

function lsWriteUserGifs() {
  localStorage.setItem(lsKeys.USER_GIFS, JSON.stringify(userGifs));
}

function lsWriteQuote() {
  localStorage.setItem(lsKeys.QUOTE, JSON.stringify(quote));
}

function lsWriteGreetingMessage() {
  localStorage.setItem(
    lsKeys.GREETING_MESSAGE,
    JSON.stringify(greetingMessage)
  );
}

function lsWriteLineAnimationState() {
  localStorage.setItem(
    lsKeys.LINE_ANIMATION_STATE,
    JSON.stringify(lineAnimationState)
  );
}

function lsWritePromptAnimationState() {
  localStorage.setItem(
    lsKeys.PROMPT_ANIMATION_STATE,
    JSON.stringify(promptAnimationState)
  );
}

function lsWriteOpenLinkDefaultTarget() {
  localStorage.setItem(
    lsKeys.OPEN_LINK_DEFAULT_TARGET,
    JSON.stringify(openLinkDefaultTarget)
  );
}

function lsWriteBookmarksDefaultTarget() {
  localStorage.setItem(
    lsKeys.BOOKMARKS_DEFAULT_TARGET,
    JSON.stringify(bookmarksDefaultTarget)
  );
}

function lsReadBookmarks() {
  return JSON.parse(localStorage.getItem(lsKeys.BOOKMARKS));
}

function lsReadUserName() {
  return JSON.parse(localStorage.getItem(lsKeys.USER_NAME));
}

function lsReadBackground() {
  return JSON.parse(localStorage.getItem(lsKeys.BACKGROUND));
}

function lsReadUserBackgrounds() {
  return JSON.parse(localStorage.getItem(lsKeys.USER_BACKGROUNDS));
}

function lsReadGif() {
  return JSON.parse(localStorage.getItem(lsKeys.GIF));
}

function lsReadUserGifs() {
  return JSON.parse(localStorage.getItem(lsKeys.USER_GIFS));
}

function lsReadQuote() {
  return JSON.parse(localStorage.getItem(lsKeys.QUOTE));
}

function lsReadGreetingMessage() {
  return JSON.parse(localStorage.getItem(lsKeys.GREETING_MESSAGE));
}

function lsReadLineAnimationState() {
  return JSON.parse(localStorage.getItem(lsKeys.LINE_ANIMATION_STATE));
}

function lsReadPromptAnimationState() {
  return JSON.parse(localStorage.getItem(lsKeys.PROMPT_ANIMATION_STATE));
}

function lsReadOpenLinkDefaultTarget() {
  return JSON.parse(localStorage.getItem(lsKeys.OPEN_LINK_DEFAULT_TARGET));
}

function lsReadBookmarksDefaultTarget() {
  return JSON.parse(localStorage.getItem(lsKeys.BOOKMARKS_DEFAULT_TARGET));
}
