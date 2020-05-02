import React from 'react'
import axios from 'axios'

import InputBar from './InputBar'
import Login from './Login'
import SortedList from './SortedList'
import RemovedList from './RemovedList'

class List extends React.Component {
  state = {
      items: [],
      removed: [],
      categories: [
        'produce',
        'dairy',
        'meat',
        'deli',
        'bakery',
        'grains',
        'cereal',
        'baking',
        'coffee',
        'syrups',
        'canned',
        'condiments',
        'spices',
        'international',
        'paper',
        'cleaning',
        'baby',
        'beauty',
        'pharmacy',
        'alcohol',
        'beverage',
        'snacks',
        'frozen',
        'misc',
      ],
      loggedin: false,
      message: "",
      lastKey: 0,
    }

  addItem = (e) => {
    let item = e.target.parentNode.childNodes[0].value
    let quantity = e.target.parentNode.childNodes[1].value
    let category = e.target.parentNode.childNodes[2].value
    let message = ""
    if (item) {
        let itemList = this.state.items;
        let key = parseInt(this.state.lastKey) + 1;
        this.setState({lastKey: key})
        
        let newItem = {
          id: key,
          item: item,
          quantity: quantity,
          category: category,
        }

        itemList.push(newItem);
        this.setState({ items: itemList })
        
        if (this.state.loggedin) {
        let formData = new FormData()
        formData.append('id', key)
        formData.append('item', item)
        formData.append('quantity', quantity)
        formData.append('category', category)
        axios({
          method: 'post',
          url: '/api/list.php',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data'}}
        })
        .then(response => {
          if (response.data === 1){
            message = ""
          } else {
            message = "Error adding item";
            this.getList()
          }          
          this.setState({ message: message })
        })
        .catch(() => {
          message = "Error adding item";
          this.setState({ message: message })
          this.getList()
        })
    }  
    e.target.parentNode.childNodes[0].value = ""
    e.target.parentNode.childNodes[1].value = 1
    e.target.parentNode.childNodes[2].value = 'produce'
    }
  }

  removeItem = (e) => {
    let id = e.target.parentNode.id
    let itemList = this.state.items
    let removedList = this.state.removed
    let message = ""

    let removedItem = itemList.find(item => parseInt(item.id) === parseInt(id))
    removedList.push(removedItem);
    this.setState({removed: removedList})

    let newList = itemList.filter(item => parseInt(item.id) !== parseInt(id))
    this.setState({ items: newList })

    if (this.state.loggedin) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('removed', 1)
      formData.append('update', 1)
      axios({
        method: 'post',
        url: '/api/list.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(response => {
        if (response.data === 1) {
          message = ""
        } else {
          message = "Error removing item"
          this.getList()
        }
        this.setState({ message: message })
      })
      .catch(() => {
        message = "Error deleting item"
        this.setState({ message: message })
        this.getList();
      })
      }
  }

  editItem = (id, item, quantity, category) => {
    if (item){
      let message = ""
      let itemList = this.state.items
      let newList = itemList.map(listItem => {
        if (parseInt(listItem.id) === parseInt(id)){
          return ({
            id,
            item,
            quantity,
            category
          })
        } else {
          return listItem
        }
      })
      
      this.setState({ items: newList })

      if (this.state.loggedin) {
        let formData = new FormData()
        formData.append('id', id)
        formData.append('item', item)
        formData.append('quantity', quantity)
        formData.append('category', category)
        formData.append('update', 2)
        axios({
          method: 'post',
          url: '/api/list.php',
          data: formData,
          config: { headers: {'Content-Type': 'multipart/form-data'}}
        })
        .then(response => {
          if (response.data === 1) {
            message = ""
          } else {
            message = "Error editing item"
            this.getList()
          }
          this.setState({ message: message })
        })
        .catch(() => {
          message = "Error editing item";
          this.setState({ message: message })
          this.getList()
        })
      }
    }
  }

  readdItem = (e) => {
    let id = e.target.parentNode.id
    const listItem = this.state.removed.filter(item => parseInt(item.id, 10) === parseInt(id, 10))[0]
    let item = listItem.item
    let quantity = listItem.quantity
    let category = listItem.category
    let message = ""

    let removedList = this.state.removed

    let newList = removedList.filter(item => parseInt(item.id) !== parseInt(id))
    this.setState({ removed: newList })

    if (item) {
      let itemList = this.state.items
      
      let newItem = {
        id: id,
        item: item,
        quantity: quantity,
        category: category
      }

      itemList.push(newItem);
      this.setState({ items: itemList })
      
      if (this.state.loggedin) {
      let formData = new FormData()
      formData.append('id', id)
      formData.append('item', item)
      formData.append('quantity', quantity)
      formData.append('category', category)
      formData.append('removed', 0)
      formData.append('update', 1)
      axios({
        method: 'post',
        url: '/api/list.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(response => {
        if (response.data === 1){
          message = ""
        } else {
          message = "Error adding item"
          this.getList()
        }
        this.setState({ message: message })
      })
      .catch(() => {
        message = "Error adding item"
        this.setState({ message: message })
        this.getList()
      })
      }
    }
  }

  deleteItem = (e) => {
    let id = e.target.parentNode.id
    let message = ""

    let removedList = this.state.removed

    let newList = removedList.filter(item => parseInt(item.id) !== parseInt(id))
    this.setState({ removed: newList })

    if (this.state.loggedin) {
      const url = `/api/list.php`
      axios.delete(url, {params: {id: id}})
        .then(response => {
          if (response.data === 1){
            message = ""
          } else {
            message = "Error deleting item"
            this.getList()
          }

          this.setState({ message: message })

        })
        .catch(() => {
          message = "Error deleting item"
          this.setState({ message: message })
          this.getList()
        })
      }
  }

  login = (e) => {
    let d = new Date()
    d.setTime(d.getTime() + (30*24*60*60*1000))
    let expires = "expires="+ d.toUTCString()

    let username = e.target.parentNode.childNodes[0].value
    this.setState({username:username})
    document.cookie=`username=${username}; expires=${expires}`
    let password = e.target.parentNode.childNodes[1].value
    let message = "log"

    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    axios({
      method: 'post',
      url: '/api/login.php',
      data: formData,
      config: { headers: {'Content-Type': 'multipart/form-data'}}
    })
    .then(response => {
      if (response.data === "Authenticated"){
        document.cookie = `loggedin=true; expires=${expires}` 
        this.setState({loggedin: true});
        message = `Hi ${username}!`
        this.getList();
      } else {
        message = "Invalid Username or Password!"
      }
      this.setState({message: message});
    })
    .catch(() => {
      message = "Invalid Username or Password"
      this.setState({message: message})
    })
}

  register = (e) => {
      let username = e.target.parentNode.childNodes[2].value
      let password = e.target.parentNode.childNodes[3].value
      let message = ""

      let formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      axios({
        method: 'post',
        url: '/api/register.php',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data'}}
      })
      .then(() => {
        message = "Successfully Registered"
        this.setState({ message: message })
      })
      .catch(() => {
        message = "Error Registering: Please try again"
        this.setState({ message: message })
      })
  }

  logout = () => {
    document.cookie = "loggedin=false; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    let message = "Logged out"
    this.setState({message: message})
    this.setState({loggedin: false})
  }

  getList = () => {
    if ((this.state.loggedin) || (document.cookie.split(';').filter((item) => item.includes('loggedin=true')).length)) {
      const url = '/api/list.php'
      axios.get(url).then(response => response.data)
      .then((data) => {
        if (Array.isArray(data)){
          const lastKey = data[data.length - 1].id
          this.setState({lastKey: lastKey})

          const items = data.filter(item => parseInt(item.removed) === 0)
          this.setState({items: items})

          const removed = data.filter(item => parseInt(item.removed) === 1)
          this.setState({removed: removed})
        } 
      })
    }
  }

  loadUsername = (cookieList) => {
    let username = cookieList.find(item => item.includes('username'))
    return username.split("=")[1]
  }

  componentDidMount() {
    const cookieList = document.cookie.split(';')
    if (this.state.loggedin || cookieList.filter(item => item.includes('loggedin=true')).length) {
      this.setState({loggedin: true})
      let username = this.loadUsername(cookieList)
      this.setState({username:username})
    }
    this.getList()
  }

  render() {
    const { username, loggedin, message, items, removed, categories } = this.state
    removed.sort((a, b) => {
      let x = a.item.toLowerCase()
      let y = b.item.toLowerCase()
      if (x < y) {return -1}
      if (x > y) {return 1}
      return 0
    })

    const lists = {items, removed}
    
    return (
      <div className="list">
        <h1>Grocery List</h1>
        
        <Login username={username} login={this.login} register={this.register} logout={this.logout} loggedin={loggedin}/>
        
        <div className="list-container">
          <InputBar addItem={this.addItem} lists={lists} categories={categories} editItem={this.editItem} readdItem={this.readdItem} />
          {message !== '' && <p>{message}</p>}
        
          <SortedList items={items} categories={categories} editItem={this.editItem} removeItem={this.removeItem}/>
          
          <div className='removed-list-container'>
            <RemovedList removed={removed} categories={categories} editItem={this.editItem} readdItem={this.readdItem} deleteItem={this.deleteItem} />
          </div>
          
        </div>
      </div>
    )
  }
}

export default List