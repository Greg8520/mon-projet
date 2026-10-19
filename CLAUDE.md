# Instructions pour Claude · dépôt mon-projet

Réponds en français.

## Avant d'écrire le moindre texte (page, pub, e-mail, fiche produit)
Lis, dans cet ordre :
1. `client-assets/copywriting/` : les règles de copywriting de la marque (mots à utiliser, mots à éviter, ton, frameworks). Tous les fichiers.
2. `APOGEE-REGLES.md` : identité visuelle, allégations autorisées, interdits UE et Meta, checklist de revue.
3. `BRAND-BRIEF.md` : faits produit, constantes de confiance, recherche, questions en attente du client.

En cas de conflit : conformité (UE, Meta) d'abord, puis règles de la marque, puis copywriting. Signale le conflit au lieu de trancher en silence.

## « Lis CONSULTING_LP_PLAYBOOK-v2.md et lance-le »
Le playbook décrit tout le processus. Les pages à imiter sont dans `client-assets/reference/<marque>/` : on reprend leur structure, jamais leurs textes, images, avis, chiffres ou allégations.

## Repères techniques
- La page Apogée est dans `lp/` (statique, sans build), en ligne sur https://apogee-men-lp.vercel.app (projet Vercel `apogee-men-lp`).
- Tests : `cd qa && npm install && npm test` avant chaque mise en ligne, `npm run test:live` après.
- Dans l'environnement cloud, préfixer les commandes Vercel par `NODE_USE_ENV_PROXY=1`, sinon elles échouent sur « fetch failed ».
- Jamais de faux avis, de note, de prix barré ni de chiffre inventé ; jamais de tiret cadratin sur une page.
