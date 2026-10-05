# PIWIcheck

PWA autonome d'interprétation des relevés de surrégime PIWIS Porsche : temps estimé par plage, kilométrage du dernier événement, verdict.

## Déploiement
- **GitHub Pages** : pousser ces fichiers à la racine d'un dépôt, puis Settings → Pages → branche `main`, dossier `/`.
- **Cloudflare Pages** : nouveau projet, aucune commande de build, répertoire de sortie `/`.

Fonctionne hors ligne après la première visite (service worker). Les saisies sont conservées dans le navigateur (localStorage).
Pour forcer la mise à jour après modification, incrémenter `CACHE` dans `sw.js`.
