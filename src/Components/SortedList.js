import React from 'react'
import ListItem from './ListItem'

const SortedList = props => {
    const { categories, items } = props
    return (
        <div>
            {
                categories.map(category => (
                    <div key={category}>
                        <p>{category.charAt(0).toUpperCase() + 
                            category.substr(1).toLowerCase()}</p>
                        
                        <ul>{items.filter(item => item.category === category)
                        .map(item => (
                            <li key={item.id} id={item.id}>
                                <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={categories} editItem={props.editItem}/>
                                <button onClick={props.removeItem}>-</button>
                            </li>
                            ))}
                        </ul>                        
                    </div>
                ))
            }
                <ul>{items.filter(item => item.category === '')
                .map(item => (
                    <li key={item.id} id={item.id}>
                        <ListItem id={item.id} item={item.item} quantity={item.quantity} category={item.category} categories={categories} editItem={props.editItem}/>
                        <button onClick={props.removeItem}>-</button>
                    </li>
                    ))}
                </ul>
        </div>
    )
}

export default SortedList
