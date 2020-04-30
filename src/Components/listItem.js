import React from "react"

class ListItem extends React.Component {
  state = {
    item: "",
    quantity: "",
    category: "",
    inputDisplay: "none",
    itemDisplay: "flex"
  }

  setItem = (e) => {
    this.setState({ item: e.target.value })
  }

  changeItem = () => {
    this.props.editItem(this.props.id, this.state.item, this.state.quantity, this.state.category);
    this.toggleInput()
  }
  
  setCategory = (e) => {
    this.setState({ category: e.target.value })
  }

  toggleInput = () => {
    if (this.state.inputDisplay === 'none') {
      this.setState({ itemDisplay: 'none' })
      this.setState({ inputDisplay: 'flex' })
    } else {
      this.setState({ itemDisplay: 'flex' })
      this.setState({ inputDisplay: 'none' })
    }
  }

  setQuantity = (e) => {
    let quantity = parseInt(e.target.value)
    if (!isNaN(quantity)) {
      this.setState({ quantity: quantity })
      this.props.editItem(this.props.id, this.state.item, quantity, this.state.category)
    }
  }

  componentDidMount() {
    this.setState({ item: this.props.item })
    this.setState({ quantity: this.props.quantity })
    this.setState({ category: this.props.category })
  }

  render() {
    return (
      <div className="list-item">
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
          className="item-name-input"
          onChange={this.setItem}
          value = {this.state.item}/>

          <select id="categories" value={this.state.category} onChange={this.setCategory}>
            {this.props.categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button onClick={this.changeItem}>+</button>
          <button onClick={this.toggleInput}>x</button>
        </div>
          
        <input
          type="number"
          name="quantity"
          className="item-quantity"
          value={this.state.quantity}
          onChange={this.setQuantity}
        />
      </div>
    );
  }
}

export default ListItem
