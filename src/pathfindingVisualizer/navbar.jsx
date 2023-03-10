import React, { Component } from "react";
import "./navbar.css";

const brand = window.innerWidth > 600 ? "Pathfinding Visualizer" : "Pathfinder";

class NavBar extends Component {
  state = {
    algorithm: "Run JPS ",
    maze: "Generate Maze",
    pathState: false,
    mazeState: false,
    speedState: "Speed",
  };

  selectAlgorithm(selection) {
    if (this.props.visualizingAlgorithm) {
      return;
    }
    if (
      selection === this.state.algorithm ||
      this.state.algorithm === "Visualize Algorithm" ||
      this.state.algorithm === "Select an Algorithm!"
    ) {
      this.setState({ algorithm: selection });
    } else if (this.state.pathState) {
      this.clearPath();
      this.setState({ algorithm: selection });
    } else {
      this.setState({ algorithm: selection });
    }
  }

  selectMaze(selection) {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (
      selection === this.state.maze ||
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: selection });
    } else if (!this.state.mazeState) {
      this.setState({ maze: selection });
    } else {
      this.clearGrid();
      this.setState({ maze: selection });
    }
  }

  visualizeAlgorithm() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.pathState) {
      this.clearTemp();
      return;
    }
    this.props.visualizeJPS();
  }

  generateMaze() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    if (this.state.mazeState || this.state.pathState) {
      this.clearTemp();
    }
    if (
      this.state.maze === "Generate Maze" ||
      this.state.maze === "Select a Maze!"
    ) {
      this.setState({ maze: "Select a Maze!" });
    } else {
      this.setState({ mazeState: true });
      if (this.state.maze === "Generate Random Maze")
        this.props.generateRandomMaze();
      else if (this.state.maze === "Generate Recursive Maze")
        this.props.generateRecursiveDivisionMaze();
      else if (this.state.maze === "Generate Vertical Maze")
        this.props.generateVerticalMaze();
      else if (this.state.maze === "Generate Horizontal Maze")
        this.props.generateHorizontalMaze();
    }
  }

  clearGrid() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      algorithm: "Run JPS",
      maze: "Generate Maze",
      pathState: false,
      mazeState: false,
    });
  }

  clearPath() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearPath();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  clearTemp() {
    if (this.props.visualizingAlgorithm || this.props.generatingMaze) {
      return;
    }
    this.props.clearGrid();
    this.setState({
      pathState: false,
      mazeState: false,
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a
          className="navbar-brand h1 mb-0"
          href="https://dpinones.github.io/pathfinding-visualizer/"
        >
          {brand}
        </a>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              {/* <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Algorithms
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectAlgorithm("Visualize JPS")}
                  >
                    JPS
                  </button>
                </div>
              </div>{" "} */}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.visualizeAlgorithm()}
              >
                {this.state.algorithm}
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mazes
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <button
                    className="dropdown-item btn-light"
                    type="button"
                    onClick={() => this.selectMaze("Generate Horizontal Maze")}
                  >
                    Horizontal Division Maze
                  </button>
                </div>
              </div>{" "}
            </li>
            <li>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.generateMaze()}
              >
                {this.state.maze}
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => this.clearGrid()}
              >
                Clear Grid
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default NavBar;