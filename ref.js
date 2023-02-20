class Field extends React.Component {

    render () {
        return <div>
            <label htmlFor="">{this.props.label}</label>
            <input type="text" className="form-control" ref={this.props.forwardRef}></input>
        </div>
    }
}

const FieldWithRef = React.forwardRef((props, ref) => {
    return <Field forwardRef={ref} {...props}/>
})

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.input = React.createRef()
    }

    handleClick (e) {
        console.log(this.input.current.value);
    }
    render () {
        console.log(this.input);
        return <div>
            <FieldWithRef ref={this.input} label="demo"/>
                <button onClick={this.handleClick}>Tester</button>
        </div>
    }
}

ReactDOM.render(<Home />, document.getElementById('ref'))