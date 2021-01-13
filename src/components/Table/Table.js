import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country, idx) => (
        <tr key={idx}>
          <td> <img alt="flag" style={{height: '1rem', width: '1.5rem'}} src={country.countryInfo.flag} /></td>
          <td>{country.country}</td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
