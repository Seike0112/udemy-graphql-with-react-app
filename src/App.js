import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo'
import client from './client';
// import { ME } from './graphql'
import { SEARCH_REPOSITORYS } from './graphql'

const DEFAULT_VARIABLES = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: "フロントエンドエンジニア"
}

class App extends Component {

  //初期化メソッド
  constructor(props) {
    super(props)
    this.state = DEFAULT_VARIABLES

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      ...DEFAULT_VARIABLES,
      query: e.target.value
    })
  }

  render() {
    const { query, first, last, before, after } = this.state

    return (
      <ApolloProvider client={client}>
        <form>
          <input value={query} onChange={this.handleChange} />
        </form>
        <Query query={SEARCH_REPOSITORYS}
          variables={{ query, first, last, before, after }}
        >
          {
            ({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`

              console.log({ query })
              return <div></div>
            }
          }
        </Query>
      </ApolloProvider >
    );
  }
}

export default App;
