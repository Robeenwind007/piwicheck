# PIWIcheck

PWA autonome d'interprétation des relevés de surrégime PIWIS Porsche : temps estimé par plage, kilométrage du dernier événement, verdict.

## Déploiement
- **GitHub Pages** : pousser ces fichiers à la racine d'un dépôt, puis Settings → Pages → branche `main`, dossier `/`.
- **Cloudflare Pages** : nouveau projet, aucune commande de build, répertoire de sortie `/`.

Fonctionne hors ligne après la première visite (service worker). Les saisies sont conservées dans le navigateur (localStorage).
## Mettre à jour
À chaque déploiement, incrémenter `VERSION` dans `sw.js` **et** `APP_VERSION` dans `index.html` (même valeur, format `majeur.mineur.correctif`, ex. `1.0.0` → `1.0.1` pour une correction, `1.1.0` pour une nouvelle fonction).
La version s'affiche en bas du splash. L'appli charge toujours la page depuis le réseau quand elle est en ligne et se recharge seule quand une nouvelle version s'installe.
