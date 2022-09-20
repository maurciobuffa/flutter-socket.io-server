const { v4: uuidV4 } = require('uuid');

class Band {
  constructor(name = "no-name", genre) {
    this.id = uuidV4();
    this.name = name;
    this.genre = genre;
    this.votes = 0;
  }
}

module.exports = Band;