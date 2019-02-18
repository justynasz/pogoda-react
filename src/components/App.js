import React, {
    Component
} from 'react';
import Form from './Form';
import Result from './Result';
import './App.css';

const APIKey = 'b1cdb5420f30aea1be9fd8bd2001db2d'
class App extends Component {

    state = {
        newcity: '',
        date: '',
        city: '',
        sunrice: '',
        sunset: '',
        temp: '',
        pressure: '',
        wind: '',
        error: ''
    }

    handleCityChange = e => {
        this.setState({
            newcity: e.target.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.newcity === 0) return
        if (prevState.newcity !== this.state.newcity) {
            const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.newcity}&APPID=${APIKey}&units=metric`

            fetch(API)
                .then(response => {
                    if (response.ok) {
                        return response
                    }
                    throw Error("Nie ma takiego miasta")
                })
                .then(response => response.json())
                .then(data => {
                    const time = new Date().toLocaleString()
                    this.setState(prevState => ({
                        error: false,
                        date: time,
                        sunrise: data.sys.sunrise,
                        sunset: data.sys.sunset,
                        temp: data.main.temp,
                        pressure: data.main.pressure,
                        wind: data.wind.speed,
                        city: prevState.newcity
                    }))
                })
                .catch(err => {
                    this.setState(prevState => ({
                        error: true,
                        city: prevState.newcity
                    }))
                })
        }
    }

    render() {
        return (
            <div className="App" >
                <h1>Prognoza pogody</h1>
                <Form newcity={this.state.newcity} change={this.handleCityChange} />
                <Result weather={this.state} />
            </div>
        );
    }
}

export default App;
