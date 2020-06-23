import React, { Fragment } from 'react'
import ListItem from './ListItem'

const SearchResults = props => {
    const { searchList, query } = props
    return (
        <Fragment>
            {query && <ul>
            {searchList.items.filter(item => item.item.toLowerCase().includes(query.toLowerCase()))
            .map(item => (
                <li key={item.id}>
                <p>{item.item} (on list)</p>
                </li>
            ))}
            {searchList.removed.filter(item => item.item.toLowerCase().includes(query.toLowerCase()))
            .map(item => (
                <li key={item.id} id={item.id}>
                <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={props.categories} editItem={props.editItem}/>
                <button name="add-item" onClick={props.readdItem}>+</button>
                </li>
            ))}
        </ul>}
        </Fragment>
    )
}

export default SearchResults