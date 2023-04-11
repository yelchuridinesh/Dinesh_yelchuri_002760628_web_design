import React, { useState, useEffect } from "react";
import WeatherData from "./WeatherData";
import TextField from "@material-ui/core/TextField";
import { useHistoryState } from "./useHistroy";
var moment = require("moment");

function WeatherContainer() {
  const [completeData, setCompleteData] = useState([]);
  const [dailyData, setDailyData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [cityName, setCityName] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setDailyData(JSON.parse(localStorage.getItem("data")) || []);
    if (dailyData.length <= 0) refreshData();
  }, []);

  let display;
  if (completeData.length > 0 || hasError == false) {
    display = displayData();
  }
  function changeText(event) {
    setCityName(event.target.value);
  }

  function displayData() {
    return dailyData.map((reading, index) => (
      <WeatherData
        reading={reading}
        key={index}
        completeData={completeData}
        cityName={cityName}
      />
    ));
  }
  function refreshData() {
    const _url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=0c36639da646d5a824cf4b105471b8b6`;
    fetch(_url)
      .then((res) => res.json())
      .then((data) => {
        const _data = data.list.filter((reading) =>
          reading.dt_txt.includes("00:00:00")
        );
        data.list.map(function (name) {
          let _date = new Date();
          const weekday = name.dt * 1000;
          _date.setTime(weekday);
          name.day = moment(_date).format("dddd");
        });

        setCompleteData(data.list);
        setHasError(false);
        setDailyData(_data);
        localStorage.setItem("data", JSON.stringify(_data));
        setDailyData(JSON.parse(localStorage.getItem("data")) || []);
      })
      .catch((err) => {
        setCompleteData([]);
        setHasError(true);
        setDailyData([]);
      });
  }
  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>
      <h1 style={{color:'White'}}>{cityName} Weather Report</h1>
      <br />
      <br />
      <div>
        <TextField
          id="city-name"
          label="Search City..."
          value={cityName}
          onChange={changeText}
        />
        {"     "}
        <input
          type="button"
          className="btn btn-success mt-3"
          value="Submit"
          onClick={refreshData}
          disabled={cityName == 0}
        />
      </div>
      <br />
      <br />

      <br />

      <div className="displayContainer">{display}</div>
    </div>
  );
}

export default WeatherContainer;
