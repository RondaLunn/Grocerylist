import React, { Fragment } from 'react'
import ListItem from './ListItem'

const SortedList = props => {
    const { categories, items } = props
    return (
        <div className='sorted-list-container'>
            {
            categories.map(category => (
                <div key={category}>
                    {items.find(item => item.category === category) 
                    
                    && <Fragment>
                        <p>{category.charAt(0).toUpperCase() + category.substr(1).toLowerCase()}</p>
                        
                        <ul>{items.filter(item => item.category === category)
                        .map(item => (
                            <li key={item.id} id={item.id}>
                                <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={categories} editItem={props.editItem}/>
                                <button onClick={props.removeItem}>-</button>
                            </li>
                            ))}
                        </ul>
                        <ul>{items.filter(item => item.category === '')
                        .map(item => (
                            <li key={item.id} id={item.id}>
                                <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={categories} editItem={props.editItem}/>
                                <button onClick={props.removeItem}>-</button>
                            </li>
                            ))}
                        </ul>
                    </Fragment>
                    }                        
                </div>
            ))
            }
                
        </div>
    )
}

export default SortedList
