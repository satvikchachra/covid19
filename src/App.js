import { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import './App.css';
import { sortData } from './util';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const endpointCountries = 'https://disease.sh/v3/covid-19/countries';
  const endpointWorld = 'https://disease.sh/v3/covid-19/all';

  useEffect(() => {
    const getCountriesData = async () => {

      await fetch(endpointCountries)
        .then(response => response.json())
        .then(data => {
          const countriesData = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: country.countryInfo._id
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countriesData);
        })
        .catch(err => console.log(err));
    };

    getCountriesData();

  }, [])

  useEffect(() => {
    fetch(endpointWorld)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
      .catch(err => console.log(err));
  }, []);

  const onCountryChangeHandler = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? endpointWorld
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
      });

    // console.log(countryCode);
  };

  console.log(countryInfo);


  // https://disease.sh/v3/covid-19/countries

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app__dropdown">

            <Select variant="outlined" value={country} onChange={onCountryChangeHandler}>
              <MenuItem key="worldwide" value="worldwide">Worldwide</MenuItem>
              {
                countries
                  .map(country =>
                    <MenuItem value={country.value}>
                      {country.name}
                    </MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title="Recovered Cases" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>

        <Map />

      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}>

          </Table>
          <h3>Worldwide New Cases</h3>
          
        </CardContent>
      </Card>


    </div>
  );
}

export default App;
