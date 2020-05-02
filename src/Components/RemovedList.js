import React, { Fragment } from 'react'
import ListItem from './ListItem'

const RemovedList = props => {
    const { removed } = props
    return (
        <div className='removed-list'>
            {removed.length > 0 
            && <Fragment>
                <p>Deleted Items</p>
                <ul>{removed.sort((a, b) => a.item - b.item).map(item => (
                    <li key={item.id} id={item.id}>
                        <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={props.categories} editItem={props.editItem}/>
                        <button onClick={props.readdItem}>+</button>
                        <button onClick={props.deleteItem}>-</button>
                    </li>
                ))}
                </ul>
            </Fragment>}
        </div>
    )
}

export default RemovedList
