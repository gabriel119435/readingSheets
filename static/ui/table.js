// responsible for binding/updating/rendering table
import {columns} from "../columnDefinition.js";
import {createElement, getDom} from "../elementAccess.js";
import {applySort} from "../logic/sort.js";

const sortable = columns.filter(c => c.sortable)

export function bindHeaders(onSortChange) {

    const {tableHeaders} = getDom();

    sortable.forEach(c => {
        const th = tableHeaders[c.name];
        if (!th) throw new Error("missing header " + c.name);

        th.addEventListener("click", () => {
            onSortChange(c.name);
        });
    });
}

export function renderFullTable(rows, sort) {
    const sortedRows = applySort(rows, sort);
    updateHeaders(sort);
    renderTableOnly(sortedRows);
    getDom().downloadStatusText.textContent = "current loaded: " + sortedRows.length;
}

function updateHeaders(sortState) {
    sortable.forEach(c => {
        const th = getDom().tableHeaders[c.name]
        if (th == null) throw new Error("missing header " + c.name);
        let label = c.name;

        if (sortState && sortState.column === c.name) label += sortState.direction === "asc" ? "+" : "-";
        th.textContent = label;
    });
}

function renderTableOnly(rows) {
    const tbody = getDom().tableBody;
    tbody.innerHTML = "";

    for (const r of rows) {
        const tr = createElement("tr");
        for (const col of columns) {
            const td = document.createElement("td");
            td.textContent = r[col.name] ?? "";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}