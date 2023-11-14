import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [data, setData] = useState(null);

  const searchWeather = async () => {
    try {
      const API_KEY = "2251a57c372114733bbc1ab010aba8db";
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

      const response = await axios.get(API_URL);
      setWeather(response.data.weather[0].main); //날씨
      setTemperature(Math.round((response.data.main.temp - 273.15) * 10) / 10); //온도
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      searchWeather();
    }
  };

  return (
    <Container>
      <StyledInput
        type="text"
        id="cityInput"
        placeholder="도시를 입력하세요"
        onChange={handleInputChange}
        onKeyDown={handleEnter}
        required
      />
      {data && (
        <ResultContainer>
          <StyledCity>{cityName}</StyledCity>
          <StyledTemperature>{temperature} °C</StyledTemperature>
          <StyledWeather>{weather}</StyledWeather>
        </ResultContainer>
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledInput = styled.input`
  border: 1.5px solid;
  border-radius: 12px;
  padding: 10px;
  width: 130px;
  height: 20px;
  margin-bottom: 50px;
`;

const ResultContainer = styled.div`
  border: 1px solid;
  border-radius: 8px;
  text-align: left;
  width: 140px;
  height: 130px;
`;

const StyledCity = styled.div`
  padding: 7px;
  margin-bottom: 10px;
`;

const StyledTemperature = styled.div`
  margin-left: 7px;
  font-size: 40px;
  font-weight: bold;
`;

const StyledWeather = styled.div`
  text-align: right;
  margin-top: 15px;
  margin-right: 7px;
`;
