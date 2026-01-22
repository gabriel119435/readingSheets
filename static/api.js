// responsible for api calls only
export async function downloadCandidates() {
    const res = await fetch("/candidates");
    if (!res.ok) throw new Error("get /candidates " + res.status);
    return await res.json();
}

export async function deleteCandidates() {
    const res = await fetch("/candidates", {method: "delete"});
    if (!res.ok) throw new Error("delete /candidates " + res.status);
}

export async function uploadCandidates(data) {
    const res = await fetch("/candidates", {method: "post", body: data});
    const body = await res.text();
    if (!res.ok) throw new Error("post /candidates " + res.status);
    return body;
}