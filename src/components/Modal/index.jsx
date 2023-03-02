import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, } from 'redux-form';
import ReactBSAlert from "react-bootstrap-sweetalert";
import * as actions from "../../_actions/modal";
import * as selectors from "../../_reducers";

class ModalCore extends Component {


  componentDidUpdate() {
    const {
      hideModal,
      type,
    } = this.props;
    if (type === "success") {
      setTimeout(() => hideModal(), 2000);
    }
  }


  onSubmit(values) {
    const {
      updateAction,
      hideModal,

      row: {
        id,
      }
    } = this.props;

    if (values) {
      updateAction({
        id,
        ...values,
      })
    }
    hideModal();
  }

  render() {
    const {
      message,
      type,
      hideModal,
      onUmount,

    } = this.props;
    return (
      <>
        {
          type === "error" && (
            <ReactBSAlert
              style={{ zIndex: 999, display: "block", marginTop: "-100px" }}
              warning
              onConfirm={() => hideModal()}
            >
              {message}
            </ReactBSAlert>
          )
        }
        {
          type === "success" && (
            <ReactBSAlert
              success
              style={{ zIndex: 999, display: "block", marginTop: "-100px" }}
              title="Good job!"
              confirmBtnBsStyle="success"
              btnSize=""
              showConfirm={true}
              onConfirm={() => hideModal()}
              beforeUnmount={onUmount ? () => onUmount() : undefined}
            >
              {message}
            </ReactBSAlert>
          )
        }
      </>
    )
  }
}

const Modal = reduxForm({
  form: 'Modal',
})(ModalCore);

export default connect(
  (state) => ({
    type: selectors.getModalType(state),
    message: selectors.getModalMessage(state),
    title: selectors.getModalTitle(state),
    row: selectors.getModalRowData(state),
  }),
  (dispatch) => ({
    hideModal() {
      dispatch(actions.hideModal());
    },
  }),
)(Modal);
