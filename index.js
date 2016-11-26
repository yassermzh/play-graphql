import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

var AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString,
      resolve: (obj, vars, context) => {
        console.log('name field> resolve> [obj, context, vars]=', [obj, context, vars]);
        return 'yasser'
      }
    }
  }
})

var queryType = new GraphQLObjectType({
  name: 'RootQuerytype',
  fields: {
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (root, vars, context) => {
        console.log('root query> [root, context, vars]=', [root, context, vars]);
        return {}
      }
    }
  }
})

var schema = new GraphQLSchema({
  query: queryType,
});

var query = 'query getAuthor($id: Int){ author(id: $id) { name } }';

const rootValue = { x: 1 }
const contextValue = { y: 2 }
const variables = { id: 1 }

graphql(schema, query, rootValue, contextValue, variables)
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  });
