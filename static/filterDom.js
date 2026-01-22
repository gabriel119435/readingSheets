// responsible for binding/updating/rendering filter
import {createElement, getDom} from "./dom.js";

export function renderFilter(allTechs, selectedTechs) {
    const {filterAddDiv, filterRemoveDiv} = getDom();

    filterAddDiv.innerHTML = "";
    filterRemoveDiv.innerHTML = "";

    const available = allTechs.filter(t => !selectedTechs.includes(t));

    for (const t of available) {
        const div = createElement("div");
        div.textContent = t;
        filterAddDiv.appendChild(div);
    }

    for (const t of [...selectedTechs].sort()) {
        const div = createElement("div");
        div.textContent = t;
        filterRemoveDiv.appendChild(div);
    }
}

export function bindFilterAdd(onAdd) {
    const {filterAddDiv} = getDom();

    filterAddDiv.addEventListener("click", e => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const tech = target.textContent;
        if (!tech) return;
        onAdd(tech);
    });
}

export function bindFilterRemove(onRemove) {
    const {filterRemoveDiv} = getDom();

    filterRemoveDiv.addEventListener("click", e => {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        const tech = target.textContent;
        if (!tech) return;
        onRemove(tech);
    });
}