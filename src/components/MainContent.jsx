// import Grid from '@mui/material/Grid'; // Grid version 1
import { Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';
import '../../node_modules/moment/dist/locale/ar';
moment.locale('ar');
import { egyptMajorCities } from '../constants/cities';
import { saudiArabiaMajorCities } from '../constants/cities';
export default function MainContent() {

    const [timings, setTimings] = useState([]);

    const [selectedCity, setSelectedCity] = useState({
        displayName: '',
        apiName: null
    });

    const [country, setCountry] = useState({
        displayName: '',
        apiName: null
    });

    const [time, setTime] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    










    const handleCitySelect = (e) => {
        setSelectedCity({
            displayName: e.target.value.displayName,
            apiName: e.target.value.apiName
        });
    };
    const handleCountrySelect = (e) => {
        setCountry({
            displayName: e.target.value.displayName,
            apiName: e.target.value.apiName
        });
    };


    const params = {
        city: selectedCity.apiName,
        country: country.apiName,
        MethodID: 5
    };

    // useEffect(() => {
    //     axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=${country.apiName}&method=8` , {
    //     }).then(res => {
    //         setTimings(res.data.data.timings);
    //     })
    //     console.log(moment().isAfter(moment(timings.Asr, 'HH:mm')));

    // }, [selectedCity.apiName, country.apiName]);

    useEffect(() => {
        axios.get(`https://api.aladhan.com/v1/timingsByCity`, {params} , {
        }).then(res => {
            setTimings(res.data.data.timings);
        })
        console.log(moment().isAfter(moment(timings.Asr, 'HH:mm')));

    }, [selectedCity.apiName, country.apiName]);
    
    const now = moment();
    useEffect(() => {
        let timeInterval=setInterval(() => {
            setCurrentTime(now.format(' h:mm:ss'))
        },1000)

        return () => {
            clearInterval(timeInterval);
        }
        
    },[currentTime])
    return (
        <>
            {/* top row */}
            <Grid container style={{
                width: '100%',
            }}>
                <Grid xs={6}>
                    <div>
                        <h2>{time}</h2>
                        <h1>{selectedCity.displayName} - {country.displayName}</h1>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div>
                        <h2>الساعة الأن : {currentTime}</h2>
                    </div>
                </Grid>
            </Grid>
            {/* top row */}

            <Divider style={{
                borderColor: 'white',
                opacity: '0.1'
            }} />
            {/* prayers cards */}
            <Stack direction={'row'} justifyContent={'space-between'} marginTop={'50px'}>
                <Prayer name={'الفجر'} time={timings.Fajr ? timings.Fajr : ' اختر الدولة والمدينة'} image={"https://img.freepik.com/free-vector/ramadan-landscape-background-sunset_1048-1800.jpg?size=626&ext=jpg&uid=R115104728&ga=GA1.2.1435844997.1694360357&semt=ais"} />
                <Prayer name={'الظهر'} time={timings.Dhuhr? timings.Dhuhr : ' اختر الدولة والمدينة'} image={"https://img.freepik.com/free-photo/beautiful-white-mosque-blue-sky-khasab-oman_181624-39804.jpg?size=626&ext=jpg&uid=R115104728&ga=GA1.2.1435844997.1694360357&semt=ais"} />
                <Prayer name={'العصر'} time={timings.Asr? timings.Asr : ' اختر الدولة والمدينة'} image={"https://img.freepik.com/free-photo/breathtaking-sunset-evening_181624-35011.jpg?size=626&ext=jpg&uid=R115104728&ga=GA1.2.1435844997.1694360357&semt=ais"} />
                <Prayer name={'المغرب'} time={timings.Maghrib? timings.Maghrib : ' اختر الدولة والمدينة'} image={"https://img.freepik.com/free-photo/sunset-desert-with-muslim-mosque-foreground_1385-1.jpg?size=626&ext=jpg&uid=R115104728&ga=GA1.2.1435844997.1694360357&semt=sph"} />
                <Prayer name={'العشاء'} time={timings.Isha? timings.Isha : 'اختر الدولة والمدينة '  } image={"https://img.freepik.com/free-photo/blue-mosque-istanbul_1157-8842.jpg?size=626&ext=jpg&uid=R115104728&ga=GA1.2.1435844997.1694360357&semt=sph"} />
            </Stack>
            {/* prayers cards */}








            {/* select country */}

            <Stack direction={'row'} justifyContent={'center'} marginTop={'40px'}>
                <FormControl style={{
                    width: '20%'
                }}>
                    <InputLabel id="country"><span style={{ color: 'white' }}>الدولة</span></InputLabel>
                    <Select
                        style={{
                            color: 'white',
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="الدولة"
                        onChange={handleCountrySelect}


                    >
                        <MenuItem value={{
                            displayName: 'السعودية',
                            apiName: 'Saudi Arabia'

                        }}>السعودية</MenuItem>

                        <MenuItem value={{
                            displayName: 'مصر',
                            apiName: 'Egypt'

                        }}>مصر</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
            {/* select country */}








            {/* select city */}
            {country.apiName && <Stack direction={'row'} justifyContent={'center'} marginTop={'40px'}>
                
                <FormControl style={{
                    width: '20%'
                }}>
                    <InputLabel id="demo-simple-select-label"><span style={{ color: 'white' }}>المدينة</span></InputLabel>
                    <Select
                        style={{
                            color: 'white',
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="المدينة"
                        onChange={handleCitySelect}
                    >

                        {country.apiName === 'Saudi Arabia' ? saudiArabiaMajorCities.map((city) => {
                            return <MenuItem key={city.apiName} value={{
                                apiName: city.apiName,
                                displayName: city.displayName

                            }}>{city.displayName}</MenuItem>
                        })
                            : egyptMajorCities.map((city) => {
                                return <MenuItem key={city.apiName} value={{
                                    apiName: city.apiName,
                                    displayName: city.displayName

                                }}>{city.displayName}</MenuItem>
                            })
                        }



                    </Select>
                </FormControl>
            </Stack>}
            {/* select city */}

        </>
    )
}
