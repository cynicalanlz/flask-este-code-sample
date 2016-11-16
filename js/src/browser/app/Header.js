/* @flow */
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { Link, Space, Toolbar } from '../app/components';
import { connect } from 'react-redux';

const styles = {
  toolbar: {
    flexWrap: 'wrap',
  },
  prefetch: {
    display: 'none',
  },
};

const Header = ({ viewer }) => (
  <Toolbar style={styles.toolbar}>
    <Link bold inverted to="/">
      <FormattedMessage {...linksMessages.users} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/fields">
      <FormattedMessage {...linksMessages.fields} />
    </Link>
    <Space x={2} />
    <Link bold inverted to="/me">
      <FormattedMessage {...linksMessages.me} />
    </Link>
    <Space x={2} />
    {!viewer &&
      <Link bold inverted to="/signin">
        <FormattedMessage {...linksMessages.signIn} />
      </Link>
    }
  </Toolbar>
);

Header.propTypes = {
  viewer: React.PropTypes.object,
};

export default connect(
  state => ({
    viewer: state.users.viewer,
  }),
)(Header);
