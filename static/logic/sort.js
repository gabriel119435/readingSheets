// responsible for computing sorted values. no dom. no state.
import {columns} from "../columnDefinition.js";

export function toggleSort(currColumn, nextColumn) {
    if (currColumn == null || currColumn.column !== nextColumn) return {column: nextColumn, direction: "asc"};
    if (currColumn.direction === "asc") return {column: nextColumn, direction: "desc"};
    return null;
}

export function applySort(rows, sort) {
    if (sort == null) return rows;

    const {column, direction} = sort;
    const col = columns.find(c => c.name === column);
    if (!col) throw new Error("missing column " + column);

    const sorted = [...rows];

    if (col.type === "string") sorted.sort(stringCmp(column, direction));
    else if (col.type === "number") sorted.sort(numberCmp(column, direction));
    else if (col.type === "boolean") sorted.sort(booleanCmp(column, direction));
    else throw new Error("bad type " + col.type);

    return sorted;
}

function stringCmp(column, direction) {
    return (a, b) => {
        const av = (a[column] ?? "").toLowerCase();
        const bv = (b[column] ?? "").toLowerCase();
        if (av === bv) return 0;
        return direction === "asc"
            ? (av > bv ? 1 : -1)
            : (av < bv ? 1 : -1);
    };
}

function numberCmp(column, direction) {
    return (a, b) => {
        const av = a[column] ?? -Infinity;
        const bv = b[column] ?? -Infinity;
        return direction === "asc"
            ? av - bv
            : bv - av;
    };
}

function booleanCmp(column, direction) {
    return (a, b) => {
        const toNum = v => (
            v == null
                ? -1
                : (v ? 1 : 0)
        );
        const diff = toNum(a[column]) - toNum(b[column]);
        return direction === "asc" ? diff : -diff;
    };
}