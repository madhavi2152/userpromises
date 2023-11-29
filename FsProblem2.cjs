const fs = require("fs");

function readf(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function writef(data, path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      else resolve("data successfuly written to file", path);
    });
  });
}

function appendf(data, path) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, (err) => {
      if (err) reject(err);
      else resolve("file successfuly appended");
    });
  });
}

function deletef(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) reject(err);
      else resolve("sucessfuly deleted" + path);
    });
  });
}

function base(path) {
  readf(path)
    .then((data) => {
      data = data.toUpperCase();
      return writef(data, "/home/madvi/Documents/user_promises/upper.txt");
    })
    .then(() => {
      return writef(
        "upper.txt",
        "/home/madvi/Documents/user_promises/filename.txt"
      );
    })
    .then(() => {
      return readf("/home/madvi/Documents/user_promises/upper.txt");
    })
    .then((data) => {
      data = data.toLowerCase();
      data = data.split(".").join(". \n");
      return writef(data, "/home/madvi/Documents/user_promises/newline.txt");
    })
    .then(() => {
      return appendf(
        "\n" + "newline.txt",
        "/home/madvi/Documents/user_promises/filename.txt"
      );
    })
    .then(() => {
      return readf("/home/madvi/Documents/user_promises/upper.txt");
    })
    .then((data) => {
      return writef(data, "/home/madvi/Documents/user_promises/sort.txt");
    })
    .then(() => {
      return readf("/home/madvi/Documents/user_promises/newline.txt");
    })
    .then((data) => {
      return appendf(data, "/home/madvi/Documents/user_promises/sort.txt");
    })
    .then(() => {
      return readf("/home/madvi/Documents/user_promises/sort.txt");
    })
    .then((data) => {
      data = data.split(" ").sort().join(" ");
      return writef(data, "/home/madvi/Documents/user_promises/sort.txt");
    })
    .then(() =>
      appendf(
        "\n" + "sort.txt",
        "/home/madvi/Documents/user_promises/filename.txt"
      )
    )
    .then(() => {
      return readf("/home/madvi/Documents/user_promises/filename.txt");
    })
    .then((data) => {
      data = data.split("\n");
      for (i in data) {
        const path = `/home/madvi/Documents/user_promises/${data[i]}`;
        deletef(path);
      }
    });
}

module.exports = base;
