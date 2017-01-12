import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import AdminModule from './AdminModule';

class Admin extends Component {
  renderOneUser(user, i) {
    return <AdminModule key={i} user={user} />;
  }

  render() {
    // const users = _.sortBy(this.props.users, 'lastName');

    console.log('got users from store:', users);
    return (
      <div>
        <div className="page-header col-xs-12">
          <h1>Admin</h1>
        </div>
        {users.map(this.renderOneUser)}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { users } = state;
  console.log('here are your users:', users);
  return { users };
};

Admin.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object)
};

export default connect(mapStateToProps)(Admin);
