/* @flow */
import React from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import emailMessages from '../../common/auth/emailMessages';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { fields } from '../../common/lib/redux-fields';
import { signIn, signUp } from '../../common/auth/actions';
import {
  ButtonOutline as Button,
  Form,
  Input,
  Message,
  Panel,
  PanelHeader,
  Space,
  View,
  focus,
} from '../app/components';


class Email extends React.Component {

  static propTypes = {
    disabled: React.PropTypes.bool.isRequired,
    fields: React.PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    signIn: React.PropTypes.func.isRequired,
    signUp: React.PropTypes.func.isRequired,
  };


  onFormSubmit = () => {
    this.signInViaPassword();
  };

  onSignUpClick = () => {
    const { fields, signUp } = this.props;
    signUp('password', fields.$values());
  };


  signInViaPassword() {
    const { fields, signIn } = this.props;
    signIn('password', fields.$values());
  }

  render() {
    const { disabled, fields, intl } = this.props;
    return (
      <Form onSubmit={this.onFormSubmit} small>
        <Panel theme="primary">
          <PanelHeader>
            Form
          </PanelHeader>
          <Input
            {...fields.email}
            disabled={disabled}
            label="Email"
            maxLength={100}
            placeholder={intl.formatMessage(emailMessages.emailPlaceholder)}
          />
          <Input
            {...fields.password}
            disabled={disabled}
            label="Pass"
            maxLength={1000}
            placeholder={intl.formatMessage(emailMessages.passwordPlaceholder)}
            type="password"
          />
          <View>
            <Button disabled={disabled}>
              <FormattedMessage {...buttonsMessages.signIn} />
            </Button>
            <Space />
            <Button
              disabled={disabled}
              onClick={this.onSignUpClick}
              type="button"
            >
              <FormattedMessage {...buttonsMessages.signUp} />
            </Button>
            <Space />
    
          </View>
        </Panel>
      </Form>
    );
  }


}

Email = focus(Email, 'error');

Email = injectIntl(Email);

Email = fields(Email, {
  path: ['auth', 'email'],
  fields: ['email', 'password'],
});

export default connect(
  state => ({
    disabled: state.auth.formDisabled,
    error: state.auth.error,
  }),
  { signIn, signUp },
)(Email);
