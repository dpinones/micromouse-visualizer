import React, { Component } from "react";
import "./node.css";

class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall, 
      wall, // [0] ↑ ,[1] → ,[2] ↓ ,[3] ←
      isVisited,
      isShortest,
      onMouseEnter,
      onMouseDown,
      onMouseUp
    } = this.props;

    const extraClass = isStart
      ? "node node-start"
      : isFinish
      ? "node node-finish"
      : isWall
      ? "node-wall"
      : isShortest
      ? "node node-shortest-path"
      : isVisited
      ? "node node-visited"
      : "node";

    let cellWidth = 60;
    let cellHeight = 60;

    let border = "none";
    if(isWall){
      border = wall[0] ? "rgb(245, 0, 0) " : "#D3D3D3 "; 
      border = wall[1] ? border + " rgb(245, 0, 0) " : border + " #D3D3D3 "; 
      border = wall[2] ? border + "rgb(245, 0, 0) " : border + "#D3D3D3 ";
      border = wall[3] ? border + "rgb(245, 0, 0) " : border + "#D3D3D3 ";
      
      console.log('wall: ', wall);
      console.log('border: ', border);
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={`${extraClass}`}
        style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px`, "--border": `${border}` }}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}

export default Node;
