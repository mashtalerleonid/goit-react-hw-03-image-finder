import React, { Component } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";

const modalRoot = document.querySelector("#modal-root");
const body = document.querySelector("body");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    body.classList.add("scroll-lock");
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    body.classList.remove("scroll-lock");
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
    const { handleClose, children } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{children}</div>
        <button className="Close" type="button" onClick={handleClose}>
          <CloseIcon width="30" />
        </button>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
