# Sign

**Signez vos documents en moins d'une minute.**

Pas de compte. Pas de landing page. Pas de bla-bla.
Vous ouvrez, vous signez, vous téléchargez. C'est tout.

---

## Utilisation

```bash
npm install
npm start
```

Puis ouvrez **http://localhost:3000** dans votre navigateur.

---

## Comment ça marche

**1 — Déposez votre document**
Glissez-déposez ou cliquez pour choisir un fichier.
Formats supportés : PDF, Word (`.doc`, `.docx`), OpenDocument (`.odt`, `.pptx`…)

**2 — Signez où vous voulez**
Cliquez sur **Signer**, puis cliquez à l'endroit exact du document où vous souhaitez apposer votre signature. Un pad de dessin s'ouvre — signez à la souris ou au stylet.

**3 — Téléchargez**
Cliquez sur **Télécharger**. Vous obtenez un PDF avec votre signature embarquée, en noir, bien visible.

Vous pouvez placer autant de signatures que vous voulez, les déplacer, les supprimer.
`Echap` annule le mode signature à tout moment.

---

## Prérequis

- [Node.js](https://nodejs.org) 18+
- [LibreOffice](https://www.libreoffice.org) — uniquement pour convertir les fichiers Word/ODT

```bash
# Ubuntu / Debian
sudo apt install libreoffice

# macOS
brew install --cask libreoffice
```

Les fichiers PDF ne nécessitent aucune dépendance supplémentaire.

---

## Stack

- **Serveur** — Node.js + Express + LibreOffice (conversion)
- **Rendu PDF** — [PDF.js](https://mozilla.github.io/pdf.js/)
- **Dessin** — [Signature Pad](https://github.com/szimek/signature_pad)
- **Intégration signature** — [pdf-lib](https://pdf-lib.js.org/)
- Zéro framework. Zéro base de données. Zéro cloud.
