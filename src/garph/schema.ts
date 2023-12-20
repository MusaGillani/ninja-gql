import { Infer, InferResolvers, g, GarphSchema } from "garph";

const game = g.type("Game", {
  id: g.id(),
  title: g.string(),
  platform: g.string().list(),
  reviews: g
    .ref(() => review)
    .optional()
    .list(),
});

const author = g.type("Author", {
  id: g.id(),
  name: g.string(),
  verified: g.boolean(),
  reviews: g.ref(() => review).list(),
});

const review = g.type("Review", {
  id: g.id(),
  rating: g.int(),
  content: g.string(),
  game_id: g.string(),
  author_id: g.string(),
  game: g.ref(() => game),
  author: g.ref(() => author),
});

const queryType = g.type("Query", {
  reviews: g.ref(() => review).list(),
  review: g.ref(() => review).args({ id: g.id() }),
  games: g.ref(() => game).list(),
  game: g.ref(() => game).args({ id: g.id() }),
  authors: g.ref(() => author).list(),
  author: g.ref(() => author).args({ id: g.id() }),
});

const mutationType = g.type("Mutation", {
  addGame: g
    .ref(() => game)
    .args({
      game: g.ref(() => addGameInputType),
    }),
  deleteGame: g
    .ref(() => game)
    .optional()
    .list()
    .args({
      id: g.id(),
    }),
  updateGame: g
    .ref(() => game)
    .optional()
    .args({
      id: g.id(),
      edits: g.ref(() => editGameInputType),
    }),
});

const addGameInputType = g.inputType("AddGameInput", {
  title: g.string(),
  platform: g.string().list(),
});

const editGameInputType = g.inputType("EditGameInput", {
  title: g.string().optional(),
  platform: g.string().list().optional(),
});

export type GameType = Infer<typeof game>;
export type AuthorType = Infer<typeof author>;
export type ReviewType = Infer<typeof review>;
export type QueryType = Infer<typeof queryType>;
export type MutationType = Infer<typeof mutationType>;
export type AddGameInputType = Infer<typeof addGameInputType>;
export type EditGameInputType = Infer<typeof editGameInputType>;
export type ResolverTypes = InferResolvers<
  {
    Game: typeof game;
    Review: typeof review;
    Author: typeof author;
    Query: typeof queryType;
    Mutation: typeof mutationType;
  },
  {}
>;

export const schema = new GarphSchema({
  types: [
    game,
    author,
    review,
    queryType,
    mutationType,
    addGameInputType,
    editGameInputType,
  ],
});
