import React from 'react';
import classes from './Table.module.css';

const Table = props => {
    return (
        <div className={classes.table}>
            {props.countries.map(country => (
                <tr>
                    <td>{country.country}</td>
                    <td>
                        <strong>{country.cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}
export default Table;