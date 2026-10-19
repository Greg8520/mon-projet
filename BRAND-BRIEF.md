# BRAND BRIEF · Apogée Men

Brief de construction de la landing page (playbook v2, étape 2). Généré le 19/10/2026.
Source de vérité : `client-assets/` (pdp.md, education.md, brand.md, ads/, images/). Les références `fichier:ligne` renvoient aux lignes exactes de ces fichiers.

> Règle d'or pour la page : aucun chiffre, prix, note ou promesse qui ne figure pas ci-dessous. Tout ce qui manque est dans la liste « À fournir par le client » (section 10).

---

## 0. État des sources

| Source | État | Remarque |
|---|---|---|
| Pubs gagnantes `ads/` | 3 captures | **Ce sont des pubs Mars Men** (concurrent US, en anglais), pas des pubs Apogée. Voir section 6. |
| Texte de la page produit `pdp.md` | Reçu | Les **réponses de la FAQ n'ont pas été copiées** (seulement les questions, `pdp.md:141-157`). Aucun avis client, aucune note. |
| Science, blog, FAQ `education.md` | Reçu | 2 articles du blog (18/10/2026 et 10/08/2026). |
| CSS du thème `brand.md` | Reçu | Variables du thème + section produit `apogemars` (`.apmp`). C'est la source des tokens. |
| URL de la page produit | Non fournie | Domaine déduit du CSS : `apogeemen.com` (`brand.md:352`). |
| Site en direct | **Inaccessible** | Le réseau de cet environnement bloque `apogeemen.com` (proxy 403), et le domaine ne se résout pas depuis l'outil de lecture web. Tokens extraits du CSS collé, qui est celui que le site sert. |
| Images `images/` | 8 fichiers | Inventaire et alertes de conformité en section 9. |
| Vidéos, page de référence | Aucune | Facultatif. |

---

## 1. Tokens design (extraits du CSS réel du thème)

Le site a deux couches de style :
1. **Thème global** (Shopify, variables `--color-*`, `--font-*`) : fond blanc, texte #333, polices Inter.
2. **Section produit `apogemars`** (`.apmp`, `brand.md:6-20`) : univers sombre, bronze, Space Grotesk. C'est cet univers qui correspond au packaging et aux visuels (flacon ambré, fond noir, lueur dorée). **La landing page part de cette couche-là.**

### Couleurs

| Rôle | Token réel | Hex | Source |
|---|---|---|---|
| Fond principal (ink) | `--ink` | `#000000` | `brand.md:7` |
| Texte sur fond sombre | `--white` | `#f2f5f6` | `brand.md:8` |
| Accent bronze | `--bronze` | `#e8c79a` | `brand.md:9` |
| Panneau (cartes sur fond sombre) | `--panel` | `#101418` | `brand.md:10` |
| Bouton (fond) | `--button` | `#e8c79a` | `brand.md:11` |
| Bouton (texte) | `--buttontext` | `#000000` | `brand.md:12` |
| Filets / séparateurs | `--rule` | `#2a3036` | `brand.md:13` |
| Fond thème (sections claires) | `--color-background` | `#ffffff` | `brand.md:426` |
| Texte thème | `--color-foreground` | `#333333` | `brand.md:428` |
| Couleur la plus sombre de la palette | `--palette-darkest` | `#0c2d2f` | `brand.md:434` |
| Bouton principal du thème | `--color-primary-button-background` | `#b5713a` (rgb 181 113 58) | `brand.md:443` |
| Survol bouton du thème | `--color-primary-button-hover-background` | `#c37e45` | `brand.md:447` |
| Variante sélectionnée | `--color-selected-variant-background` | `#e8c79a` | `brand.md:466` |
| Survol variante sélectionnée | `--color-selected-variant-hover-background` | `#e3bb85` | `brand.md:470` |
| Erreur / succès | `--color-error` / `--color-success` | `#8B0000` / `#006400` | `brand.md:238-239` |

### Typographie

| Usage | Famille et graisse | Source |
|---|---|---|
| Section produit (titres, UI, corps) | **Space Grotesk 500**, titres en **700** (fichier 700 chargé depuis le CDN du site) | `brand.md:18-19`, `brand.md:347-353` |
| Thème : corps | **Inter 400** | `brand.md:105-107` |
| Thème : sous-titres | Inter 500 | `brand.md:108-110` |
| Thème : titres | Inter 700 | `brand.md:111-113` |
| Taille H1 | `clamp(3rem, 5.6vw, 3.5rem)`, interlignage 1, interlettrage 0 | `brand.md:164`, `176-182` |
| Taille H2 | `clamp(2.25rem, 4.8vw, 3rem)` | `brand.md:165` |
| Corps | 0.875rem, interlignage 1.6 (thème) ; intro section produit 16px / 1.5 | `brand.md:163`, `175`, `1-5` |
| Interlettrage des libellés | `--letter-spacing-sm: 0.06em` | `brand.md:104` |

Décision pour la page : **Space Grotesk** (500 / 700) pour titres, libellés et interface ; **Inter** (400 / 500) pour les paragraphes longs. Les deux sont sur Google Fonts.

### Formes, espacements, mouvement

| Élément | Valeur | Source |
|---|---|---|
| Arrondi des boutons (primaire et secondaire) | **14px** | `brand.md:305-306` |
| Arrondi popover / boutons de variante | 14px | `brand.md:310`, `89` |
| Arrondi pilules | 40px | `brand.md:303` |
| Arrondi champs | 4px | `brand.md:304` |
| Bordure bouton secondaire | 1px | `brand.md:308` |
| Cible tactile minimale | **44px** | `brand.md:96` |
| Padding boutons | 16px × 24px | `brand.md:67-68` |
| Padding de la section produit (mobile) | 30px 24px 45px | `brand.md:17` |
| Épaisseur de trait des icônes | **1.5px** | `brand.md:543` |
| Courbe d'apparition | `cubic-bezier(0.16, 1, 0.3, 1)` | `brand.md:329` |
| Vitesse du tiroir panier | 0.2s | `brand.md:323` |

### Motifs visuels de la marque (relevés dans `pdp.md`)
- Libellés en capitales : « L'APPROCHE APOGÉE », « LA FORMULE », « LE PACTE 90 JOURS » (`pdp.md:46, 88, 29`).
- Numérotation 01 / 02 / 03 / 04 pour les axes de la formule (`pdp.md:54-81`) et « VOIE 01 · PRODUIRE » (`pdp.md:129`).
- Séparateur point médian « · » (« Fenugrec · Shilajit », `pdp.md:56`) et puces « • » dans les bandeaux (`pdp.md:166-170`).
- Flèche « → » sur les boutons (« S'ABONNER À APOGÉE MEN → », `pdp.md:31`).
- Coches « ✓ » devant les points de preuve (`pdp.md:18-27`).
- Le texte de la marque utilise des tirets cadratins (« APOGÉE MEN — Votre vitalité… ») : **sur la page, ils seront remplacés** (deux-points, point ou « · »), règle du playbook.

### Contrastes (calculés, seuil 4.5:1)

| Paire | Ratio | Verdict |
|---|---|---|
| `#f2f5f6` sur `#000000` | 19.17 | OK |
| `#e8c79a` sur `#000000` | 13.07 | OK |
| Texte `#000000` sur bouton `#e8c79a` | 13.07 | OK : **bouton retenu** |
| `#e8c79a` sur `#101418` | 11.51 | OK |
| `#f2f5f6` à 55 % d'opacité sur `#000000` | 5.81 | OK : plancher pour le texte secondaire |
| Blanc sur bouton du thème `#b5713a` | **3.90** | **Échec** pour du texte de 16px. Le bouton cuivre du thème n'est pas conforme ; on ne l'utilise pas pour du texte. |
| `#2a3036` sur `#000000` | 1.57 | Filets uniquement, jamais du texte |

### Non récupéré (à signaler)
- Les **polices du flacon** (le condensé de « APOGÉE » et la police à chasse fixe de « SÉRIE N°01 », « FORMULE 7 ACTIFS ») ne sont pas dans le CSS fourni. Je ne les invente pas : les libellés seront en Space Grotesk capitales, interlettrage 0.06em.
- L'arrondi propre aux boutons de la section `.apmp` n'apparaît pas dans le CSS collé ; on applique celui du thème (14px).
- Pas de fichier logo vectoriel : le logo sera en texte (« APOGÉE MEN », Space Grotesk 700).

---

## 2. Constantes de confiance (verbatim)

| Constante | Texte exact | Source |
|---|---|---|
| Prix | « 49,00 € » | `pdp.md:28` |
| Formule d'achat | « S'ABONNER À APOGÉE MEN → » | `pdp.md:31` |
| Fréquence | « Vous recevez automatiquement votre approvisionnement tous les 30 jours. » | `pdp.md:37` |
| Gestion de l'abonnement | « Gérez, suspendez ou résiliez votre abonnement selon les conditions prévues. » | `pdp.md:38` |
| Garantie (nom) | « LE PACTE 90 JOURS » / « Votre garantie de satisfaction » | `pdp.md:29-30` |
| Garantie (accroche) | « 90 JOURS POUR ESSAYER. OU REMBOURSÉ. » | `pdp.md:161-162` |
| Garantie (détail page produit) | « Essayez APOGÉE MEN pendant 90 jours. La formule ne vous convient pas ? Contactez-nous pour demander votre remboursement, selon les conditions de notre garantie. » | `pdp.md:163` |
| Garantie (détail blog) | « Le Pacte 90 jours : remboursement intégral de la première commande, sans justification, en cas d'insatisfaction » | `education.md:252` |
| Livraison | « Livraison offerte dès la 1re commande » | `pdp.md:36` |
| Paiement | « Paiement sécurisé » | `pdp.md:32` |
| Bandeau | « 90 JOURS D'ESSAI • SATISFAIT OU REMBOURSÉ • FABRIQUÉ EN FRANCE » | `pdp.md:166-170` |
| Points de preuve | « 7 actifs soigneusement sélectionnés » · « Formule sans caféine ni stimulant » · « Fabriqué en France » · « Testé en laboratoire » · « Le Pacte 90 jours » | `pdp.md:18-27` |
| Signature | « Votre vitalité, au sommet » | `pdp.md:15` |

**Absents de toutes les sources (donc interdits sur la page tant que le client ne les fournit pas)** : note moyenne, nombre d'avis, avis clients, prix barré, code promo, prix d'achat unique (le pied de page mentionne « Acheter APOGÉE » et « S'abonner », `pdp.md:178-179`, sans prix), citations d'experts ou de presse.

**Calcul vérifiable sur la page** : 49,00 € tous les 30 jours = **1,63 € par jour** (49 ÷ 30 = 1,633).

### Offre à afficher (aucune remise inventée)
```
Apogée Men · 1 pot (cure d'un mois)          49,00 €
Livraison (offerte dès la 1re commande)      Offerte
Le Pacte 90 jours                            Inclus
Votre prix aujourd'hui                       49,00 €
```

---

## 3. Faits produit

### La formule (7 actifs, doses par jour)

| Actif | Dose | Détail fourni par la marque | Source |
|---|---|---|---|
| Fenugrec | 600 mg | Extrait sec 20:1 titré à 50 % en saponines stéroïdiennes. « dans le haut de la fourchette du marché (300 à 600 mg) » | `pdp.md:93-94, 134-137` |
| Shilajit purifié | 500 mg | « 50 % d'acides fulviques » (blog) | `pdp.md:98-99`, `education.md:230` |
| Vitamine D3 | 2000 UI | | `pdp.md:103-104` |
| Zinc | 15 mg | « 150 % des VNR » | `pdp.md:108-109`, `education.md:249` |
| Magnésium | 150 mg | | `pdp.md:113-114` |
| Safran | 28 mg | « extrait breveté » (blog) | `pdp.md:118-119`, `education.md:231` |
| Vitamine B6 | 1,9 mg | « forme active P5P » | `pdp.md:123-124`, `education.md:249` |

- « Une cure d'un mois par pot, à intégrer aux repas » (`education.md:251`).
- « Formule sans caféine ni stimulant » (`pdp.md:21`).
- Aucun blend propriétaire : « chaque actif est affiché à sa quantité exacte » (`education.md:249`).
- Ce que la formule exclut, selon la marque : Tongkat Ali, Tribulus, Bore, blends propriétaires (`education.md:232-238`).
- Contre-indication : « Déconseillé aux personnes sous traitement antidiabétique. » (`pdp.md:86`).

### Le raisonnement de la marque : 4 axes (`pdp.md:46-83`)
« La testostérone ne dépend pas d'un seul facteur. »
1. **La production naturelle** : Fenugrec · Shilajit
2. **Le maintien d'un taux normal** : Zinc · 15 mg
3. **Le contexte de stress** : Safran · 28 mg
4. **L'énergie et la fonction musculaire** : Magnésium · Vitamine D3 · Vitamine B6

L'axe 3 est le pont direct avec l'angle des pubs (stress / cortisol).
Attention : le blog parle d'un « Protocole 3-Voies : produire, garder, utiliser sa testostérone » (`education.md:247`) alors que la page produit en présente 4. Un seul cadre doit être retenu (voir section 10).

---

## 4. Avis clients

**Aucun avis, aucune note, aucun nombre d'avis dans le matériel fourni.** Le playbook demande 6 à 8 vrais avis : impossible sans le client. La page sera construite avec un emplacement prévu pour les avis, vide et masqué tant qu'ils ne sont pas fournis. Il ne faut ni l'inventer ni le simuler.

---

## 5. Voix de la marque

Ce qui rend le texte « Apogée » (relevé dans le blog et la page produit) :
- **Anti-promesse, pro-transparence.** « Ce n'est pas un raccourci. C'est un appui nutritionnel pour les hommes qui veulent agir sur leur énergie et leur vitalité, sans promesses exagérées. » (`education.md:109`). « sans jamais promettre de « booster » miracle » (`education.md:250`).
- **Phrases courtes et déclaratives, qui tombent juste.** « Ce n'est pas une sentence. C'est un mécanisme qui se comprend et, en grande partie, se pilote. » (`education.md:36`). « Les symptômes orientent, ils ne concluent pas. » (`education.md:54`).
- **Précision chiffrée**, doses exactes, références (AFU, EAU, EFSA, ANSES).
- **Honnêteté sur les limites**, ce qui renforce la confiance : « Les études citées portent sur les ingrédients, pas sur Apogée Men. » (`pdp.md:86`). « Le ressenti est utile mais insuffisant. » (`education.md:245`).
- **Vouvoiement.**
- **Positionnement contre la catégorie** : « La plupart des boosters concentrent leur discours sur une promesse : augmenter votre taux de testostérone. Mais la santé hormonale masculine est plus complexe. » (`pdp.md:48-50`).

Formules réutilisables telles quelles : « Votre vitalité, au sommet » · « La testostérone ne dépend pas d'un seul facteur. » · « Ce n'est pas une sentence. » · « 90 jours pour essayer. Ou remboursé. »

---

## 6. L'angle des pubs gagnantes

**Point bloquant à confirmer : les 3 captures sont des pubs Mars Men** (marque US « Men Go To Mars », en anglais, avec Tongkat Ali dans la formule). La page Apogée doit répondre à la pub **Apogée** qui enverra le trafic. Je pars du principe que ces pubs sont le modèle d'angle qu'Apogée décline en français.

### Ce que disent les 3 pubs
1. « **Cortisol drains you.** Mars Men refills the tank. » + liste de 7 bénéfices (stress, production de testostérone, sommeil, énergie, muscle, métabolisme, concentration). Mention « Results are not guaranteed and may vary by individual. »
2. « **HIGH CORTISOL = LOW T.** Modern life keeps cortisol elevated 24/7. Testosterone pays the price. » Bouton : « Click here to reclaim your edge. »
3. « **8 SIGNS OF HIGH CORTISOL IN MEN** » : visage gonflé, réveil à 2-3 h du matin, nuque tendue, peu d'énergie, graisse abdominale tenace, envies de sucre, brouillard mental, libido en baisse. « Reclaim hormonal balance, naturally. » Bouton : « TRY MARS MEN RISK-FREE → »

### L'angle en une ligne (futur hero)
**Le stress de la vie moderne vous vide, et votre testostérone en paie le prix : on cesse de blâmer l'âge, on identifie le vrai coupable, et on essaie sans risque.** Émotion : épuisement et perte de mordant, puis soulagement d'avoir une cause qu'on peut piloter. Offre : essai sans risque (chez Apogée, le Pacte 90 jours).

### Traduction conforme pour Apogée (ce qu'on a le droit de dire)

| Élément de la pub | Version Apogée possible | Base |
|---|---|---|
| « Cortisol drains you » | « Le stress vous vide. » | Éducatif, sans allégation produit |
| « refills the tank » | « Le magnésium et la vitamine B6 contribuent à réduire la fatigue* » | Allégation autorisée UE, déjà utilisée par la marque (`pdp.md:77`) |
| « High cortisol = low T » | « Le stress chronique élève le cortisol, qui freine la sécrétion de testostérone. » | Pédagogie du blog de la marque (`education.md:68`), jamais présentée comme effet du produit |
| « Testosterone production » | « Le zinc contribue au maintien d'un taux normal de testostérone dans le sang* » | Allégation autorisée UE (`pdp.md:64`) |
| Lien produit et stress | « le safran, une plante étudiée pour ses relations avec la réponse au stress » | Formulation exacte de la marque (`pdp.md:71`) : c'est le plafond, pas plus |
| « Try risk-free » | « 90 jours pour essayer. Ou remboursé. » | Garantie réelle (`pdp.md:161-162`) |
| 8 signes | Seulement les signes que le blog de la marque documente : fatigue qui ne cède pas au repos, baisse du désir, brouillard mental, graisse abdominale, sommeil, irritabilité, baisse de motivation, perte de masse musculaire (`education.md:45-59, 199-202`) | « Visage gonflé », « nuque tendue », « envies de sucre » et « réveil à 3 h » n'ont aucun support dans le matériel de la marque : on ne les reprend pas. |

À ne jamais transposer : « refills the tank » au sens d'une recharge hormonale, « reclaim hormonal balance », « Testosterone production » comme bénéfice du produit, et toute promesse sur le cortisol.

---

## 7. Recherche

### 7.1 Comment les hommes décrivent le problème
- **Aucun verbatim client francophone trouvé** dans les recherches (forums et Reddit non indexés pour ces requêtes). Les mots ci-dessous sont des hypothèses à valider avec de vrais avis ou commentaires de pubs.
- Chez le concurrent, les avis clients parlent de se sentir « less drained » vers la 3e semaine ([Trustpilot Mars Men](https://www.trustpilot.com/review/mengotomars.com?page=2)) : le vocabulaire du « vidé » est bien celui du client.
- Les sources médicales francophones décrivent le même trio : « Fatigue, baisse de libido, mauvaise humeur : ces troubles sont rapidement attribués à un déficit en testostérone » ([CSS](https://www.css.ch/fr/clients-prives/ma-sante/corps/sante-hommes/deficit-testosterone.html)) ; le désir « peut baisser temporairement lors de périodes de fatigue ou d'angoisse » ([MSD Manuals](https://www.msdmanuals.com/fr/accueil/probl%C3%A8mes-de-sant%C3%A9-de-l%E2%80%99homme/fonction-sexuelle-et-dysfonction-sexuelle-chez-les-hommes/baisse-de-la-libido-chez-l-homme)).
- Mots probables en français, à tester : « vidé », « à plat », « crevé en permanence », « plus le même », « plus envie », « retrouver du mordant ».

### 7.2 Concurrents et créneau libre
- **Mars Men (US)** : Tongkat Ali (jusqu'à 1 000 mg selon une revue), shilajit, fenugrec ou bore selon les versions ; 89 à 118 $ le flacon ; TrustScore 3,5/5 sur environ 1 000 avis ; **plainte n°1 : les abonnements souscrits sans le vouloir** ([Trustpilot](https://www.trustpilot.com/review/mengotomars.com?page=4), [revue LBEB](https://shop.liftbigeatbig.com/blogs/reviews/mars-men-review), [GNC](https://www.gnc.com/testosterone-booster/619400.html)). Leur formule n'est pas vendable telle quelle en Europe : l'EFSA a conclu en 2021 que la sécurité de l'extrait de Tongkat Ali « n'est pas établie », avec un potentiel d'altération de l'ADN ([EFSA Journal 2021](https://efsa.europa.eu/en/efsajournal/pub/6937)).
- **Marché français** : produits à 18-19 € les 90 gélules qui promettent d'« augmenter la testostérone » sans étude citée ([Atida, N2 Natural Nutrition](https://www.atida.fr/n2-natural-nutrition-booster-de-testosterone-90-capsules.html)), formules « boost » à base de guarana, donc stimulant ([Greenweez, Novoma](https://www.greenweez.com/produit/formule-boost-90-gelules/1NUTI0007)), formules au tribulus ([Greenweez](https://www.greenweez.com/produit/fertilite-masculine-120-gelules/2NUTR0100)). À noter : MuscleTech Alpha Test affiche aussi zinc 15 mg et fenugrec 600 mg ([Fitadium](https://www.fitadium.com/5893-alpha-test-120-caps.html)) : les doses seules ne différencient pas.
- **Le créneau d'Apogée** : la seule proposition à la fois sans stimulant, sans actif douteux, fabriquée en France, avec des doses affichées, des allégations strictement réglementaires et un essai de 90 jours. Face à une catégorie de « boosters » qui surpromet, **l'honnêteté est l'argument**. C'est aussi ce que dit sante.fr : « peu d'études confirment les promesses de ces compléments » ([sante.fr](https://www.sante.fr/node/8471723)).
- **Prix** : 49 €/mois, au-dessus du marché français de masse et en dessous du premium US. Il faut le justifier par les 7 actifs dosés, la fabrication française et le Pacte.

### 7.3 Objections principales (et réponse disponible)
1. « Encore un booster bidon. » → Transparence totale, « Ce n'est pas un raccourci », allégations limitées à ce qui est autorisé.
2. « L'abonnement, c'est un piège. » (plainte n°1 chez le concurrent) → Conditions affichées **avant** le bouton : tous les 30 jours, « Gérez, suspendez ou résiliez… ». Les modalités exactes sont à confirmer (section 10).
3. « 49 € par mois, c'est cher. » → 1,63 € par jour, 7 actifs, livraison offerte, 90 jours pour juger.
4. « Ça marche en combien de temps ? » → La marque elle-même donne 8 à 12 semaines pour la micronutrition (`education.md:211`) ; le Pacte couvre 90 jours, « le temps qu'une prise de sang de contrôle donne un vrai verdict » (`education.md:252`).
5. « C'est dangereux, ce sont des hormones ? » → Aucune hormone, aucun stimulant, contre-indications affichées.
6. « C'est l'âge, on n'y peut rien. » → « Ce n'est pas une sentence. C'est un mécanisme qui se comprend et, en grande partie, se pilote. »
7. « Je devrais plutôt voir un médecin. » → La marque est d'accord et le dit (`education.md:44, 97-99`) : c'est un argument de confiance, pas un frein.

### 7.4 Ce que les preuves soutiennent vraiment (pour ne jamais surpromettre)
- **Zinc** : allégation UE autorisée (maintien d'un taux normal de testostérone). L'étude de référence montre une hausse seulement chez des hommes âgés **légèrement carencés** (n = 9) ([Prasad 1996, PubMed](https://pubmed.ncbi.nlm.nih.gov/8875519/)). Sans carence, pas d'effet attendu ([sante.fr](https://www.sante.fr/node/8471723)). On dit « contribue au maintien d'un taux normal », jamais « augmente ».
- **Fenugrec** : effet faible sur la testostérone totale dans les méta-analyses (DMS 0,32 sur 7 études en 2023 ; DMS 0,25 en 2026, certitude jugée incertaine) ([PubMed 37253363](https://pubmed.ncbi.nlm.nih.gov/37253363/), [Frontiers 2026](https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2026.1903508/full)). Aucune allégation autorisée (plantes « en attente »). Rien sur la page.
- **Shilajit** : un seul essai (75 hommes de 45 à 55 ans, 500 mg/j d'un extrait de marque, 90 jours, environ +20 % de testostérone totale face au placebo), qualifié de préliminaire par les auteurs ([NutraIngredients](https://www.nutraingredients.com/Article/2015/10/06/Shilajit-supplements-may-boost-testosterone-for-healthy-men-RCT/)). Rien n'indique que le shilajit d'Apogée soit cet extrait. **Ce chiffre ne va pas sur la page** (le blog le cite pourtant, voir section 10).
- **Safran** : preuves sur l'humeur et l'anxiété (méta-analyse de 23 essais, 4 à 12 semaines) ; preuves sur le cortisol limitées, aucune méta-analyse à 28 mg ([Frontiers in Nutrition 2020](https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2020.606124/pdf)). **Jamais « baisse le cortisol » ni « réduit le stress ».**
- **Cortisol et testostérone** : relation inverse documentée sur le plan physiologique (une perfusion de cortisol abaisse la testostérone, [Brownlee 2005, JSSM](https://jssm.org/jssm-04-76.xml-Fulltext)). C'est utilisable comme pédagogie, jamais comme effet du produit.
- **Magnésium, B6, D3** : allégations UE autorisées (fatigue, activité hormonale, fonction musculaire). La marque ne les utilise pas toutes : Mg et B6 « contribuent à une fonction psychologique normale » existe aussi et colle à l'angle stress, mais il faut l'accord du client (section 10).

---

## 8. Conformité (complément alimentaire : mode réglementé activé)

Un manquement (allégation de maladie, avertissement absent, statistique inventée) plafonne le score QC à 79.

### Avertissement à reproduire mot pour mot en pied de page
« Les compléments alimentaires ne sont pas des médicaments et ne peuvent pas se substituer à un régime alimentaire varié et équilibré, ni à un mode de vie sain. Ne pas dépasser la dose journalière recommandée. Déconseillé aux personnes sous traitement antidiabétique. Tenir hors de portée des jeunes enfants. Déconseillé aux femmes enceintes et allaitantes. En cas de traitement médical, demandez l'avis de votre médecin. » (`education.md:271`)

Plus : « Les allégations de santé portent sur les nutriments concernés (zinc, magnésium, vitamines D3 et B6). » (`pdp.md:139`) et « Les études citées portent sur les ingrédients, pas sur Apogée Men. » (`pdp.md:86`).

### Allégations autorisées (texte exact de la marque, toujours suivies de « * »)
- « Le zinc contribue au maintien d'un taux normal de testostérone dans le sang. » (`pdp.md:64`)
- « Le magnésium et la vitamine B6 contribuent à réduire la fatigue. » (`pdp.md:77`)
- « Le magnésium et la vitamine D contribuent au maintien d'une fonction musculaire normale. » (`pdp.md:79`)
- « La vitamine B6 contribue également à réguler l'activité hormonale. » (`pdp.md:81`)

Marqueur : « * » renvoyant à la note « *Les allégations de santé portent sur les nutriments concernés… ». La page produit collée ne montre pas d'astérisque explicite ; la convention est à confirmer avec le client.

### Interdit sur la page
- Traiter, guérir, prévenir ou diagnostiquer quoi que ce soit (hypogonadisme, andropause, dépression, « cortisol élevé » comme état à soigner). Seule exception : l'avertissement lui-même.
- « Booster », « augmente la testostérone », « baisse le cortisol », « réduit le stress », « rééquilibre vos hormones ».
- Toute allégation sur une plante (fenugrec, shilajit, safran), au-delà de la formulation de la marque sur le safran.
- Le chiffre « +20,45 % » (shilajit), toute courbe de testostérone, « cliniquement prouvé ».
- La marque déposée « Testofen® » (citée sur la page produit, `pdp.md:134`).
- Les images qui portent des allégations non autorisées (section 9).

### Conformité de l'abonnement
Le droit français impose une information claire sur la reconduction et, pour un contrat conclu en ligne, une résiliation possible en ligne. La page affiche les conditions avant le bouton. Si la résiliation se fait en quelques clics depuis le compte, c'est un argument à mettre en avant (à confirmer).

---

## 9. Inventaire des images

| Fichier | Contenu | Format | Usage prévu |
|---|---|---|---|
| `imgi_55_Gemini…webp` | Flacon et gélules en lévitation, lueur dorée, fond sombre ; moitié gauche libre pour le texte | 1376×768 | **Hero** (plein cadre, texte à gauche) |
| `imgi_11_f2c29d08….png` | Flacon détouré, **fond transparent** | 1024×1024 | Bloc d'achat, CTA collant, panier |
| `imgi_24_f2c29d08….png` | Flacon détouré, fond transparent | 900×900 | Galerie du bloc d'achat |
| `imgi_3_Design_sans_titre_49.png` | Gélule éclatée en poudre, **fond transparent** | 800×1103 | **Bande signature** : gélule annotée avec des repères numérotés **conformes**, refaits en HTML |
| `imgi_2_ChatGPT_Image….webp` | Homme au sommet d'une montagne, flacon en main, coucher de soleil | 1254×1254 | Moment de vie, bande marque ou CTA final (« au sommet ») |
| `imgi_12_…Premium.webp` / `imgi_26_…Premium.webp` | Flacon et 4 pictos : « Soutient la concentration », « Soutient la performance », « Énergie au quotidien », « Aide à préserver vos gains » | 500×500 / 352×352 | **Non utilisée** : allégations non autorisées incrustées |
| `imgi_28_Capsule_doree….webp` | Gélule annotée par actif, dont « Shilajit : soutient naturellement la vitalité et les performances physiques et mentales », « Fenugrec : contribue au maintien de l'équilibre hormonal naturel » | 352×352 | **Non utilisée** : allégations sur des plantes, en contradiction avec la ligne de la marque (`education.md:229`) |

`imgi_2` et `imgi_55` sont des images générées par IA (noms de fichier). Elles conviennent comme visuels d'ambiance, mais l'homme de `imgi_2` ne doit jamais être présenté comme un client.

---

## 10. À fournir par le client

1. **Les pubs Apogée** : quelle pub (texte exact) enverra le trafic ? Le hero doit reprendre sa promesse mot pour mot.
2. **6 à 8 vrais avis** (prénom, contexte, accord de publication) et, s'il en existe, la note moyenne et le nombre d'avis, avec leur périmètre (produit ou site).
3. **Le Pacte 90 jours, mot pour mot** : la page produit dit « selon les conditions de notre garantie », le blog dit « remboursement intégral de la première commande, sans justification ». Laquelle fait foi ? Limité à la 1re commande ? Faut-il renvoyer le pot ?
4. **L'abonnement** : sans engagement ? Comment résilier (en ligne, en quelques clics) ? Le prix est-il garanti ?
5. **L'achat unique** existe-t-il, et à quel prix ?
6. **Nombre de gélules par pot et dose par jour**, ainsi que **les réponses de la FAQ** (seules les questions ont été copiées).
7. **Âge cible** : la FAQ dit « plus de 18 ans », le blog « plus de 35 ans ».
8. **« Testé en laboratoire »** : quel laboratoire, quels tests (pureté, métaux lourds, dosages) ? C'est une preuve forte si elle est précise.
9. **Formes des actifs** : zinc (bisglycinate ?), magnésium, D3, extrait de safran, extrait de shilajit.
10. **Vitamine D3 à 2000 UI (50 µg/jour)** : à vérifier par rapport à la dose maximale française en vigueur (arrêté du 9 mai 2006 en cours de révision).
11. **Images 12, 26 et 28** : elles portent des allégations non autorisées et sont probablement sur le site en ligne. Il faut les remplacer.
12. **Blog** : le « +20,45 % » du shilajit et la mention « Testofen® » sont à faire relire par un juriste.
13. **Cohérence** : la B6 est à 1,9 mg alors que le blog cite 2,8 mg/jour comme « dose efficace » (`education.md:226`) ; le blog parle de « 3 voies », la page produit de 4 axes. Lequel retenir ?
14. **Allégation « fonction psychologique normale »** (magnésium et B6) : la marque l'autorise-t-elle ? Elle renforcerait l'angle stress en restant conforme.
15. **Identifiants Shopify** : domaine `.myshopify.com`, ID produit, ID variante, ID du plan d'abonnement (selling plan).
16. **Autorité** : citations d'experts ou de presse avec logos (aucune dans le matériel). Sans elles, la bande d'autorité est retirée.
17. **Fondateur ou mission** : rien dans le matériel. La bande marque utilisera la signature « Votre vitalité, au sommet » et le positionnement contre la catégorie.
18. **Mentions légales** : raison sociale et contact pour le pied de page.

### Ajouts après la construction de la page (`lp/`)
19. **Texte exact de la pub Apogée** qui enverra le trafic : la page reprend l'angle des pubs Mars Men. Phrase de pub proposée, alignée sur le hero : « Stress chronique = cortisol en hausse. Et c'est la testostérone qui paie la note. »
20. **Relecture juridique** de trois formulations : le titre « testostérone sous pression » (allégation implicite, appuyée par l'allégation zinc et la question 1 de la FAQ), le graphique « délai de résultat » (repris du tableau du blog) et la ligne « Présents dans certaines formules « boost » » du comparatif.
21. **URL des pages légales** : la page utilise les chemins Shopify standards (`/policies/terms-of-service`, `/policies/privacy-policy`, `/policies/legal-notice`, `/pages/contact`). À confirmer.
22. **Tester le vrai paiement** une fois les identifiants Shopify posés : le lien panier est construit et testé (`/cart/{variante}:{quantité}?selling_plan={plan}`), mais le domaine de la boutique est inaccessible depuis l'environnement de construction.

---

## 11. Recommandation de type de page (pour l'étape 3)

- Pub 3 (« 8 signes ») = autodiagnostic → **listicle** ou **quiz**.
- Pub 2 (« High cortisol = low T ») = un cadre de pensée → **listicle**.
- Pub 1 (« Cortisol drains you ») = le produit → **page de conversion**.

Recommandation : **B) Listicle**, « 8 signes que le stress vous vide ». Il reprend la pub 3 point par point et le cadre de la pub 2. Le format pédagogique permet de dire des choses fortes et sourcées (le mécanisme stress-cortisol-testostérone, tiré du blog de la marque) sans jamais en faire une promesse produit. Le produit arrive ensuite avec ses allégations autorisées et le Pacte. Pour du trafic froid sur une catégorie réglementée et sceptique, c'est le format qui convertit sans surpromettre.

---

# Lancement 2 (19/10/2026) : page modelée sur Mars Men « boost-fb »

## 12. Règles de copywriting (`client-assets/copywriting/`)

Source : « MARS MEN — Collection des insights stratégiques ».

**La North Star retenue pour Apogée** : « Il ne veut pas redevenir jeune. Il veut redevenir lui-même. » Le vrai problème n'est pas la perte d'énergie, c'est la perte d'identité : l'homme ne se reconnaît plus et refuse d'en faire sa nouvelle normalité.

**Les 4 manifestations** (à relier chacune à une preuve autorisée, jamais à une promesse) :
- Énergie : avoir encore des ressources après le travail. Preuve : magnésium et B6, fatigue*.
- Force : rester capable de s'entraîner. Preuve : magnésium et vitamine D, fonction musculaire normale*.
- Motivation : retrouver l'envie de faire des choses. Pas d'allégation autorisée : rester sur le terrain émotionnel.
- Confiance : se reconnaître à nouveau. Pas d'allégation autorisée : rester sur le terrain émotionnel.

**Architecture** : le désir précède le produit ; la testostérone est le mécanisme, pas le désir final ; une seule transformation, plusieurs portes d'entrée selon le niveau de conscience.

**Mots et formulations à utiliser** : redevenir soi-même, se reconnaître, l'élan, le répondant, garder de l'énergie pour ce qui compte, « Vos meilleures années ne sont pas derrière vous », « Vous avez encore beaucoup à donner », « Vos ambitions n'ont pas d'âge ».

**Conflits signalés (non utilisables tels quels)** :
- Règles Meta : « vous » + un état (« votre corps ne suit plus », « finir sur les rotules ») et les âges explicites (« après 35 ans », « à 40 ans »). Reformuler de façon générale.
- Règles UE : « Libérez votre testostérone », la progression Jour 7 / 30 / 90 présentée comme des résultats.
- Positionnement Apogée : « fuel your masculine edge with boost » (dernière ligne du document). Apogée se pose contre les « boosters ».

## 13. Référence : Mars Men `/pages/boost-fb`

Fichiers : `client-assets/reference/listicle.md` (texte, 117 images intégrées) et la capture pleine page. C'est la page de vente longue de Mars Men pour le trafic Facebook, probablement celle où mènent leurs pubs « cortisol ». Ce n'est pas un listicle éditorial : c'est une page produit directe, bâtie autour d'une section « 5 raisons ».

| # | Section Mars Men | Son rôle | Équivalent Apogée | Statut |
|---|---|---|---|---|
| 1 | Bandeau « -50 % + cadeaux » et compte à rebours | Urgence | Livraison offerte · 90 jours pour essayer | Remplacé : aucune remise, et un faux compte à rebours est une pratique trompeuse |
| 2 | « 4,77/5 · 3M+ flacons vendus » | Preuve sociale immédiate | Fabriqué en France · Testé en laboratoire · Le Pacte 90 jours | Remplacé tant qu'il n'y a pas d'avis |
| 3 | Titre produit direct + 3 puces + bouton | Dire tout de suite ce que c'est | Titre direct, territoire « redevenir soi-même », 3 puces vraies | À écrire (étape 4) |
| 4 | Bandeau défilant de bénéfices (« Boost T », « Build muscle »…) | Rythme, mots-clés | Faits défilants : 7 actifs · Sans stimulant · Doses affichées · Fabriqué en France | Remplacé : les bénéfices Mars sont des allégations interdites |
| 5 | **« 5 raisons »** en carrousel | Le cœur persuasif | 5 raisons vraies, en liste verticale (un carrousel cache 4 raisons sur 5 sur mobile) | À adapter (détail ci-dessous) |
| 6 | « 11 ingrédients, 4 façons d'agir » + « The Stack » + « The Feeling » + badges | Mécanisme et formule | Les 4 axes de la marque, les doses phares, « Le temps » (8 à 12 semaines) | Disponible ; « The Feeling » est une promesse : remplacé |
| 7 | Logos presse (GQ, Men's Health, Forbes) | Autorité | Aucun | Absent : jamais inventé |
| 8 | Experts et athlètes | Autorité | Aucun | Absent |
| 9 | « 503 128 hommes », 5 117 avis, résultats d'analyses | Preuve sociale | Bloc avis masqué | Absent, et des taux de testostérone sur des avis seraient des allégations interdites, même vrais |
| 10 | Avant/après physiques | Preuve visuelle | Aucun | Interdit (Meta et UE), définitivement |
| 11 | Témoignages chiffrés (« I feel 25 again ») | Preuve | Avis réels plus tard, sans chiffre de santé | Absent |
| 12 | Carrousel des 11 ingrédients (dose + bénéfice) | Transparence | Les 7 actifs, dose + allégation autorisée (nutriments) ou description neutre (plantes) | Disponible |
| 13 | Comparatif Mars / traitement hormonal / boosters génériques | Se distinguer | Comparatif Apogée / catégorie | Disponible ; la comparaison avec un traitement hormonal est écartée (présenterait le complément comme une alternative à un médicament) |
| 14 | « Pas de mélange propriétaire / pas de dose cachée / ne coupe pas votre T » + médecins | Réassurance | « Pas de mélange propriétaire / Pas de dose cachée / Pas d'hormone ni de stimulant » | Disponible, sans médecins |
| 15 | FAQ (11 questions) | Objections | FAQ Apogée | Disponible ; réponses officielles de la marque toujours à fournir |
| 16 | Bouton + garantie après chaque section | Faire avancer | Bouton + « 90 jours pour essayer. Ou remboursé. » | À reprendre : bon motif |

**Les 5 raisons adaptées à Apogée** (vraies et conformes) :
1. Mars : « Don't take T. Make T. » → **Pas d'hormone. Des nutriments.** Aucune hormone ni stimulant ; le zinc contribue au maintien d'un taux normal de testostérone dans le sang*.
2. Mars : « Lose the fat. Keep your muscle. » → **Gardez l'élan à l'entraînement.** Magnésium et vitamine D, fonction musculaire normale*. Aucune promesse de perte de poids ou de muscle.
3. Mars : « Don't let cortisol steal your T. » → **Le stress use. La formule en tient compte.** Le mécanisme (pédagogie du blog) et le safran, avec la formulation de la marque.
4. Mars : « Everything listed on the label. » → **Tout est sur l'étiquette.** 7 actifs, chaque dose affichée. C'est l'avantage le plus solide d'Apogée.
5. Mars : « Start today. Give it 90 days. » → **90 jours pour juger. Ou remboursé.** Le Pacte.

**Ce qu'on améliore par rapport à la référence** : pas de fausse urgence, pas de chiffre invérifiable, les 5 raisons visibles d'un coup sur mobile, une allégation autorisée par raison au lieu d'une promesse.
