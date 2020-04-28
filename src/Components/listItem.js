import React from "react";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      quantity: this.props.quantity,
      inputDisplay: "none",
      itemDisplay: "flex"
    };
    this.setItem = this.setItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.setQuantity = this.setQuantity.bind(this);
  }

  setItem(e) {
    let item = e.target.value;
    this.setState({ item: item });
  }

  changeItem() {
    this.props.editItem(this.props.id, this.state.item, this.state.quantity);
    this.toggleInput();
  }

  toggleInput() {
    if (this.state.inputDisplay === 'none') {
      this.setState({ itemDisplay: 'none' })
      this.setState( { inputDisplay: 'flex' })
    } else {
      this.setState({ itemDisplay: 'flex' })
      this.setState( { inputDisplay: 'none' })
    }
  }

  setQuantity(e) {
    let quantity = parseInt(e.target.value);
    if (!isNaN(quantity)) {
      this.setState({ quantity: quantity });
      this.props.editItem(this.props.id, this.state.item, quantity);
    }
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
    this.setState({ quantity: this.props.quantity });
  }

  render() {
    return (
      <div className="list-item" >
        {/* <input type="checkbox" name="checkbox" /> */}
        <div
          type="text"
          name="item"
          className="item-name"
          style={{display:this.state.itemDisplay}}
          onClick={this.toggleInput}
        >{this.state.item}
        </div>
        
        <div style={{display:this.state.inputDisplay}}>
        <input
          type="text"
          name="item"
          className="item-name"
          onChange={this.setItem}
          defaultValue = {this.state.item}/>
          <button onClick={this.changeItem}>+</button>
        </div>
          
        <input
          type="number"
          name="quantity"
          className="item-quantity"
          defaultValue={this.state.quantity}
          onChange={this.setQuantity}
        />
      </div>
    );
  }
}

export default ListItem;
