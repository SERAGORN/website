import React, { Component, Fragment } from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import GroupsPage from './group_component/GroupPage'

const GET_MY_GROUPS = gql`
    query myGroups {
        myGroups {
            id_group
            title_group
        }
    }
`;


class Groups extends Component {

    pushGroup = (e) => {
        console.log(e)
        return null
    }
    
    render() {
        const classes = this.props
        return (
                <Query query={GET_MY_GROUPS}>
                    {({ data, loading }) => {
                        if (loading) {
                            return <div>Loading ...</div>;
                        }
                        return (
                            <GroupsPage data = {data}></GroupsPage>
                        );
                    }}
                </Query>

        )
    }

}

  

export default Groups