


import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { useCities } from '../contexts/CitiesContext';

function CountriesList() {
    const { cities, isLoading } = useCities();
    console.log(cities)
   
    if (isLoading) return <Spinner />;
    if ( !cities.length) return <Message message="Add your country by clicking on a country on the map"/>;
    
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr
    }
        , [])
    console.log(countries)
    return (
        <ul className={styles.countriesList}>
            {countries.map((country) => (
              <CountryItem  country={country} >  </CountryItem> 
            ))}
</ul>
    )
}

export default CountriesList