class Field extends React.Component {

    render () {
        const {name, value, onChange, children} = this.props
        return <div>
            <label htmlFor={name}>{children}</label>
            <input type="text" value={value} onChange={onChange} id={name} name={name} className="form-control"></input>
        </div>
    }
}

function Checkbox ({name, value, onChange, children}) {
    return <div>
    <input type="checkbox" checked={value} onChange={onChange} id={name} name={name} className="form-control"></input>
    <label htmlFor={name}>{children}</label>
</div>
}

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            prenom: '',
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()
        const data = JSON.stringify(this.state)
        this.setState({
            nom: '',
            prenom: '',
            newsletter: false
        })
    }

    render () {
        return <form onSubmit={this.handleSubmit}>
            <Field name="nom" value={this.state.nom} onChange={this.handleChange}>Nom</Field>
            <Field name="prenom" value={this.state.prenom} onChange={this.handleChange}>Prenom</Field>
            <Checkbox name="newsletter" vlaue={this.state.newsletter} onChange={this.handleChange}>S'abonner a la newsletter</Checkbox>
            <button>Envoyer</button>
        </form>
    }
}

ReactDOM.render(<Home />, document.querySelector("#app"))