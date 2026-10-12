const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Marketplace API is running');
});

   app.use('/api/users', require('./routes/userRoutes'));
   app.use('/api/items', require('./routes/itemRoutes'));
   app.use('/api/offers', require('./routes/offerRoutes'));

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database connected and tables created');
    app.listen(process.env.PORT, () =>
      console.log('Server running on port ' + process.env.PORT));
  })
  .catch(err => console.log('DB error:', err.message));