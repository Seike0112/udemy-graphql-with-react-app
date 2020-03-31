import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Query } from 'react-apollo'
import client from './client';
// import { ME } from './graphql'
import { SEARCH_REPOSITORYS } from './graphql'

const PER_PAGE = 5
const DEFAULT_VARIABLES = {
  after: null,
  before: null,
  first: PER_PAGE,
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

  goNext(search) {
    this.setState({
      first: PER_PAGE,
      after: search.pageInfo.endCursor,
      last: null,
      before: null
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

              const search = data.search
              const repositoryCount = search.repositoryCount
              const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositoryies'
              const title = `Github Repository Search Result - ${repositoryCount} ${repositoryUnit}`
              return (
                <React.Fragment>
                  <h2>{title}</h2>
                  <ul>
                    {
                      search.edges.map((edge, index) => {
                        const node = edge.node
                        return (
                          <li key={index}>
                            <a href={node.url} target="_blank" rel="noopener noreferrer" >{node.name}</a>
                          </li>
                        )
                      })
                    }
                  </ul>

                  {
                    search.pageInfo.hasNextPage === true ?
                      <button
                        onClick={this.goNext.bind(this, search)}
                      >
                        Next
                      </button>
                      :
                      null
                  }

                </React.Fragment>
              )
            }
          }
        </Query>
      </ApolloProvider >
    );
  }
}

export default App;
