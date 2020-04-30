import React from 'react'
import ListItem from './ListItem'

const SearchResults = props => {
    const { searchList, query } = props
    return (
        <ul>
            {query && searchList.items.filter(item => item.item.includes(query))
            .map(item => (
                <li key={item.id}>
                <p>{item.item} (on list)</p>
                </li>
            ))}
            {query && searchList.removed.filter(item => item.item.includes(query))
            .map(item => (
                <li key={item.id} id={item.id}>
                <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={props.categories} editItem={props.editItem}/>
                <button name="add-item" onClick={props.readdItem}>+</button>
                </li>
            ))}
        </ul>
    )
}

export default SearchResults