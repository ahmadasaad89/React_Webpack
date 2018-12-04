import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Repositories = (props) => {
    const { username } = props;

    const GET_REPOS = gql`
      query repos {
        user(login:${username}) {
          repositories(first: 15) {
            edges {
              node {
                url,
                name,
                id,
                forkCount,
                stargazers(last:2) {
                  totalCount
                }
              }
            }
          }
        }
      }
    `;

    const repos = (
        <Query query={GET_REPOS}>
            {({ loading, error, data }) => {
                const { user } = !!data && data;
                const { edges } = !!user && user.repositories;

                if (loading) return 'Loading...';
                if (error) return null;

                return (
                    <div>
                        { edges && edges.map(repo => (
                            <a
                                key={repo.node.id}
                                href={repo.node.url}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                { repo.node.name }
                                <span className="badge badge-primary badge-pill">
                                    { repo.node.stargazers.totalCount }
                                    &nbsp; ★
                                </span>
                            </a>))
                        }
                    </div>

                );
            }}
        </Query>
    );

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-12">
                    <div className="list-group list-group-flush">
                        <p className="ml-3">
                            <mark>
                                The repositories list is fetched using github QraphQL api (v4)
                            </mark>
                        </p>
                        { repos }
                    </div>
                </div>
            </div>
        </div>
    );
};

Repositories.propTypes = {
    username: PropTypes.string,
};

export default Repositories;
