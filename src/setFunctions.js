function setBackground(newBackground = background) {
  background = newBackground;
  lsWriteBackground();

  document.body.style.backgroundImage = `url(${newBackground})`;
}

function setGif(newGif = gif) {
  gif = newGif;
  lsWriteGif();

  const windowGif = document.getElementById("window-gif");
  windowGif.style.backgroundImage = `url(${newGif})`;
}

function setPromptCursor(newCursor = promptCursor) {
  promptCursor = newCursor;
  lsWritePromptCursor();

  const promptCursors = document.getElementsByClassName("prompt-cursor");
  [...promptCursors].forEach((cursor) => (cursor.textContent = newCursor));
}

function setQuote(newQuote = quote) {
  quote = newQuote;
  lsWriteQuote();

  const windowQuote = document.getElementById("window-quote");
  windowQuote.innerHTML = `"<span id="quote-text">${quote}</span>"`;
}
