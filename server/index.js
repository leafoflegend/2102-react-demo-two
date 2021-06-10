const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path);

  next();
});


const colors = [
  'goldenrod',
  'aquamarine',
  'hotpink',
  'crimson',
  'black',
];

const selectRandomColorOutOfArray = () => colors[Math.floor(Math.random() * colors.length)];

const createListOfColors = () => {
  const arr = new Array(Math.ceil(Math.random() * 100)).fill('');

  return arr.map((el, i) => {
    return {
      id: i,
      color: selectRandomColorOutOfArray(),
    };
  });
}

app.get('/api/colors', (req, res, next) => {
  const randomListOfColors = createListOfColors();

  res.send({
    colors: randomListOfColors,
  });
});

app.listen(PORT, () => {
  console.log('Server is now listening on PORT:', PORT);
});
