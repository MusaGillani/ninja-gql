import _db from "../_db";
export const resolvers = {
  Query: {
    games() {
      return _db.games;
    },
    reviews() {
      return _db.reviews;
    },
    authors() {
      return _db.authors;
    },
    review(_parent, args, _context) {
      return _db.reviews.find((i) => i.id === args.id);
    },
    game(_parent, args, _context) {
      return _db.games.find((i) => i.id === args.id);
    },
    author(_parent, args, _context) {
      return _db.authors.find((i) => i.id === args.id);
    },
  },
  //   resolvers to handle in case a "parent query" asks for reviews
  //   inside a game
  Game: {
    // parent has the result of the query run by the parent query resolver
    reviews(parent) {
      return _db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return _db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return _db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return _db.games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_parent, args, _context) {
      _db.games = _db.games.filter((g) => g.id !== args.id);
      return _db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      _db.games.push(game);
      return game;
    },
    updateGame(_, args) {
      _db.games = _db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }
        return g;
      });
      return _db.games.find((g) => g.id === args.id);
    },
  },
};
