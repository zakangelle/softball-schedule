import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray, reduxForm } from 'redux-form';
import cssModules from 'react-css-modules';
import MdPrint from 'react-icons/lib/md/print';
import validate from './RosterForm.validate.js';
import RosterTable from './RosterTable.js';
import baseStyles from '../style/index.css';
import rosterStyles from '../style/roster.css';

@connect((state, props) => ({
  initialValues: {
    players: props.roster
  }
}))
@reduxForm({ form: 'rosterForm', validate })
@cssModules({ ...baseStyles, ...rosterStyles })
export default class RosterForm extends Component {
  render() {
    const { handleSubmit, submitting, dirty } = this.props;

    return (
      <div styleName="roster-container">
        <button
          styleName="button-small"
          onClick={window.print}
        >
          <MdPrint
            title="Print Lineup"
            size={11}
          />
          Print Lineup
        </button>

        <div styleName="roster">
          <form onSubmit={handleSubmit}>

            <FieldArray name="players" component={RosterTable} />

            <div styleName="form-footer">
              {false &&
                <span styleName="form-message">
                  {dirty ?
                    'You have unsaved changes.'
                  : null}
                </span>
              }
              <button styleName="button" disabled={submitting}>Save Roster</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
