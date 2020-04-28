import React from "react"
import SearchResults from "./SearchResults"

class InputBar extends React.Component {
  state = {
    item: "",
    quantity: 1
  }

  setItem = (e) => {
    this.setState({ item: e.target.value });
  }

  setQuantity = (e) => {
    let quantity = parseInt(e.target.value);
    if (!isNaN(quantity)) {
      this.setState({ quantity: quantity });
    }
  }

  handleAdd = (e) => {
    this.setState(() => ({
      item: "",
      quantity: 1
    }))
    this.props.addItem(e)
  }

  handleReAdd = (e) => {
    this.setState(() => ({
      item: "",
      quantity: 1
    }))
    this.props.readdItem(e)
  }

  render() {
    return (
      <div>
      <div className="input-bar">
        <input
          type="text"
          name="item"
          className="item-name"
          value={this.state.item}
          onChange={this.setItem}
        />
        <input
          type="number"
          name="quantity"
          className="item-quantity"
          value={this.state.quantity}
          onChange={this.setQuantity}
        />
        <button name="add-item" onClick={e => this.handleAdd(e)}>+</button>
      </div>
      <SearchResults searchList={this.props.lists} query={this.state.item} readdItem={e => this.handleReAdd(e)} editItem={this.props.editItem}/>
      </div>
    );
  }
}

export default InputBar;
