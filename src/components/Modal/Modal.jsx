import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.handleClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.handleClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          {this.props.children}
          {/* <img src="" alt="" /> */}
        </div>
        <button
          className="Close"
          type="button"
          onClick={this.props.handleClose}
        >
          <CloseIcon width="30" />
        </button>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
