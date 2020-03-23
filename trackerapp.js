const statistics = new Statistics();

const App = (function () {
    return {
        intit: function () {
            document.querySelector('.alert').style.display = 'none';

            statistics.getStats().then(
                data => {
                    const worldDataConfirmed = data.worldData.confirmed.value;

                    const worldDataRecovered = data.worldData.recovered.value;

                    const worldDataDeaths = data.worldData.deaths.value;

                    //display world statistics data

                    document.querySelector('.card-world-data-confirmed').textContent = `Confirmed Cases:  ${worldDataConfirmed}`;

                    document.querySelector('.card-world-data-recovered').textContent = `Recovered Cases: ${worldDataRecovered}`;

                    document.querySelector('.card-world-data-deaths').textContent = `Deaths: ${worldDataDeaths}`;


                });
        }
    }
})();

App.intit();