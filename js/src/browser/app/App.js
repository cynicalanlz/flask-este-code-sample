/* @flow */
import './App.css';
import * as themes from './themes';
import Footer from './Footer';
import Header from './Header';
import Helmet from 'react-helmet';
import React from 'react';
import favicon from '../../common/app/favicon';
import start from '../../common/app/start';
import { Container } from '../app/components';
import { Match, ThemeProvider } from '../../common/app/components';
import { Miss } from 'react-router';
import { connect } from 'react-redux';

// Pages
import FieldsPage from '../fields/FieldsPage';
import UsersPage from '../users/UsersPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';
import SignInPage from '../auth/SignInPage';

// v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
const bootstrap4Metas: any = [
  { charset: 'utf-8' },
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  {
    'http-equiv': 'x-ua-compatible',
    content: 'ie=edge',
  },
];

let App = ({ currentLocale, currentTheme }) => (
  <ThemeProvider
    key={currentTheme} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
    theme={themes[currentTheme] || themes.initial}
  >
    <Container>
      <Helmet
        htmlAttributes={{ lang: currentLocale }}
        meta={[
          ...bootstrap4Metas,
          {
            name: 'description',
            content: `Starter kit for universal full–fledged React apps. One stack
              for browser, mobile, server.`,
          },
          ...favicon.meta,
        ]}
        link={[
          ...favicon.link,
        ]}
      />
      <Header />
      <Match exactly pattern="/" component={UsersPage} />
      <Match pattern="/fields" component={FieldsPage} />
      <Match pattern="/signin" component={SignInPage} />
      <Match authorized pattern="/me" component={MePage} />
      <Miss component={NotFoundPage} />
      <Footer />
    </Container>
  </ThemeProvider>
);

App.propTypes = {
  currentLocale: React.PropTypes.string.isRequired,
  currentTheme: React.PropTypes.string,
};

App = connect(
  state => ({
    currentLocale: state.intl.currentLocale,
    currentTheme: state.themes.currentTheme,
  }),
)(App);

export default start(App);
