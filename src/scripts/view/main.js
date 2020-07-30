const axios = require("axios");
import Chart from "chart.js";

const main = () => {
    const baseUrl = `https://corona.lmao.ninja/v3/covid-19`;
    const getAllData = () => {
        axios
            .get(`${baseUrl}/all`)
            .then((res) => res.data)
            .then((data) => {
                renderData(data);
                setChart(data);
            })
            .catch((error) => console.log(`message: ${error}`));
    };

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    };

    const renderData = (data) => {
        const dataGlobal = document.querySelector("#index__card");
        dataGlobal.innerHTML = "";

        dataGlobal.innerHTML += `
            <div class="card blue">
                <div class="card-body">
                    <h5 class="card-title">Terinfeksi</h5>
                    <p class="card-text infected">
                        <h3 style = "color: blue">+${formatNumber(
                            data.todayCases
                        )}</h3>
                        
                    </p>
                </div>
                <div class="card-footer">
                    <h6>Total : ${formatNumber(data.cases)}</h6>
                </div>
            </div>
            <div class="card green">
                <div class="card-body">
                    <h5 class="card-title">Sembuh</h5>
                    <p class="card-text recovered">
                        <h3 style = "color: green">+${formatNumber(
                            data.todayRecovered
                        )}</h3>
                        
                    </p>
                </div>
                <div class="card-footer">
                    <h6>Total : ${formatNumber(data.recovered)}</h6>
                </div>
            </div>
            <div class="card red">
                <div class="card-body">
                    <h5 class="card-title">Meninggal</h5>
                    <p class="card-text deaths">
                        <h3 style = "color: red">+${formatNumber(
                            data.todayDeaths
                        )}</h3>
                    </p>
                </div>
                <div class="card-footer">
                    <h6>Total : ${formatNumber(data.deaths)}</h6>
                </div>
            </div>
        `;
    };

    const worldwideSelection = {
        name: "worldwide",
        value: "www",
        selected: true,
    };

    const getAllDataCountries = () => {
        axios
            .get(`${baseUrl}/countries`)
            .then((res) => res.data)
            .then((data) => {
                setCountriesList(data);
                sortingCountry(data);
            });
    };

    const setCountriesList = (data) => {
        let countriesList = [];
        countriesList.push(worldwideSelection);
        data.forEach((countryData) => {
            countriesList.push({
                name: countryData.country,
                value: countryData.countryInfo.iso3,
            });
        });
        renderSelectOption(countriesList);
    };

    const renderSelectOption = (data) => {
        const select = document.querySelector("#index__dropdown");
        select.innerHTML = "";
        data.forEach((country) => {
            select.innerHTML += `
            <option value=${country.value}>${country.name}</option>
            `;
        });
    };

    const getCountryData = (country) => {
        axios
            .get(`${baseUrl}/countries/${country}`)
            .then((res) => res.data)
            .then((data) => {
                renderData(data);
                setChart(data);
            });
    };

    const setSelect = () => {
        const select = document.querySelector("#index__dropdown");
        select.addEventListener("change", (e) => {
            if (e.target.value !== "www"){
                getCountryData(e.target.value);
            } else {
                getAllData();
            }
        });
    };

    const renderTableData = (data) => {
        const tableData = document.querySelector("#table-data");
        tableData.innerHTML = "";
        let i = 0;
        data.forEach((country) => {
            tableData.innerHTML += `
                    <tr>
                        <td>${++i}</td>
                        <td><img src=${country.countryInfo.flag} alt=${
                country.countryInfo.iso3
            } style="width: 20px"/> ${country.country}</td>
                        <td>${formatNumber(country.cases)}</td>
                    </tr>
            `;
        });
    };

    const sortingCountry = (data) => {
        const sortedCountries = [];
        data.forEach((country) => {
            sortedCountries.push(country);
        });

        for (let i = 0; i < sortedCountries.length; i++) {
            for (let j = i; j < sortedCountries.length; j++) {
                if (sortedCountries[i].cases < sortedCountries[j].cases) {
                    let max_obj = sortedCountries[i];
                    sortedCountries[i] = sortedCountries[j];
                    sortedCountries[j] = max_obj;
                }
            }
        }
        renderTableData(sortedCountries);
    };

    const setChart = (data) => {
        const cjs = document
            .querySelector("#index__dataChart")
            .getContext("2d");

        const dataChart = new Chart(cjs, {
            type: "bar",
            data: {
                labels: ["Terinfeksi", "Sembuh", "Meninggal"],
                datasets: [
                    {
                        label: "Jumlah Orang",
                        data: [data.cases, data.recovered, data.deaths],
                        backgroundColor: ["blue", "green", "red"]
                    },
                ],
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    };

    getAllDataCountries();
    getAllData();
    setSelect();
};

export default main;
