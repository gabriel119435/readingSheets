// orchestration and state holder

import {deleteCandidates, downloadCandidates, uploadCandidates} from "./api.js";
import {bindHeaders, renderFullTable} from "./ui/table.js";
import {getDom} from "./elementAccess.js";
import {toggleSort} from "./logic/sort.js";
import {applyFilter, getAllTechs} from "./logic/filter.js";
import {bindFilterAdd, bindFilterRemove, renderFilter} from "./ui/filter.js";

// state
let currentSort = null;
let currentFilter = [];
let currentRows = [];

function renderWithState() {
    renderFullTable(applyFilter(currentRows, currentFilter), currentSort);
    renderFilter(getAllTechs(currentRows), currentFilter);
}

// binders
bindDeleteAndUploadButtons();
bindHeadersAndFilter();

// init
currentRows = await downloadCandidates();
renderWithState();

function bindDeleteAndUploadButtons() {
    getDom().deleteAllButton.addEventListener("click", async () => {
        await deleteCandidates();
        currentRows = await downloadCandidates();
        renderWithState();
    });

    getDom().uploadForm.addEventListener("submit", async e => {
        e.preventDefault();
        const input = getDom().filesInput;
        const data = new FormData();
        for (const file of input.files) data.append("files", file);

        const body = await uploadCandidates(data);
        getDom().uploadStatusText.textContent = "finished upload: " + body;
        input.value = "";
        currentRows = await downloadCandidates();
        renderWithState();
    });
}

function bindHeadersAndFilter() {
    bindHeaders(column => {
        currentSort = toggleSort(currentSort, column);
        renderWithState();
    });

    bindFilterAdd(tech => {
        if (currentFilter.includes(tech)) return;
        currentFilter = [...currentFilter, tech];
        renderWithState();
    });

    bindFilterRemove(tech => {
        if (!currentFilter.includes(tech)) return;
        currentFilter = currentFilter.filter(t => t !== tech);
        renderWithState();
    });
}