import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
  create: (newUser, result) => {
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    db.query('INSERT INTO `users` SET ?', newUser, (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.insertId);
      }
    });
  },

  findByEmail: (email, result) => {
    db.query('SELECT * FROM `users` WHERE email = ?', [email], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  },

  findById: (id, result) => {
    db.query('SELECT * FROM `users` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  },

  getAll: (result) => {
    db.query('SELECT * FROM `users`', (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    });
  },

  updateById: (id, updatedUser, result) => {
    // Jika password akan diupdate, lakukan hashing ulang
    if (updatedUser.password) {
      const salt = bcrypt.genSaltSync(10);
      updatedUser.password = bcrypt.hashSync(updatedUser.password, salt);
    }

    db.query('UPDATE `users` SET ? WHERE id = ?', [updatedUser, id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },

  deleteById: (id, result) => {
    db.query('DELETE FROM `users` WHERE id = ?', [id], (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res.affectedRows);
      }
    });
  },
};

export default User;
