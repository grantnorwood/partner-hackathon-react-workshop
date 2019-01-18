/**
Copyright 2018 Expedia Group, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from "apollo-link-error";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from "apollo-cache-inmemory";
import App from './components/App';
import './index.css';
import config from './config';

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
        console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

const httpLink = new HttpLink(
    {
        uri: config.graphQL.url,
        headers: {
            'x-homeaway-thin-ui-ha-session': config.auth.sessionId
        }
    }
);

const client = new ApolloClient({
    link: ApolloLink.from([
        errorLink,
        httpLink
    ]),
    cache: new InMemoryCache()
});

ReactDOM.render((
    <ApolloProvider client={client}>
      <Router>
        <Route path='/demo' component={App} />
      </Router>
    </ApolloProvider>
    ),
    document.getElementById('root')
);
