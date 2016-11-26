import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql';

let DATA = { name: 'yasser'}

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    name: {
      type: GraphQLString,
      resolve: (obj, vars, context) => {
        console.log('name field> resolve> [obj, context, vars]=', [obj, context, vars]);
        return DATA.name
      }
    }
  }
})

const queryType = new GraphQLObjectType({
  name: 'RootQuerytype',
  fields: {
    author: {
      type: AuthorType,
      resolve: (root, vars, context) => {
        console.log('root query> [root, context, vars]=', [root, context, vars]);
        return {}
      }
    }
  }
})

const mutationType = new GraphQLObjectType({
  name : 'RootMutationType',
  fields: {
    updateAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
      },
      resolve: () => {
        DATA.name = 'Moussa'
        return true
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const mutation = 'mutation {updateAuthor(name:"Test") {name}}'

const  rootValue = { x: 1 }
const  contextValue = { y: 2 }
const  variables = { id: 1 }

graphql(schema, mutation, rootValue, contextValue, variables)
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  });
