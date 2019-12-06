import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  error: {
    backgroundColor: 'red'
  },
  success: {
    backgroundColor: 'green'
  }
}));

const Alert = ({ alerts }) => {
  const classes = styles();
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      //   {alert.msg}
      // </div>

      <Snackbar
        role='alert'
        key={alert.id}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        ContentProps={{
          classes: {
            root: alert.alertType ? classes.success : classes.error
          }
        }}
        open={true}
        TransitionComponent={Slide}
        message={<span id='message-id'>{alert.msg}</span>}
      />
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
