import React from 'react';
import ListItem from './listItem';
import InputBar from './inputBar';
import axios from 'axios';
import Login from './login';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      removed: [],
      loggedin: false,
      message: "",
      lastKey: 0,
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.readdItem = this.readdItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
  }

  addItem(e) {
    let item = e.target.parentNode.childNodes[0].value;
    let quantity = e.target.parentNode.childNodes[1].value;
    let message = ""
    if (item) {
        let itemList = this.state.items;
        let key = parseInt(this.state.lastKey) + 1;
        this.setState({lastKey: key});
        
        let newItem = {
          id: key,
          item: item,
          quantity: quantity,
        }

        itemList.push(newItem);
        this.setState({ items: itemList });
        
        if (this.state.loggedin) {
        let formData = new FormData();
        formData.append('id', key);
        formData.append('item', item);
        formData.append('quantity', quantity);
        axios({
          method: 'post',
          url: '/api/list.php',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data'}}
        })
        .then(response => {
          if (response.data === 1){
            message = "";
          } else {
            message = "Error adding item";
            this.getList();
          }          
          this.setState({ message: message });
        })
        .catch(() => {
          message = "Error adding item";
          this.setState({ message: message });
          this.getList();
        })
    }  
    e.target.parentNode.childNodes[0].value = "";
    e.target.parentNode.childNodes[1].value = 1;  
  }
  }

  removeItem(e) {
    let id = e.target.parentNode.id;
    let itemList = this.state.items;
    let removedList = this.state.removed;
    let message = "";

    let removedItem = itemList.find(item => parseInt(item.id) === parseInt(id));
    removedList.push(removedItem);
    this.setState({removed: removedList})

    let newList = itemList.filter(item => parseInt(item.id) !== parseInt(id));
    this.setState({ items: newList });

    if (this.state.loggedin) {
      let formData = new FormData();
      formData.append('id', id);
      formData.append('removed', 1);
      formData.append('update', 1);
      axios({
        method: 'post',
        url: '/api/list.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(response => {
        if (response.data === 1) {
          message = "";
        } else {
          message = "Error removing item";
          this.getList();
        }
        this.setState({ message: message });
      })
      .catch(() => {
        message = "Error deleting item";
        this.setState({ message: message });
        this.getList();
      })
      }
  }

  editItem(id, item, quantity) {
    if (item){
      let message = "";
      let itemList = this.state.items;
      let newList = itemList.map(listItem => {
        if (parseInt(listItem.id) === parseInt(id)){
          return ({
            id: id,
            item: item,
            quantity: quantity
          })
        } else {
          return listItem
        }
      })
      
      this.setState({ items: newList })

      if (this.state.loggedin) {
        let formData = new FormData();
        formData.append('id', id);
        formData.append('item', item);
        formData.append('quantity', quantity);
        formData.append('update', 2);
        axios({
          method: 'post',
          url: '/api/list.php',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data'}}
        })
        .then(response => {
          if (response.data === 1) {
            message = "";
          } else {
            message = "Error editing item";
            this.getList();
          }
          this.setState({ message: message });
        })
        .catch(() => {
          message = "Error editing item";
          this.setState({ message: message });
          this.getList();
        })
      }
    }
  }

  readdItem(e){
    let id = e.target.parentNode.id;
    let item = e.target.parentNode.childNodes[0].childNodes[0].innerHTML;
    let quantity = e.target.parentNode.childNodes[0].childNodes[2].value;
    let message = "";

    let removedList = this.state.removed;

    let newList = removedList.filter(item => parseInt(item.id) !== parseInt(id));
    this.setState({ removed: newList });

    if (item) {
      let itemList = this.state.items;
      
      let newItem = {
        id: id,
        item: item,
        quantity: quantity
      }

      itemList.push(newItem);
      this.setState({ items: itemList });
      
      if (this.state.loggedin) {
      let formData = new FormData();
      formData.append('id', id);
      formData.append('item', item);
      formData.append('quantity', quantity);
      formData.append('removed', 0);
      formData.append('update', 1);
      axios({
        method: 'post',
        url: '/api/list.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(response => {
        if (response.data === 1){
          message = "";
        } else {
          message = "Error adding item";
          this.getList();
        }
        this.setState({ message: message });
      })
      .catch(() => {
        message = "Error adding item";
        this.setState({ message: message });
        this.getList();
      })
      }
    }
  }

  deleteItem(e) {
    let id = e.target.parentNode.id;
    let message = "";

    let removedList = this.state.removed;

    let newList = removedList.filter(item => parseInt(item.id) !== parseInt(id));
    this.setState({ removed: newList });

    if (this.state.loggedin) {
      const url = `/api/list.php`
      axios.delete(url, {params: {id: id}})
        .then(response => {
          if (response.data === 1){
            message = "";
          } else {
            message = "Error deleting item";
            this.getList();
          }

          this.setState({ message: message });

        })
        .catch(() => {
          message = "Error deleting item";
          this.setState({ message: message });
          this.getList();
        })
      }
  }

  login(e) {
    let d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    let username = e.target.parentNode.childNodes[0].value;
    this.setState({username:username});
    document.cookie=`username=${username}; expires=${expires}`
    let password = e.target.parentNode.childNodes[1].value;
    let message = "log";

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    axios({
      method: 'post',
      url: '/api/login.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(response => {
      if (response.data === "Authenticated"){
        document.cookie = `loggedin=true; expires=${expires}` ;
        this.setState({loggedin: true});
        message = `Hi ${username}!`
        this.getList();
      } else {
        message = "Invalid Username or Password!";
      }
      this.setState({message: message});
    })
    .catch(() => {
      message = "Invalid Username or Password";
      this.setState({message: message});
    })
}

  register(e) {
      let username = e.target.parentNode.childNodes[2].value;
      let password = e.target.parentNode.childNodes[3].value;
      let message = "";

      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      axios({
        method: 'post',
        url: '/api/register.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(() => {
        message = "Successfully Registered";
        this.setState({ message: message });
      })
      .catch(() => {
        message = "Error Registering: Please try again";
        this.setState({ message: message });
      })
  }

  logout() {
    document.cookie = "loggedin=false; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    let message = "Logged out";
    this.setState({message: message});
    this.setState({loggedin: false});
  }

  getList() {
    if ((this.state.loggedin) || (document.cookie.split(';').filter((item) => item.includes('loggedin=true')).length)) {
      const url = '/api/list.php'
      axios.get(url).then(response => response.data)
      .then((data) => {
        if (Array.isArray(data)){
          const lastKey = data[data.length - 1].id;
          this.setState({lastKey: lastKey})

          const items = data.filter(item => parseInt(item.removed) === 0);
          this.setState({items: items});

          const removed = data.filter(item => parseInt(item.removed) === 1);
          this.setState({removed: removed});
        } 
      })
    }
  }

  loadUsername(cookieList) {
    let username = cookieList.find(item => item.includes('username'));
    return username.split("=")[1];
  }

  componentDidMount() {
    const cookieList = document.cookie.split(';');
    if (this.state.loggedin || cookieList.filter(item => item.includes('loggedin=true')).length) {
      this.setState({loggedin: true});
      let username = this.loadUsername(cookieList);
      this.setState({username:username});
    }
    this.getList();
  }

  render() {
    const { items, removed } = this.state
    const lists = {items, removed}
    return (
      <div className="list">
        <h1>Grocery List</h1>
        
        <Login username={this.state.username} login={this.login} register={this.register} logout={this.logout} loggedin={this.state.loggedin}/>
        
        <div className="list-container">
        <InputBar addItem={this.addItem} lists={lists} editItem={this.editItem} readdItem={this.readdItem} /><p>{this.state.error}</p>
        <p>{this.state.message}</p>

        <ul>{this.state.items.map(item => (
        <li key={item.id} id={item.id}>
            <ListItem id={item.id} item={item.item} quantity={item.quantity} editItem={this.editItem}/>
            <button onClick={this.removeItem}>-</button>
        </li>
        ))}
        </ul>

        {this.state.removed.length > 0 ? <p>Deleted Items</p> : <p></p>}
        <ul className='removed-list'>{this.state.removed.map(item => (
        <li key={item.id} id={item.id}>
            <ListItem id={item.id} item={item.item} quantity={item.quantity} editItem={this.editItem}/>
            <button onClick={this.readdItem}>+</button>
            <button onClick={this.deleteItem}>-</button>
        </li>
        ))}
        </ul>
        </div>
      </div>
    );
  }
}

export default List;