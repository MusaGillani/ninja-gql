import _db from "../_db";

import {
  AuthorType,
  GameType,
  MutationType,
  QueryType,
  ResolverTypes,
  ReviewType,
} from "./schema";
// import { resolvers as resolverMethods } from "../graphqlSDL";

export const resolvers: ResolverTypes = {
  Query: {
    authors: (parent, args, context, info) => _db.authors as AuthorType[],
    author: (parent, args, context, info) =>
      _db.authors.find((i) => i.id === args.id) as AuthorType,
    games: (parent, args, context, info) => _db.games as GameType[],
    game: (parent, args, context, info) =>
      _db.games.find((i) => i.id === args.id) as GameType,
    reviews: (parent, args, context, info) => _db.reviews as ReviewType[],
    review: (parent, args, context, info) =>
      _db.reviews.find((i) => i.id === args.id) as ReviewType,
  },
  Mutation: {
    addGame: (_, args) => {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
        __typename: "Game",
      };
      _db.games.push(game);
      return game as GameType;
    },
    updateGame(_, args) {
      _db.games = _db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }
        return g;
      });
      return _db.games.find((g) => g.id === args.id) as GameType;
    },
    deleteGame(_parent, args, _context) {
      _db.games = _db.games.filter((g) => g.id !== args.id);
      return _db.games as GameType[];
    },
  },
  Author: {
    reviews(parent) {
      return _db.reviews.filter(
        (r) => r.author_id === parent.id
      ) as ReviewType[];
    },
  },
  Game: {
    reviews(parent) {
      return _db.reviews.filter((r) => r.game_id === parent.id) as ReviewType[];
    },
  },
  Review: {
    author(parent) {
      return _db.authors.find((a) => a.id === parent.author_id) as AuthorType;
    },
    game(parent) {
      return _db.games.find((g) => g.id === parent.game_id) as GameType;
    },
  },
};
