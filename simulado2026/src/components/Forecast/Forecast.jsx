import "./Forecast.css";
import { getWeatherInfo } from "../../services/weatherCodes";

function Forecast({ daily, catalog }) {

  function formatDate(date, index) {
    if (index === 0) return "Hoje";
    if (index === 1) return "Amanhã";

    return new Date(date + "T12:00:00").toLocaleDateString(
      "pt-BR",
      { weekday: "long" }
    );
  }

  // Aceita "nublado.svg", "/icones/nublado.svg" ou "icones/nublado.svg"
  function getIconSrc(icon) {
    return `/icones/${icon.replace(/^\/?icones\//, "")}`;
  }

  return (
    <section className="forecast-section">

      <h2>Previsão para os próximos 10 dias</h2>

      <div className="forecast-grid">

        {daily.time.map((date, index) => {

          const code = daily.weather_code[index];
          const info = getWeatherInfo(code, catalog);

          return (
            <article className="forecast-card" key={date}>

              <h3>
                {formatDate(date, index)}
              </h3>

              <p className="forecast-date">
                {new Date(date + "T12:00:00").toLocaleDateString("pt-BR")}
              </p>

              <img
                className="forecast-icon"
                src={getIconSrc(info.icon)}
                alt={info.description}
              />

              <p className="forecast-description">
                {info.description}
              </p>

              <div className="forecast-temperatures">
                <strong>
                  {daily.temperature_2m_max[index]}°
                </strong>

                <span>
                  {daily.temperature_2m_min[index]}°
                </span>
              </div>

              <p className="forecast-rain">
                💧 {daily.precipitation_probability_max[index] ?? 0}%
              </p>

            </article>
          );
        })}

      </div>
    </section>
  );
}

export default Forecast;
