const apiKey = 'ee07e2bf337034f905cde0bdedae3db8';
const $forecastBody = $('#forecastBody');
const $submitCityButton = $('#submitCity');

/**
 * Retourne une classe d'icône Weather Icons en fonction de l'ID des conditions météo
 * Codes météo OpenWeatherMap:
 * Group 2xx: Thunderstorm
 * Group 3xx: Drizzle
 * Group 5xx: Rain
 * Group 6xx: Snow
 * Group 7xx: Atmosphere
 * Group 800: Clear
 * Group 80x: Clouds
 */
function getWeatherIconById(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        switch (weatherId) {
            case 200:
                return "wi-thunderstorm";
            case 201:
                return "wi-day-thunderstorm";
            case 202:
                return "wi-storm-showers";
            case 210:
                return "wi-lightning";
            case 211:
                return "wi-thunderstorm";
            case 212:
                return "wi-thunderstorm";
            case 221:
                return "wi-lightning";
            case 230:
                return "wi-storm-showers";
            case 231:
                return "wi-storm-showers";
            case 232:
                return "wi-storm-showers";
            default:
                return "wi-thunderstorm";
        }
    } else if (weatherId >= 300 && weatherId < 400) {
        switch (weatherId) {
            case 300:
                return "wi-sprinkle";
            case 301:
                return "wi-sprinkle";
            case 302:
                return "wi-rain-mix";
            case 310:
                return "wi-rain-mix";
            case 311:
                return "wi-rain-mix";
            case 312:
                return "wi-rain-mix";
            case 313:
                return "wi-showers";
            case 314:
                return "wi-showers";
            case 321:
                return "wi-showers";
            default:
                return "wi-sprinkle";
        }
    } else if (weatherId >= 500 && weatherId < 600) {
        switch (weatherId) {
            case 500:
                return "wi-rain";
            case 501:
                return "wi-rain";
            case 502:
                return "wi-rain-wind";
            case 503:
                return "wi-rain-wind";
            case 504:
                return "wi-rain-wind";
            case 511:
                return "wi-sleet";
            case 520:
                return "wi-showers";
            case 521:
                return "wi-showers";
            case 522:
                return "wi-showers";
            case 531:
                return "wi-showers";
            default:
                return "wi-rain";
        }
    } else if (weatherId >= 600 && weatherId < 700) {
        switch (weatherId) {
            case 600:
                return "wi-snow";
            case 601:
                return "wi-snow";
            case 602:
                return "wi-snow-wind";
            case 611:
                return "wi-sleet";
            case 612:
                return "wi-sleet";
            case 613:
                return "wi-sleet";
            case 615:
                return "wi-rain-mix";
            case 616:
                return "wi-rain-mix";
            case 620:
                return "wi-snow";
            case 621:
                return "wi-snow";
            case 622:
                return "wi-snow-wind";
            default:
                return "wi-snow";
        }
    } else if (weatherId >= 700 && weatherId < 800) {
        switch (weatherId) {
            case 701:
                return "wi-fog";
            case 711:
                return "wi-smoke";
            case 721:
                return "wi-day-haze";
            case 731:
                return "wi-dust";
            case 741:
                return "wi-fog";
            case 751:
                return "wi-dust";
            case 761:
                return "wi-dust";
            case 762:
                return "wi-volcano";
            case 771:
                return "wi-strong-wind";
            case 781:
                return "wi-tornado";
            default:
                return "wi-fog";
        }
    } else if (weatherId === 800) {
        return "wi-day-sunny";
    } else if (weatherId > 800 && weatherId <= 804) {
        switch (weatherId) {
            case 801:
                return "wi-day-cloudy";
            case 802:
                return "wi-cloud";
            case 803:
                return "wi-cloudy";
            case 804:
                return "wi-cloudy";
            default:
                return "wi-cloudy";
        }
    } else {
        return "wi-na";
    }
}

$submitCityButton.on('click', async function () {
    const cityInput = $('#cityInput').val().trim();

    if (!cityInput) {
        alert('Veuillez entrer une ville.');
        return;
    }

    const $existingCityLine = $forecastBody.find('.weather-line').filter(function () {
        return $(this).find('.city-name').text().toLowerCase() === cityInput.toLowerCase();
    });

    if ($existingCityLine.length > 0) {
        const $existingDetails = $existingCityLine.next('.weather-details');
        if ($existingDetails.length > 0) {
            $forecastBody.prepend($existingDetails);
        }
        $forecastBody.prepend($existingCityLine);

        const $notification = $('<div>', {
            text: 'La ville est déjà affichée. Elle a été remontée en haut de la liste.',
            css: {
                position: 'fixed',
                bottom: '100px',
                left: '20px',
                right: '20px',
                background: '#006bb3',
                color: 'white',
                padding: '15px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: '1000'
            }
        });
        $('body').append($notification);
        setTimeout(() => $notification.remove(), 3000);
        return;
    }

    try {
        // Fetch current weather
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&lang=fr&appid=${apiKey}`);
        if (!weatherResponse.ok) {
            alert('Ville introuvable.');
            return;
        }
        const weatherData = await weatherResponse.json();
        displayWeatherLine(weatherData);

        // Fetch 5-day forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&lang=fr&appid=${apiKey}`);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData.list);
        }

        // Limit results
        limitResults();
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo.', error);
    }
});

function displayWeatherLine(data) {
    const {name, main, weather, wind} = data;
    const {temp, pressure, humidity, temp_min, temp_max} = main;
    const {id: weatherId, description} = weather[0];
    const windSpeed = wind.speed;

    const iconClass = getWeatherIconById(weatherId);

    const $line = $('<div>', {class: 'weather-line'}).html(`
        <div class="weather-line-info">
            <i class="wi ${iconClass}"></i>
            <span class="city-name">${name}</span>
            <span class="temperature">${temp}°C</span>
        </div>
        <div class="expand-circle"></div>
    `);

    const $details = $('<div>', {class: 'weather-details'}).html(`
        <p><strong>Description :</strong> ${description}</p>
        <p><i class="wi wi-barometer"></i><strong> Pression :</strong> ${pressure} hPa</p>
        <p><i class="wi wi-humidity"></i><strong> Humidité :</strong> ${humidity}%</p>
        <p><i class="wi wi-strong-wind"></i><strong> Vent :</strong> ${windSpeed} m/s</p>
        <p><strong>Temp. Min :</strong> ${temp_min}°C</p>
        <p><strong>Temp. Max :</strong> ${temp_max}°C</p>
    `);

    $line.find('.expand-circle').on('click', function () {
        $details.toggleClass('open');
        $(this).toggleClass('open');
    });

    $forecastBody.prepend($details).prepend($line);
}

function groupForecastByDay(forecastList) {
    const dailyForecasts = {};
    forecastList.forEach(item => {
        // Extract date from dt_txt (format: "YYYY-MM-DD HH:mm:ss")
        const date = item.dt_txt.split(' ')[0];
        const time = item.dt_txt.split(' ')[1];

        // Prefer the 12:00:00 forecast for each day, if available
        if (!dailyForecasts[date] || time === '12:00:00') {
            dailyForecasts[date] = {
                ...item,
                date
            };
        }
    });
    return Object.values(dailyForecasts).slice(0, 5);
}

function displayForecast(forecastList) {
    // Remove existing forecast
    $forecastBody.find('.forecast-5day').remove();

    const dailyForecasts = groupForecastByDay(forecastList);
    if (dailyForecasts.length === 0) return;

    const $forecastContainer = $('<div>', {class: 'forecast-5day'}).html('<h3>Prévisions sur 5 jours</h3>');
    const $forecastGrid = $('<div>', {class: 'forecast-grid'});

    dailyForecasts.forEach(day => {
        const {main, weather, dt_txt} = day;
        const {temp} = main;
        const {id: weatherId, description} = weather[0];
        const iconClass = getWeatherIconById(weatherId);
        const date = new Date(dt_txt).toLocaleDateString('fr-FR', {weekday: 'long', day: 'numeric', month: 'long'});

        const $forecastDay = $('<div>', {class: 'forecast-day'}).html(`
            <p>${date}</p>
            <i class="wi ${iconClass}"></i>
            <p>${temp}°C</p>
            <p>${description}</p>
        `);
        $forecastGrid.append($forecastDay);
    });

    $forecastContainer.append($forecastGrid);
    $forecastBody.append($forecastContainer);
}

function limitResults() {
    const $weatherLines = $forecastBody.find('.weather-line');
    const $weatherDetails = $forecastBody.find('.weather-details');

    if ($weatherLines.length > 5) {
        $weatherLines.slice(5).remove();
        $weatherDetails.slice(5).remove();
    }
}

$('.nav-btn').on('click', function () {
    const page = $(this).data('page');
    alert(`Navigation vers ${page} (non implémenté)`);
});