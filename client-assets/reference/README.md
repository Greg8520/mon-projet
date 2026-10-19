# Pages de référence

Les landing pages d'autres marques dont on veut s'inspirer. On reprend leur **structure** (ordre des sections, mécanique de l'offre, formats de preuve), **jamais** leurs textes, images, avis, chiffres ou allégations.

## Comment ajouter une page
Un dossier par page, nommé **marque-type**, en minuscules et sans accent. Tu peux mettre plusieurs pages, y compris plusieurs pages d'une même marque :

```
reference/
  gruns-pdp/
  gruns-advertorial/
  mars-men-quiz/
```

Types utiles : `pdp` (fiche produit), `lp` (page de conversion dédiée à une pub), `advertorial` (article ou listicle), `quiz`.

Dans chaque dossier :
1. **`page.md`**, qui commence par ces lignes, puis tout le texte de la page (tout sélectionner, copier, coller) :
   ```
   Adresse : https://...
   Type : pdp / lp / advertorial / quiz
   Ce que j'aime : (le hero, le comparatif, l'offre…)
   Pourquoi cette page : (par exemple « pub active depuis 45 jours »)
   ```
2. **Les captures d'écran** de la page entière, de préférence sur mobile (`capture-1.png`, `capture-2.png`…).
3. *(Très utile)* **la capture de la pub** qui envoie vers cette page, si tu la trouves : c'est elle qui explique le hero.

Deux ou trois pages par type suffisent ; au-delà, les modèles se brouillent.

## Comment faire sur GitHub
- **Le plus simple** : prépare le dossier sur ton ordinateur, puis, depuis `client-assets/reference/`, clique sur **Add file → Upload files** et glisse **le dossier entier**. GitHub garde l'arborescence.
- **Ou bien** : **Add file → Create new file**, tape `nom-de-la-marque/page.md` (le `/` crée le dossier), colle le texte et valide. Ouvre ensuite ce dossier et ajoute les captures avec **Upload files**.

## Bien choisir une page
Une page vers laquelle une marque envoie de la publicité depuis **plus de 30 jours** (Bibliothèque publicitaire Meta) : si la pub tourne aussi longtemps, c'est qu'elle rapporte.
