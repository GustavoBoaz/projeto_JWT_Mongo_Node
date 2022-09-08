const connection = require('./connection');

class User {
  constructor() {
    this._id = null;
    this._name = null;
    this._age = null;
  }

  init(id, name, age) {
    this._id = id;
    this._name = name;
    this._age = age;
  }

  findUserByName(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await connection();
        const user = await db.collection('authors').findOne({ username });
        if (!user) return resolve(null);

        resolve(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  createUser(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await connection();
        const result = db.collection('authors').insertOne({
          "username": username,
          "password": password
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = User;
