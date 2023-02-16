function WelcomeFunc ({name, children}) {
    return <div>
        <h1>Bonjour {name}</h1>
        <p>{children}</p>
    </div>
}

class Welcome extends React.Component {

    render() {
        return <div>
        <h1>Bonjour {this.props.name}</h1>
        <p>{this.props.children}</p>
    </div>
    }
}

class Clock extends React.Component {

    constructor (props) {
        super (props)
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount () {
        this.timer = window.setInterval(this.tick.bind(this), 1000)
    }

    componentwillUnount () {
        window.clearInterval(this.timer)
    }

    tick () {
        this.setState({date: new Date()})
    }

    render() {
        return <div>
            {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {value: props.start}
        this.timer = null
    }

    componentDidMount () {
        this.timer = window.setInterval((this.increment.bind(this)), 1000)
    }

    componentwillUnount () {
        window.clearInterval(this.timer)
    }

    increment () {
        this.setState(function (state, props) {
            return {value: state.value + props.step}
        })
    }

    render () {
        return <p>{this.state.value}</p>
    }
}

Incrementer.defaultProps = {
    start: 0,
    step: 1
}

function Home() {
    return <div>
        <Welcome name="Victor" />
        <Welcome name="Meudic" />
        <Clock />
        <Incrementer start={10}/>
        <Incrementer start={10} step={10}/>
    </div>
}

ReactDOM.render(<Home />, document.querySelector("#app"))