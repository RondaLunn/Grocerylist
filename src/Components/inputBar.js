import React from "react"
import SearchResults from "./SearchResults"

class InputBar extends React.Component {
  state = {
    item: "",
    quantity: 1,
    category: "produce"
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

  setCategory = (e) => {
    this.setState({ category: e.target.value });
  }

  handleAdd = (e) => {
    this.props.addItem(e)

    this.setState(() => ({
      item: "",
      quantity: 1,
      category: "produce"
    }))
  }

  handleReAdd = (e) => {
    this.props.readdItem(e)

    this.setState(() => ({
      item: "",
      quantity: 1,
      category: "produce"
    }))
  }

  render() {
    return (
      <div className="input-container">
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
        <select id="categories" value={this.state.category} onChange={this.setCategory}>
          {this.props.categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <button name="add-item" onClick={e => this.handleAdd(e)}>+</button>
      </div>
      <SearchResults searchList={this.props.lists} query={this.state.item} categories={this.props.categories} readdItem={e => this.handleReAdd(e)} editItem={this.props.editItem}/>
      </div>
    );
  }
}

export default InputBar;
