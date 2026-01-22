// responsible for providing static and validated dom access
let cachedDom = null;

export function createElement(tag) {
    return document.createElement(tag)
}

export function getDom() {
    if (cachedDom !== null) return cachedDom;

    cachedDom = {
        uploadForm: getNonNull("upload-form"),
        filesInput: getNonNull("files"),
        deleteAllButton: getNonNull("delete-all"),
        uploadStatusText: getNonNull("upload-status"),
        downloadStatusText: getNonNull("download-status"),
        tableBody: getNonNull("candidates-table-body"),
        tableHeaders: {
            name: getNonNull("th-name"),
            city: getNonNull("th-city"),
            age: getNonNull("th-age"),
            gender: getNonNull("th-gender"),
            disability: getNonNull("th-disability"),
            salary_expectation: getNonNull("th-salary_expectation"),
            tech_stack: getNonNull("th-tech_stack")
        },
        filterAddDiv: getNonNull("filter-add"),
        filterRemoveDiv: getNonNull("filter-remove"),
    };

    return cachedDom;
}

function getNonNull(id) {
    const element = document.getElementById(id);
    if (element == null) throw new Error("missing html id " + id);
    return element;
}