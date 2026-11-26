import "./CurrentWeather.css";
import { getWeatherInfo } from "../../services/weatherCodes";
import {
  ThermometerIcon,
  DropletIcon,
  WindIcon,
  SunIcon,
  SunriseIcon
} from "../Icons/Icons";

function CurrentWeather({ location, weather, catalog }) {
  const { current, daily } = weather;

  const info = getWeatherInfo(current.weather_code, catalog);
  const iconSrc = `/icones/${info.icon.replace(/^\/?icones\//, "")}`;

  // "2026-11-26T18:45" -> "18:45"
  const formatTime = (iso) => (iso ? iso.slice(11, 16) : "--:--");

  const region = [location.admin1, location.country]
    .filter(Boolean)
    .join(" — ");

  const details = [
    {
      icon: <ThermometerIcon />,
      label: "Sensação",
      value: `${Math.round(current.apparent_temperature)}°C`
    },
    {
      icon: <DropletIcon />,
      label: "Umidade",
      value: `${current.relative_humidity_2m}%`
    },
    {
      icon: <WindIcon />,
      label: "Vento",
      value: `${Math.round(current.wind_speed_10m)} km/h`
    },
    {
      icon: <DropletIcon />,
      label: "Precipitação",
      value: `${current.precipitation} mm`
    },
    {
      icon: <SunIcon />,
      label: "Índice UV",
      value: current.uv_index
    },
    {
      icon: <SunriseIcon />,
      label: "Nascer / Pôr do sol",
      value: `${formatTime(daily.sunrise[0])} / ${formatTime(daily.sunset[0])}`
    }
  ];

  return (
    <section className="current-weather">

      <div className="current-top">
        <div>
          <h2>{location.name}</h2>
          <p className="current-region">{region}</p>
        </div>

        <p className="current-updated">
          Atualizado às {formatTime(current.time)}
        </p>
      </div>

      <div className="current-body">

        <div className="current-main">
          <img
            className="current-icon"
            src={iconSrc}
            alt={info.description}
          />

          <div>
            <p className="temperature">
              {Math.round(current.temperature_2m)}°C
            </p>
            <p className="current-description">{info.description}</p>
          </div>
        </div>

        <div className="weather-details">
          {details.map((item) => (
            <div className="detail-item" key={item.label}>
              <span className="detail-label">
                {item.icon}
                {item.label}
              </span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default CurrentWeather;
