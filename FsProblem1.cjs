const fs = require("fs");

function createf(path) {
  return new Promise((res, rej) => {
    fs.writeFile(path, "[]", (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

function deletef(path) {
  return new Promise((res, rej) => {
    fs.unlink(path, (err) => {
      if (err) rej(err);
      else res();
    });
  });
}

function rec(path, start, end) {
  let temp_path = `${path}/file${start}.json`;
  createf(temp_path)
    .then((data) => {
      console.log("file created" + start);
      return deletef(temp_path);
    })
    .then((data) => {
      console.log("file deleted");
      if (start < end) return rec(path, start + 1, end);
    });
}

function base(path, number) {
  rec(path, 1, number);
}
module.exports = base;
