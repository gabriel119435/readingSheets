// responsible for computing filtered values. no dom. no state.
export function applyFilter(rows, filterTechs) {
    if (filterTechs.length === 0) return rows;

    return rows.filter(r => {
        const rowTechs = parseTechs(r.tech_stack);
        for (const filter of filterTechs) if (!rowTechs.includes(filter)) return false;
        return true;
    });
}

export function getAllTechs(rows) {
    const set = new Set();
    for (const r of rows) for (const t of parseTechs(r.tech_stack)) set.add(t);
    return Array.from(set).sort();
}

function parseTechs(s) {
    if (s == null || s === "") return [];
    return s.split(", ").filter(v => v !== "");
}

