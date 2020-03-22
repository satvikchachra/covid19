class Statistics {
    async getStats() {

        const worldStatResponse = await
        fetch('https://covid19.mathdro.id/api/');
        const worldStatData = await worldStatResponse.json();

        return {
            worldData: worldStatData,

        }
    }

}