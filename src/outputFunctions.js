function outputLine(line, className) {
    const terminal = $("#window-terminal");

    const outputNode = elementFromHTML(`<p class="line">${line}</p>`);

    lineAnimationState && outputNode.classList.add("line-animated");
    className && outputNode.classList.add(...className.split(" "));

    terminal.appendChild(outputNode);
}

async function outputMultipleLines(lines, className) {
    lines.forEach((line) => {
        if (Array.isArray(line)) {
            outputLine(
                line[0],
                className ? `${className} ${line[1]}` : line[1]
            );
        } else {
            outputLine(line, className);
        }
    });
}

function outputBookmarks(bookmarks) {
    const terminal = $("#window-terminal");

    const outputNode = elementWithClass("div", "bookmarks");

    bookmarks.forEach(({ name, links }) => {
        const category = elementFromHTML(
            `<div class="category">
                <p class="category-title">${name}</p>
                <div class="category-links"></div>
            </div>`
        );

        links.forEach(({ name, url }) => {
            const link = elementFromHTML(
                `<a class="category-link" target="${bookmarksDefaultTarget}" href=${url}>${name}</a>`
            );

            category.lastElementChild.appendChild(link);
        });

        outputNode.appendChild(category);
    });

    terminal.appendChild(outputNode);
}

function outputOptions(optionsList) {
    let nameSalt = Math.floor(Math.random() * 1000) + 1;

    const options = elementWithClass("form", "options");

    optionsList.forEach((option) => {
        const saltedName = `option-${option.name.replace(
            /\s+/g,
            ""
        )}-${nameSalt}`;

        const optionsItem = elementFromHTML(
            `<div class="option">
                <input class="option-input" type="radio" id="${saltedName}" name="option" value="${option.name}"/>
                <label class="option-label" for="${saltedName}">${option.name}</label>
            </div>`
        );

        options.appendChild(optionsItem);
    });

    $("#window-terminal").appendChild(options);

    $("#prompt-input").classList.add("pointer-events-none");
    $(`#option-${optionsList[0].name.replace(/\s+/g, "")}-${nameSalt}`).focus();
    $(
        `#option-${optionsList[0].name.replace(/\s+/g, "")}-${nameSalt}`
    ).checked = true;

    return new Promise((resolve) => {
        options.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.target.checked = true;

                options.classList.add("pointer-events-none");

                const selectedOption = optionsList.find(
                    (option) => option.name === e.target.value
                );

                resolve(selectedOption.payload);
            }
        });
    });
}
