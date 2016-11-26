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
    }
  }
})

var queryType = new GraphQLObjectType({
  name: 'RootQuerytype',
  fields: {
    author: {
      type: AuthorType,
      resolve() {
        return { name: 'yasser' };
      }
    }
  }
})

var schema = new GraphQLSchema({
  query: queryType,
});

var query = 'query { author { name } }';

graphql(schema, query)
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  });
