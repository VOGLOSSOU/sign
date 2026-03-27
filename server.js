const express = require('express');
const multer  = require('multer');
const { execFile } = require('child_process');
const path = require('path');
const fs   = require('fs');
const os   = require('os');

const app    = express();
const upload = multer({ dest: os.tmpdir(), limits: { fileSize: 100 * 1024 * 1024 } });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/convert', upload.single('doc'), (req, res) => {
  if (!req.file) return res.status(400).send('Pas de fichier.');

  const tmpPath  = req.file.path;
  const origExt  = path.extname(req.file.originalname).toLowerCase();
  const named    = tmpPath + origExt;

  fs.rename(tmpPath, named, err => {
    if (err) return res.status(500).send('Erreur interne.');

    execFile('libreoffice', [
      '--headless', '--convert-to', 'pdf', '--outdir', os.tmpdir(), named
    ], (err, _stdout, stderr) => {
      fs.unlink(named, () => {});

      if (err) {
        console.error(stderr);
        return res.status(500).send(
          'Conversion échouée. LibreOffice est-il installé ?\n' +
          'Sinon, importez directement un PDF.'
        );
      }

      const pdfPath = path.join(os.tmpdir(), path.basename(named, origExt) + '.pdf');

      if (!fs.existsSync(pdfPath))
        return res.status(500).send('PDF converti introuvable.');

      res.sendFile(path.resolve(pdfPath), err2 => {
        fs.unlink(pdfPath, () => {});
        if (err2 && !res.headersSent) res.status(500).send('Erreur envoi.');
      });
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`\n  ✓  http://localhost:${PORT}\n`));
