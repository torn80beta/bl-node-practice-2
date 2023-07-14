const express = require('express');
const path = require('path');
const connectDb = require('../config/connectDb');
require('colors');
const errorHandler = require('./middlewares/errorHandler');
const asyncHandler = require('express-async-handler');
const userModel = require('./models/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middlewares/authMiddleware');
const rolesModel = require('./models/rolesModel');

const configPath = path.join(__dirname, '..', 'config', '.env');
require('dotenv').config({ path: configPath });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', require('./routes/carsRoutes'));

// Registration - adding new user to DB.
// Authentification - Перевірка донних ввенедих користувачем з данними які зберігаються в базі.
// Authorization - Перевірка прав доступу користувача.
// LogOut - Вихід із системи.

app.post(
  '/register',
  asyncHandler(async (req, res) => {
    // отримуємо данні від користувача
    const { name, email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Provide all required fields!');
    }

    // перевіряємо чи є такий користувач в базі
    const candidate = await userModel.findOne({ email });

    // якщо знайшли, повідомляємо що користувач з таким ім'ям вже існує
    if (candidate) {
      res.status(400);
      throw new Error('User already exists');
    }

    // якщо не знайшли, хешуємо пароль
    const hashPassword = bcrypt.hashSync(password, 5);
    // console.log(hashPassword);

    // зберігаємо данні користувача в базі
    const roles = await rolesModel.findOne({ value: 'ADMIN' });
    const user = await userModel.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.value],
    });

    res.status(201).json({
      code: 201,
      message: 'success',
      data: { email: user.email },
    });
  })
);

app.post(
  '/login',
  asyncHandler(async (req, res) => {
    // отримуємо данні від користувача
    const { name, email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Provide all required fields!');
    }

    // перевіряємо чи є такий користувач в базі
    const user = await userModel.findOne({ email });
    let isValidPassword;

    // Розшифровуємо пароль
    if (user) {
      isValidPassword = bcrypt.compareSync(password, user.password);
    }

    // Якщо не знайшли або не розшифрували викидаємо помилку не вірний логін або пароль.
    if (!user || !isValidPassword) {
      res.status(400);
      throw new Error('Невірний логін або пароль!');
    }
    // Якщо все добре - присвоюємо користувачу токен і зберігаємо в базі з токеном.

    const token = generateToken({
      friends: ['Alex', 'Alex', 'Kirill'],
      id: user._id,
      roles: user.roles,
    });
    user.token = token;
    await user.save();
    res.status(200).json({
      code: 200,
      message: 'success',
      data: { email: user.email, token: user.token },
    });
  })
);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, 'pizza', { expiresIn: '5h' });
}

app.get(
  '/logout',
  authMiddleware,
  asyncHandler(async (req, res) => {
    // res.send(req.user);
    const id = req.user.id;
    const user = await userModel.findById(id);
    user.token = null;
    await user.save();
    res.status(200).json({
      code: 200,
      message: 'Logout success',
    });
  })
);

app.use(errorHandler);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`.green.bold.italic);
});
