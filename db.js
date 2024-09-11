const sql = require("mysql2");

const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Deepu@99",
  database: "test",
});

function getMobiles(id) {
  return new Promise(function (resolve, reject) {
    if (id) {
      connection.query(
        `SELECT * FROM mobiles WHERE id= ?`,
        id,
        function (err, row, cols) {
          if (err) reject(err);
          else resolve(row);
        }
      );
    } else {
      connection.query(`SELECT * FROM mobiles`, function (err, rows, cols) {
        if (err) reject(err);
        else resolve(rows);
      });
    }
  });
}

function checkMobile(name) {
  return new Promise(function (resolve, reject) {
    connection.query(
      `SELECT * FROM mobiles WHERE name=? `,
      [name],
      function (err, row, cols) {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

function addMobile(name, price, ram, storage) {
  return new Promise(function (resolve, reject) {
    checkMobile(name)
      .then((res) => {
        if (res.length > 0) reject(409);
        else {
          connection.query(
            `INSERT INTO mobiles (name,price,ram,storage) VALUES (?,?,?,?)`,
            [name, price, ram, storage],
            function (err, res) {
              if (err) reject(500);
              else resolve(201);
            }
          );
        }
      })
      .catch(() => {
        reject(500);
      });
  });
}

function updateMobile(name, price, ram, storage, id) {
  return new Promise(function (resolve, reject) {
    getMobiles(id)
      .then((rows) => {
        if (rows.length > 0) {
          connection.query(
            `UPDATE mobiles SET  name=?,price=?,ram=?,storage=? WHERE id=?`,
            [name, price, ram, storage, id],
            function (err, res) {
              if (err) reject(500);
              else resolve();
            }
          );
        } else reject(404);
      })
      .catch(() => reject(500));
  });
}
function deleteMobile(id) {
  return new Promise(function (resolve, reject) {
    getMobiles(id)
      .then((rows) => {
        if (rows.length > 0) {
          connection.query(
            `DELETE FROM mobiles WHERE id=?`,
            [id],
            function (err, res) {
              if (err) reject(500);
              else resolve(204);
            }
          );
        } else {
          reject(404);
        }
      })
      .catch(() => reject(500));
  });
}

exports = module.exports = {
  getMobiles,
  addMobile,
  updateMobile,
  deleteMobile,
};