const { sequelize, User, Item, Offer } = require('./models');

(async () => {
  await sequelize.sync({ force: true });

  const u1 = await User.create({ name: 'Ravisha', email: 'ravisha@test.com', phone: '9999999991' });
  const u2 = await User.create({ name: 'Sneha', email: 'sneha@test.com', phone: '9999999992' });
  const u3 = await User.create({ name: 'Priya', email: 'priya@test.com', phone: '9999999993' });

  const i1 = await Item.create({ title: 'Engineering Maths Book', description: 'Good condition', price: 250, category: 'books', UserId: u1.id });
  const i2 = await Item.create({ title: 'Scientific Calculator', description: 'Casio fx-991', price: 600, category: 'electronics', UserId: u1.id });
  const i3 = await Item.create({ title: 'Cycle', description: 'Used for 1 year', price: 3000, category: 'vehicles', UserId: u2.id });

  await Offer.create({ amount: 200, message: 'Can you do 200?', ItemId: i1.id, UserId: u2.id });
  await Offer.create({ amount: 220, message: 'I can take it today', ItemId: i1.id, UserId: u3.id });
  await Offer.create({ amount: 2500, message: 'Is it negotiable?', ItemId: i3.id, UserId: u1.id });

  console.log('Seed data added!');
  process.exit();
})();