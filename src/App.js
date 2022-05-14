import React from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import AddCounter from "./components/addCounter";
import ClearAll from "./components/clearAll";

const ResetAll = ({ onResetAll }) => {
  return (
    <button
      className="btn btn-danger"
      style={{ fontWeight: "bold" }}
      onClick={onResetAll}
    >
      RESET ALL
    </button>
  );
};

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">{totalCounters} items</div>
    </nav>
  );
};

class Counters extends React.Component {
  getBadgeClasses = (counter) => {
    let classes = "badge m-2 badge-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  };

  formatCount = (counter) => {
    return counter.value === 0 ? "Zero" : counter.value;
  };

  render() {
    const {
      counters,
      onIncrement,
      onDecrement,
      onDelete,
      onReset
    } = this.props;

    return (
      <div>
        {counters.map((counter) => (
          <div className="row">
            <span className={this.getBadgeClasses(counter)}>
              {this.formatCount(counter)}
            </span>

            <button
              onClick={() => onIncrement(counter)}
              className="btn btn-secondary m-2"
            >
              Inc
            </button>
            <button
              onClick={() => onDecrement(counter)}
              className="btn btn-info m-2"
            >
              Dec
            </button>
            <button
              onClick={() => onDelete(counter.id)}
              className="btn btn-danger m-2"
            >
              Del
            </button>
            <button
              onClick={() => onReset(counter)}
              className="btn btn-dark m-2"
            >
              Reset
            </button>
          </div>
        ))}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  // handleResetAll = () => {
  //   const counters = this.state.counters.map((counter) => {
  //     counter.value = 0;
  //     return counter;
  //   });
  //   this.setState({ counters });
  // };

  handleReset = (counterId) => {
    const countersCopy = [...this.state.counters];
    const counterIndex = countersCopy.indexOf(counterId);
    console.log("Here is the index of object you clicked ", counterIndex);
    countersCopy[counterIndex].value = 0;
    this.setState({
      counters: countersCopy
    });
  };

  handeIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index].value++;

    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    if (counters[index].value > 0) {
      counters[index].value--;
    }

    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);

    this.setState({ counters });
  };

  handleResetAll = () => {
    const countersCopy = [...this.state.counters];
    // countersCopy.map((item) => (item.value = 0));
    // for (let element of countersCopy) {
    //   element.value = 0;
    // }
    for (let index in countersCopy) countersCopy[index].value = 0;

    this.setState({
      counters: countersCopy
    });
  };

  onAddCounter = () => {
    const countersCopy = [...this.state.counters];
    let newId =
      countersCopy.length !== 0 ? countersCopy[countersCopy.length - 1].id : 0;

    let newObj = {
      id: newId + 1,
      value: 0
    };

    this.setState({
      counters: [...countersCopy, newObj]
    });
  };

  onDeleteAll = () => {
    this.setState({
      counters: []
    });
  };

  /**
   * Below function handles the reset button for each counter
   * by using map
   */
  // handleReset = (counterSelected) => {
  //   const counters = this.state.counters.map((counter) => {
  //     if (counter.id === counterSelected.id) {
  //       counter.value = 0;
  //     }
  //     return counter;
  //   });

  //   this.setState({ counters });
  // };

  // handleAddCounter = () => {
  //   const { counters } = this.state;
  //   const idOfLastCounter = counters[counters.length - 1].id;
  //   let newCounterObj = { id: idOfLastCounter + 1, value: 0 };

  //   const newCounters = [...counters, newCounterObj];
  //   this.setState({ counters: newCounters });
  // };

  render() {
    return (
      <div className="main__wrap">
        <div className="container">
          <div className="card__box">
            <ResetAll onResetAll={this.handleResetAll} />

            <NavBar
              totalCounters={
                this.state.counters.filter((c) => c.value > 0).length
              }
            />

            <Counters
              counters={this.state.counters}
              onIncrement={this.handeIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
              onReset={this.handleReset}
            />

            <AddCounter onAddCounter={this.onAddCounter} />
            <ClearAll
              counters={this.state.counters}
              onDeleteAll={this.onDeleteAll}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
