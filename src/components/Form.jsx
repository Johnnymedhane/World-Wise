// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useURLPosition } from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useURLPosition();
  const { addCity, isLoading } = useCities();
  const navigate = useNavigate();


  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  
 
  

  useEffect(function () {
    if (!lat || !lng) return;

    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodingError("");

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok) {
          throw new Error("Error fetching city data");
        }
        
        const data = await res.json();
        // console.log(data);

        if (!data.countryCode) throw new Error(
          "That doesn't seem to be a valid location. Click somewhere else 😚");
        
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error("Error fetching city data:", error);
        setGeoCodingError(error.message);

      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
  
      fetchCityData();
    
    
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !country) return;
    
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
   
    await addCity(newCity);
    navigate('/app');

   
  }



  
  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat || !lng) return <Message message="Start by clicking on the map" />;

  if (geoCodingError) return <Message message={geoCodingError} />
  

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
         id="date"
          onChange={(date) => setDate(date)}
          selected={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type={"primary"}
         
          // onClick={(e) => {
          //   e.preventDefault();
          //   const emoji = convertToEmoji(country);
          //   const newCity = {
          //     cityName,
          //     date,
          //     notes,
          //     emoji,
          //     position: { lat, lng },
          //   };
          //   console.log(newCity);
          // }}
        >
          ADD
        </Button>
      <BackButton />
      </div>
    </form>
  );
}

export default Form;
