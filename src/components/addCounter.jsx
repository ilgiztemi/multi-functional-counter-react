import React from "react";
import "bootstrap/dist/css/bootstrap.css";

class AddCounter extends React.Component {
  render() {
    const { onAddCounter } = this.props;

    return (
      <button className="btn btn-primary" onClick={onAddCounter}>
        ADD NEW COUNTER
      </button>
    );
  }
}

export default AddCounter;
