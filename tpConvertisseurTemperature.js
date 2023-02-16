const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}

function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5/9
}

function toFahrenheit (celsius) {
    return (celsius) * 9/5 + 32
}

function tryConvert (temperature, convert) {
        const value = parseFloat(temperature)
        if (Number.isNaN(value)) {
            return ''
        }
        return (Math.round(convert(value) * 100) / 100)
}

class BoilingVerdict extends React.Component {

    render () {
        const {celsius} = this.props
        if (celsius < 100) {
            return <div>L'eau ne bout pas </div>
        }
        return <div>L'eau bout</div>
    }
}

class TemperatureInput extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render () {
        const {temperature} = this.props
        const name = 'scale' + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div>
            <label htmlFor={name}>Température en {scaleName}</label>
            <input type="texte" value={temperature} onChange={this.handleChange}></input>
        </div>
    }
}

function Button ({type, children}) {
    const className = 'btn btn-' + type
    return <button className={className}>{children}</button>
}

function PrimaryButton ({children}) {
    return <Button type="primary">{children}</Button>
}

class Calculator extends React.Component {

    constructor (props) {
    super(props) 
    this.state = {
        scale: 'c',
        temperature: 20 
        }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange (temperature) {
        this.setState({
            scale: 'c',
            temperature
        })
    }

    handleFahrenheitChange (temperature) {
        this.setState({
            scale: 'f',
            temperature
        })
    }

    render () { 
        const {temperature, scale} = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
            <BoilingVerdict celsius={celsius} />
            <Button type="primary">Envoye</Button>
        </div>
    }
}

//ReactDOM.render(<Calculator/>, document.querySelector("#tp"))