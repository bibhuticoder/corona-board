export const fetchGeneralData = function (isGlobal, callback, country) {
    let source = isGlobal ? "https://covid19.mathdro.id/api" : "https://covid19.mathdro.id/api/countries/" + country;

    axios.get(source).then(res => {
        let generalStats = {};
        generalStats.data = {
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value
        };
        generalStats.lastUpdatedAt = res.data.lastUpdate;
        // Calculate safe people
        const peopleOnEarth = 7530000000;
        generalStats.data.safe =
            peopleOnEarth -
            (generalStats.data.confirmed + generalStats.data.deaths);

        // if (isGlobal) {
        axios.get('https://covid19.mathdro.id/api/countries/').then(res => {
            generalStats.countries = res.data.countries;
            generalStats.loading = false;
            callback(generalStats);
        });
        // } else {
        //     generalStats.loading = false;
        //     callback(generalStats);
        // }

    });

    // else if (source.includes("coronavirus-tracker-api")) {
    //     axios.get(source).then(res => {
    //         let generalStats = {};
    //         generalStats.data = res.data.latest;
    //         // Calculate safe people
    //         generalStats.data.safe =
    //             peopleOnEarth -
    //             (generalStats.data.confirmed + generalStats.data.deaths);
    //         generalStats.loading = false;
    //         callback(generalStats);
    //     });
    // }

}

export const fetchGrowthData = function (callback) {
    axios.get('https://covid19.mathdro.id/api/daily').then(res => {
        let data = {};
        res.data.map(d => {
            data[d.reportDate] = {
                confirmed: d.totalConfirmed,
                deaths: d.deaths.total,
                recovered: d.totalRecovered
            }
        })
        callback(data);
    });
}

