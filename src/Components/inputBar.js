import React from "react"
import SearchResults from "./SearchResults"

class InputBar extends React.Component {
  state = {
    item: "",
    quantity: 1,
    category: "produce"
  }

  setItem = (e) => {
    this.setState({ item: e.target.value })
  }

  setQuantity = (e) => {
    let quantity = parseInt(e.target.value)
    if (!isNaN(quantity)) {
      this.setState({ quantity: quantity })
    }
  }

  setCategory = (e) => {
    this.setState({ category: e.target.value })
  }

  handleAdd = (e) => {
    const listItem = this.state
    this.props.addItem(listItem)

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
          title="Item Name"
          type="text"
          name="item"
          id="item"
          className="item-name"
          value={this.state.item}
          onChange={this.setItem}
        />
        <input
          title="Quantity"
          type="number"
          id="quantity"
          name="quantity"
          className="item-quantity"
          value={this.state.quantity}
          onChange={this.setQuantity}
        />
        <select title="Catgories" id="categories" className="item-category" value={this.state.category} onChange={this.setCategory}>
          {this.props.categories.map(category => (
            <option title={category} key={category} value={category}>{category}</option>
          ))}
        </select>
        <button title="Add Item" name="add-item" onClick={e => this.handleAdd(e)}>+</button>
      </div>
      <SearchResults searchList={this.props.lists} query={this.state.item} categories={this.props.categories} readdItem={e => this.handleReAdd(e)} editItem={this.props.editItem}/>
      </div>
    );
  }
}

export default InputBar
