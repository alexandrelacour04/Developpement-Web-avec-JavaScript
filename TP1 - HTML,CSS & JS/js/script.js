const apiKey = 'ee07e2bf337034f905cde0bdedae3db8';
const forecastBody = document.getElementById('forecastBody');
const submitCityButton = document.getElementById('submitCity');

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

submitCityButton.addEventListener('click', async () => {
    const cityInput = document.getElementById('cityInput').value.trim();

    if (!cityInput) {
        alert('Veuillez entrer une ville.');
        return;
    }

    const existingCityLine = [...forecastBody.getElementsByClassName('weather-line')].find((line) =>
        line.querySelector('.city-name')?.textContent.toLowerCase() === cityInput.toLowerCase()
    );

    if (existingCityLine) {
        // Si la ville existe, déplacer la ligne ET les détails associés.
        const existingDetails = existingCityLine.nextElementSibling;

        if (existingDetails && existingDetails.classList.contains('weather-details')) {
            // Déplacer les deux éléments ensemble en haut du conteneur.
            forecastBody.prepend(existingDetails);
        }
        forecastBody.prepend(existingCityLine);

        // Optionnel : notifier l'utilisateur
        const notification = document.createElement('div');
        notification.textContent = 'La ville est déjà affichée. Elle a été remontée en haut de la liste.';
        notification.style.cssText = 'position:fixed; bottom:100px; left:20px; right:20px; background:#006bb3; color:white; padding:15px; border-radius:5px; box-shadow:0 2px 4px rgba(0,0,0,0.2); z-index:1000';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);

        return;
    }

    try {
        // Requête pour les données météo.
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&lang=fr&appid=${apiKey}`);
        if (!response.ok) {
            alert('Ville introuvable.');
            return;
        }

        const weatherData = await response.json();

        // Ajouter une nouvelle ligne météo.
        displayWeatherLine(weatherData);

        // Limiter le nombre de résultats affichés à 5.
        limitResults();
    } catch (error) {
        console.error('Erreur lors de la récupération des données météo.', error);
    }
});

function displayWeatherLine(data) {
    const {name, main, weather, wind} = data;
    const {temp, pressure, humidity} = main;
    const {id: weatherId, description} = weather[0];
    const windSpeed = wind.speed;

    const line = document.createElement('div');
    line.className = 'weather-line';

    const iconClass = getWeatherIconById(weatherId);

    line.innerHTML = `
        <div class="weather-line-info">
            <i class="wi ${iconClass}"></i>
            <span class="city-name">${name}</span>
            <span class="temperature">${temp}°C</span>
        </div>
        <div class="expand-circle"></div>
    `;

    const details = document.createElement('div');
    details.className = 'weather-details';
    details.innerHTML = `
        <p><strong>Description :</strong> ${description}</p>
        <p><i class="wi wi-barometer"></i><strong> :</strong> ${pressure} hPa</p>
        <p><i class="wi wi-humidity"></i><strong> :</strong> ${humidity}%</p>
        <p><i class="wi wi-strong-wind"></i><strong> :</strong> ${windSpeed} m/s</p>
    `;

    const expandButton = line.querySelector('.expand-circle');
    expandButton.addEventListener('click', () => {
        if (details.classList.contains('open')) {
            details.classList.remove('open');
            expandButton.classList.remove('open');
        } else {
            details.classList.add('open');
            expandButton.classList.add('open');
        }
    });

    forecastBody.prepend(details);
    forecastBody.prepend(line);
}

function limitResults() {
    const weatherLines = Array.from(forecastBody.getElementsByClassName('weather-line'));
    const weatherDetails = Array.from(forecastBody.getElementsByClassName('weather-details'));

    if (weatherLines.length > 6) {
        const linesToRemove = weatherLines.slice(6);
        const detailsToRemove = weatherDetails.slice(6);

        linesToRemove.forEach(line => line.remove());
        detailsToRemove.forEach(detail => detail.remove());
    }
}