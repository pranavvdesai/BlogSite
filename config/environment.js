// // require('dotenv').config({path: '../.env'})


// const development = {
//   name: "development",
//   asset_path: "./assets",
//   session_cookie_key: "choot",
//   db: "socials_db",
//   smtp: {
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // use SSL
//     auth: {
//       user: "theimmortallucifer@gmail.com",
//       pass: "immortallucifer",
//     },
//   },
//   clientID:
//     "429877536839-5vvdb4ikjq04cc9a6ojoa5ntek6sb3rl.apps.googleusercontent.com",
//   clientSecret: "dvq33rumXRGwcSuxT7fJ3rhy",
//   callbackURL: "http://localhost:8000/auth/google/callback",
//   jwt_secret: "pronob",
// };

// const production = {
//   name: "production",
//   asset_path: process.env.ASSET_PATH,
//   session_cookie_key: process.env.SESSION_COOKIE_KEY,
//   db: process.env.PROD_DB,
//   smtp: {
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // use SSL
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASSWORD,
//     },
//   },
//   clientID:process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
//   jwt_secret: process.env.JWT_SECRET,
// };

// module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
