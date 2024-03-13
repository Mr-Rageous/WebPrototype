import express from "express";
import path from 'path';
import url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();
const port = 3000;
app.use(express.static(__dirname));
app.listen(port, () => console.log(`App listening on port ${port}`));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
//# sourceMappingURL=app.js.map