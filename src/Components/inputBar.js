import React from "react";

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      quantity: 1
    };
    this.setItem = this.setItem.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  setItem(e) {
    this.setState({ item: e.target.value });
  }

  setQuantity(e) {
    let quantity = parseInt(e.target.value);
    if (!isNaN(quantity)) {
      this.setState({ quantity: quantity });
    }
  }

  render() {
    return (
      <div className="input-bar">
        <input
          type="text"
          name="item"
          className="item-name"
          defaultValue={this.state.item}
          onChange={this.setItem}
        />
        <input
          type="number"
          name="quantity"
          className="item-quantity"
          defaultValue={this.state.quantity}
          onChange={this.setQuantity}
        />
        <button name="add-item" onClick={this.props.addItem}>+</button>
      </div>
    );
  }
}

export default InputBar;
