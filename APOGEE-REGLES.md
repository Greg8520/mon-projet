# Règles Apogée Men · fiche de référence

À lire avant toute nouvelle page ou modification pour Apogée Men. Le détail et les sources (avec les références `fichier:ligne`) sont dans `BRAND-BRIEF.md`. Cette fiche en est la version opérationnelle.

## 1. État du projet

| Élément | Où |
|---|---|
| Page « cortisol » (noindex) | https://apogee-men-lp.vercel.app · `lp/index.html` |
| Page « 5 raisons » (noindex) | https://apogee-men-lp.vercel.app/5-raisons · `lp/5-raisons/index.html`, modelée sur Mars Men `boost-fb` |
| Code | `lp/` : HTML, CSS et JS statiques, sans étape de build ; `lp/assets/` est partagé par les deux pages, panier compris |
| Hébergement | projet Vercel `apogee-men-lp` |
| Tests automatiques | `qa/` : 29 contrôles par page, en local ou sur les pages en ligne |
| Brief, recherche, questions client | `BRAND-BRIEF.md` (section 10 : 22 points à obtenir du client) |

**Bloquant avant tout trafic payant** : les identifiants Shopify sont factices (section 6). Le test « Real Shopify IDs are set » échoue tant qu'ils ne sont pas posés. C'est voulu.

### Décisions prises
- Type de page : **conversion** (A), sur le modèle d'angle des pubs Mars Men, adapté et rendu conforme.
- Hero validé : « Cortisol en hausse, testostérone sous pression. »
- Structure validée : 17 blocs.
- Ajustements faits pendant la QC, **à valider** : « 49,00 € la cure d'un mois » (au lieu de « par mois », car l'abonnement est prélevé tous les 30 jours) et le titre de la section mécanisme, « Le stress vide. Et c'est la testostérone qui paie la note. ».
- Lancement 2 : page **produit directe** modelée sur Mars Men `boost-fb`, en 16 blocs validés. Hero écrit par l'opérateur : « La formule testostérone hors catégorie. » / « 7 ingrédients réunis dans une formule quotidienne dédiée à la vitalité masculine. ». Les deux allégations sous le titre sont obligatoires (voir section 3).

## 2. Identité visuelle (tokens réels du thème, `client-assets/brand.md`)

| Rôle | Valeur | Règle |
|---|---|---|
| Fond | `#000000` | Fond principal |
| Panneaux, cartes | `#101418` | Alterner avec le fond pour rythmer |
| Texte | `#f2f5f6` | Texte secondaire à 80 % ; jamais sous 60 % (6,8:1) |
| Accent | `#e8c79a` (bronze) | Libellés, prix, repères ; aussi la bande du Pacte |
| Filets | `#2a3036` | Bordures et séparateurs uniquement, jamais du texte (1,6:1) |
| Bouton | fond `#e8c79a`, texte `#000000` | 13,07:1 ; arrondi **14px** ; hauteur 52px (minimum 44px) |
| Survol bouton | `#e3bb85` | |
| Graphiques | barres `#c37e45`, barres secondaires `#5f656b` | Le bronze est trop clair pour des données (validateur dataviz) |
| **Interdit** | texte blanc sur `#b5713a` | Bouton cuivre du thème : 3,90:1, sous le seuil de 4,5:1 |

- **Polices** : Space Grotesk 500/700 (titres, libellés, boutons) et Inter 400/500 (paragraphes), auto-hébergées dans `lp/assets/fonts`. Le sous-ensemble latin n'a ni « → » ni « ✓ » : toujours passer par les icônes SVG.
- **Icônes** : une seule famille. viewBox 24, trait 1,5, extrémités arrondies, `currentColor`. Le sprite est en haut de `lp/index.html`.
- **Motifs de la marque** : libellés en capitales avec un interlettrage de 0,06em, numérotation 01/02/03/04, séparateur « · », flèche sur les boutons.
- **Images à utiliser** : hero (`hero-1376`), flacon détouré (`bottle-*`), gélule éclatée (`capsule-*`), montagne (`mountain-*`). L'homme de la photo montagne est généré par IA : ne jamais le présenter comme un client.

## 3. Ce qu'on a le droit de dire

### Les 4 allégations autorisées (texte exact, toujours suivies de « * »)
- Le zinc contribue au maintien d'un taux normal de testostérone dans le sang.
- Le magnésium et la vitamine B6 contribuent à réduire la fatigue.
- Le magnésium et la vitamine D contribuent au maintien d'une fonction musculaire normale.
- La vitamine B6 contribue également à réguler l'activité hormonale.

Le « * » renvoie à la note : « *Les allégations de santé portent sur les nutriments concernés (zinc, magnésium, vitamines D3 et B6). Les études citées portent sur les ingrédients, pas sur Apogée Men. »
Une option est en attente d'accord du client : « Le magnésium et la vitamine B6 contribuent à une fonction psychologique normale » (allégation UE autorisée qui renforcerait l'angle stress).

**Bénéfice général = allégation précise à côté.** « Testostérone », « vitalité », « énergie » employés seuls sont des bénéfices généraux : ils doivent être accompagnés, au même endroit, d'une des 4 allégations ci-dessus (règlement UE 1924/2006, article 10.3). C'est pour cela que le titre « La formule testostérone hors catégorie » est suivi des puces zinc et magnésium + B6.

### Ligne directrice du copywriting
« Il ne veut pas redevenir jeune. Il veut redevenir lui-même. » Le désir avant le produit ; la testostérone est le mécanisme, pas le désir. Détail, mots à utiliser et conflits signalés : `BRAND-BRIEF.md`, section 12, et le dossier `client-assets/copywriting/`.

### Constantes de confiance (mot pour mot)
49,00 € tous les 30 jours (soit 1,63 € par jour) · « 90 jours pour essayer. Ou remboursé. » · « Livraison offerte dès la 1re commande » · « Formule sans caféine ni stimulant » · « Fabriqué en France » · « Testé en laboratoire » · 7 actifs : fenugrec 600 mg, shilajit purifié 500 mg, safran 28 mg, zinc 15 mg (150 % des VNR), magnésium 150 mg, vitamine D3 2000 UI, vitamine B6 1,9 mg (forme P5P).

### Formulations maison réutilisables
- Le safran, au maximum : « une plante étudiée pour ses relations avec la réponse au stress ». Jamais plus.
- « La testostérone ne dépend pas d'un seul facteur. »
- « Ce n'est pas une sentence. C'est un mécanisme qui se comprend et, en grande partie, se pilote. »
- « Ce n'est pas un raccourci. C'est un appui nutritionnel pour les hommes qui veulent agir sur leur énergie et leur vitalité, sans promesses exagérées. »
- La pédagogie du blog est utilisable comme explication, jamais comme effet du produit : « Le stress chronique élève le cortisol, qui freine la sécrétion de testostérone ».

### Avertissement obligatoire, en pied de page, mot pour mot
« Les compléments alimentaires ne sont pas des médicaments et ne peuvent pas se substituer à un régime alimentaire varié et équilibré, ni à un mode de vie sain. Ne pas dépasser la dose journalière recommandée. Déconseillé aux personnes sous traitement antidiabétique. Tenir hors de portée des jeunes enfants. Déconseillé aux femmes enceintes et allaitantes. En cas de traitement médical, demandez l'avis de votre médecin. »

## 4. Ce qu'on ne dit jamais

- **Réglementation UE** : guérir, soigner, traiter, prévenir, diagnostiquer ; « booster », « augmente la testostérone », « baisse le cortisol », « réduit le stress », « rééquilibre vos hormones » ; toute allégation sur le fenugrec, le shilajit ou le safran (au-delà de la formulation safran ci-dessus) ; le « +20,45 % » du shilajit ; « cliniquement prouvé » ; la marque « Testofen® ».
- **Règles Meta** (la page reçoit du trafic Meta) : jamais de « vous » associé à un état de santé (« Vous êtes stressé ? », « Votre testostérone est basse ? ») ; pas d'âge implicite ; aucun angle libido ou sexualité ; pas d'avant/après ; ciblage des pubs 18+.
- **Vérité** : aucune note, aucun avis, aucun prix barré, aucun code promo, aucun chiffre, aucun logo presse qui n'existe pas ; pas de fausse rareté, pas de compte à rebours.
- **Même quand ce sera vrai** : pas de résultats d'analyses de testostérone dans les avis, pas d'avant/après physiques, pas de comparaison avec un traitement hormonal (le complément serait présenté comme une alternative à un médicament).
- **Âges** : aucun âge explicite dans les textes (« après 35 ans », « à 40 ans »). Le test « No explicit age targeting » le vérifie.
- **Typographie** : aucun tiret cadratin (—) ni demi-cadratin (–) sur la page. Le texte de la marque en contient : les remplacer par « : », un point ou « · ».
- **Images interdites** : `imgi_12` et `imgi_26` (pictos « Soutient la performance », « Aide à préserver vos gains »), `imgi_28` (allégations sur les plantes).

## 5. Checklist de revue, avant chaque mise en ligne

**Automatique**
```
cd qa && npm install && npm test     # toutes les pages locales (lp/)
npm run test:live                    # les pages en ligne, après déploiement
npm run shots                        # + captures dans qa/out/
LP_PAGES=/5-raisons/ npm test        # une seule page
```
Hors de l'environnement cloud Claude, installer une fois le navigateur : `npx playwright install chromium`.

**Humaine** (ce que la machine ne voit pas)
- [ ] Le hero reprend mot pour mot la promesse de la pub qui envoie le trafic.
- [ ] Chaque bénéfice santé est l'une des 4 allégations autorisées, avec son « * ».
- [ ] La question 1 de la FAQ répond à l'affirmation la plus forte du hero, formulée comme un sceptique.
- [ ] Les conditions de l'abonnement sont visibles avant le bouton d'ajout au panier.
- [ ] Chaque chiffre a sa source dans `BRAND-BRIEF.md`, et tous les chiffres concordent.
- [ ] Les avis affichés sont réels, attribués, autorisés, et ne contiennent pas de diagnostic.
- [ ] Aucune nouvelle image ne porte une allégation incrustée.
- [ ] Le « noindex » n'est retiré qu'au lancement (section 6).

## 6. Opérations courantes

**Poser les identifiants Shopify** (sur **les deux pages** : `lp/index.html` et `lp/5-raisons/index.html`)
- Dans chaque page : sur le formulaire `#buyform`, remplacer `data-product-id="PRODUCT_ID"` et `data-variant-id="VARIANT_ID"` ; dans les champs cachés, `name="id" value="VARIANT_ID"` et `name="selling_plan" value="SELLING_PLAN_ID"` ; sur le bloc `.plan`, `data-selling-plan="SELLING_PLAN_ID"`.
- Dans `lp/assets/app.js` : vérifier `CONFIG.shopDomain` (actuellement `apogeemen.com`).
- Incrémenter le `?v=` de `styles.css` et `app.js` dans `index.html` à chaque modification.
- Lancer `npm test`, qui doit alors afficher 28/28, puis tester un vrai passage en caisse : le panier Shopify doit montrer Apogée Men en abonnement tous les 30 jours, à 49,00 €.

**Ajouter l'achat unique** (si le client confirme son prix) : dupliquer le bloc `.plan` dans le `radiogroup` avec `data-selling-plan=""`, son prix dans `data-price` (en centimes) et son libellé. Le JavaScript gère déjà le clavier, les prix et le lien de paiement.

**Afficher les avis** : remplir la section `#avis` de chaque page, puis retirer son attribut `hidden`.

**Ajouter une page** : créer `lp/<nom>/index.html` en partant d'une page existante, avec des chemins **absolus** vers les fichiers partagés (`/assets/...`), puis ajouter `/<nom>/` à la liste `LP_PAGES` par défaut de `qa/run.mjs`.

**Déployer** (session avec accès réseau à `vercel.com`, `api.vercel.com` et `*.vercel.app`)
```
npm i -g vercel
cd lp
NODE_USE_ENV_PROXY=1 vercel login                          # lien + code à valider dans le navigateur
NODE_USE_ENV_PROXY=1 vercel link --yes --project apogee-men-lp
NODE_USE_ENV_PROXY=1 vercel deploy --prod --yes
```
Plus simple sur la durée : relier le dépôt GitHub au projet Vercel `apogee-men-lp`, avec `lp` comme dossier racine. Chaque modification poussée est alors mise en ligne automatiquement.

**Lancement** (retirer le noindex, à 3 endroits) : la balise `<meta name="robots">` de `lp/index.html`, l'en-tête `X-Robots-Tag` de `lp/vercel.json` et `lp/robots.txt`. Mettre aussi à jour le test « noindex is set » dans `qa/run.mjs`.

## 7. Pièges rencontrés (pour ne pas les refaire)

- **Proxy de l'environnement cloud** : le `fetch` de Node l'ignore. Il faut `NODE_USE_ENV_PROXY=1` pour la CLI Vercel, sinon elle échoue sur « fetch failed ». Pour tester une URL publique, Playwright doit recevoir `proxy: { server: HTTPS_PROXY }` (déjà géré dans `qa/run.mjs`).
- **`apogeemen.com` est bloqué** depuis l'environnement cloud. Pour tester le vrai paiement depuis la session, il faut l'ajouter aux domaines autorisés.
- **Sprite SVG** : Chrome ignore l'attribut `hidden` sur `<svg>`, ce qui crée une bande vide de 150px en haut de page. Utiliser la classe `.sprite`.
- **Images dans un conteneur grid avec `aspect-ratio`** : `height: 100%` ne se résout pas et la photo est rognée. Les positionner en absolu.
- **Captures d'éléments** : l'en-tête et le bouton collants les recouvrent. Masquer `.hdr`, `.sticky` et `.promo` avant de capturer.
- **`vercel link`** crée `lp/.env.local`, qui contient un jeton. Il est exclu par `lp/.gitignore` et `lp/.vercelignore` : ne jamais l'enregistrer dans Git.
- **Contraste du texte posé sur une photo** : axe ne sait pas le mesurer. `qa/run.mjs` le calcule pixel par pixel.
- **Pages dans un sous-dossier** : un chemin relatif (`assets/...`) casse selon que l'adresse finit ou non par `/`. Utiliser `/assets/...`. Les miniatures du panier sont stockées en chemin racine pour s'afficher sur toutes les pages.
- **Références exportées en `.md`** : un export peut contenir les images encodées dans le texte (24 Mo pour `listicle.md`). Retirer les blocs `data:image/...;base64` avant de lire.
- **Captures « page entière » faites par extension** : elles recollent parfois les éléments collants en double. Le texte (`page.md`) fait foi.
