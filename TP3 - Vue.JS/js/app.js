const { createApp } = Vue;

createApp({
    data() {
        return {
            apiKey: 'ee07e2bf337034f905cde0bdedae3db8',
            cityInput: '',
            weatherList: [],
            forecastList: [],
        };
    },
    methods: {
        async fetchWeather() {
            if (!this.cityInput.trim()) {
                alert('Veuillez entrer une ville.');
                return;
            }

            const city = this.cityInput.trim();
            const existingWeather = this.weatherList.find(w => w.name.toLowerCase() === city.toLowerCase());

            if (existingWeather) {
                this.weatherList = this.weatherList.filter(w => w !== existingWeather);
                this.weatherList.unshift(existingWeather);
                this.showNotification('La ville est déjà affichée. Elle a été remontée en haut de la liste.');
                return;
            }

            try {
                // Fetch current weather
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${this.apiKey}`);
                if (!weatherResponse.ok) {
                    alert('Ville introuvable.');
                    return;
                }
                const weatherData = await weatherResponse.json();
                weatherData.showDetails = false;
                this.weatherList.unshift(weatherData);

                // Fetch 5-day forecast
                const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${this.apiKey}`);
                if (forecastResponse.ok) {
                    const forecastData = await forecastResponse.json();
                    this.forecastList = this.groupForecastByDay(forecastData.list);
                }

                // Limit to 5 results
                if (this.weatherList.length > 5) {
                    this.weatherList = this.weatherList.slice(0, 5);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données météo.', error);
            }
        },
        getWeatherIcon(weatherId) {
            if (weatherId >= 200 && weatherId < 300) {
                return {
                    200: "wi-thunderstorm",
                    201: "wi-day-thunderstorm",
                    202: "wi-storm-showers",
                    210: "wi-lightning",
                    211: "wi-thunderstorm",
                    212: "wi-thunderstorm",
                    221: "wi-lightning",
                    230: "wi-storm-showers",
                    231: "wi-storm-showers",
                    232: "wi-storm-showers"
                }[weatherId] || "wi-thunderstorm";
            } else if (weatherId >= 300 && weatherId < 400) {
                return {
                    300: "wi-sprinkle",
                    301: "wi-sprinkle",
                    302: "wi-rain-mix",
                    310: "wi-rain-mix",
                    311: "wi-rain-mix",
                    312: "wi-rain-mix",
                    313: "wi-showers",
                    314: "wi-showers",
                    321: "wi-showers"
                }[weatherId] || "wi-sprinkle";
            } else if (weatherId >= 500 && weatherId < 600) {
                return {
                    500: "wi-rain",
                    501: "wi-rain",
                    502: "wi-rain-wind",
                    503: "wi-rain-wind",
                    504: "wi-rain-wind",
                    511: "wi-sleet",
                    520: "wi-showers",
                    521: "wi-showers",
                    522: "wi-showers",
                    531: "wi-showers"
                }[weatherId] || "wi-rain";
            } else if (weatherId >= 600 && weatherId < 700) {
                return {
                    600: "wi-snow",
                    601: "wi-snow",
                    602: "wi-snow-wind",
                    611: "wi-sleet",
                    612: "wi-sleet",
                    613: "wi-sleet",
                    615: "wi-rain-mix",
                    616: "wi-rain-mix",
                    620: "wi-snow",
                    621: "wi-snow",
                    622: "wi-snow-wind"
                }[weatherId] || "wi-snow";
            } else if (weatherId >= 700 && weatherId < 800) {
                return {
                    701: "wi-fog",
                    711: "wi-smoke",
                    721: "wi-day-haze",
                    731: "wi-dust",
                    741: "wi-fog",
                    751: "wi-dust",
                    761: "wi-dust",
                    762: "wi-volcano",
                    771: "wi-strong-wind",
                    781: "wi-tornado"
                }[weatherId] || "wi-fog";
            } else if (weatherId === 800) {
                return "wi-day-sunny";
            } else if (weatherId > 800 && weatherId <= 804) {
                return {
                    801: "wi-day-cloudy",
                    802: "wi-cloud",
                    803: "wi-cloudy",
                    804: "wi-cloudy"
                }[weatherId] || "wi-cloudy";
            }
            return "wi-na";
        },
        toggleDetails(index) {
            this.weatherList[index].showDetails = !this.weatherList[index].showDetails;
        },
        groupForecastByDay(forecastList) {
            const dailyForecasts = {};
            forecastList.forEach(item => {
                // Extract date from dt_txt (format: "YYYY-MM-DD HH:mm:ss")
                const date = item.dt_txt.split(' ')[0];
                const time = item.dt_txt.split(' ')[1];

                // Prefer the 12:00:00 forecast for each day, if available
                if (!dailyForecasts[date] || time === '12:00:00') {
                    dailyForecasts[date] = {
                        ...item,
                        date // Store the date for display
                    };
                }
            });
            // Convert to array and limit to 5 days
            return Object.values(dailyForecasts).slice(0, 5);
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        },
        showNotification(message) {
            const notification = document.createElement('div');
            notification.textContent = message;
            notification.style.cssText = 'position:fixed; bottom:100px; left:20px; right:20px; background:#006bb3; color:white; padding:15px; border-radius:5px; box-shadow:0 2px 4px rgba(0,0,0,0.2); z-index:1000';
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
        },
        navigate(page) {
            alert(`Navigation vers ${page} (non implémenté)`);
        }
    }
}).mount('#app');