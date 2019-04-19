import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';
import { Provider } from 'react-redux'
import store from './redux/store'

const cache = new InMemoryCache()

const GITHUB_BASE_URL = 'http://localhost:3000/graphql'

const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  credentials: 'include'
});


var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}
// let date = new Date(new Date().getTime() + 60 * 1000)
// // document.cookie = "userName=Lel; path=/; expires=" + date.toUTCString();

// // console.log(document.cookie)

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

ReactDOM.render(
<Provider store={store}>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
</Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
