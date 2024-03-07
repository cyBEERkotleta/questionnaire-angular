const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist/angular-questionnaire')));
app.listen(process.env.PORT || 4200);

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/angular-questionnaire/'});
})

console.log('Console listening!');
