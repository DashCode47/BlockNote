import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  createHttpLink,
} from "@apollo/client";
import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import config from "../aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth = {
  type: config.aws_appsync_authenticationType,
  apiKey: config.aws_appsync_apiKey,
};

const httpLink = createHttpLink({ uri: url });

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Client = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
