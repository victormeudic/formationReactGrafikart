const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

const ProductRow = React.memo(function ({product}) {
    const name = product.stocked ? product.name : <span className='text-danger'>{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
})

function ProductCategoryRow ({category}) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

class ProductTable extends React.Component {

    render () {
        const {products, inStockOnly, filterText} = this.props
        const rows = []
        let lastCategory = null


        products.forEach(product => {
            if (inStockOnly && !product.stocked) {
                return
            }
            if (product.name.indexOf(filterText) === -1) {
                return
            }
            if (product.category !== lastCategory) {
                lastCategory = product.category
                rows.push(<ProductCategoryRow key={lastCategory} category={product.category}/>)
            }
            rows.push(<ProductRow key={product.name} product={product}/>)
        })
        return <table className="table">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    }
}

class SearchBar extends React.PureComponent {

    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleInStockOnlyChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render () {
        const {filterText, inStockOnly} = this.props
        return <div className="mb-3"> 
                <div className="form-group mb-0">
                <input type="texte" value={filterText} className="form-control" placeholder="Rechercher" onChange={this.handleFilterTextChange}></input>
                </div>
                <div className="form-check">
                    <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock" onChange={this.handleInStockOnlyChange}></input>
                    <label htmlFor="stock" className="form-check-label">Produit en stock uniquement</label>
                </div>
               </div>
    }
}

class FilterableProductsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this)
    }

    handleFilterTextChange (filterText) {
        this.setState({filterText})
    }

    handleInStockOnlyChange (inStockOnly) {
        this.setState({inStockOnly})
    }

    render () {
        const {products} = this.props
        return <React.Fragment>
            <SearchBar 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onStockChange={this.handleInStockOnlyChange}
            />
            <ProductTable 
            products={products}
            filterText={this.state.filterText}
            inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
    }
}

ReactDOM.render(<FilterableProductsTable products={PRODUCTS}/>, document.getElementById('tpListe'))

const PRODUCTS2 = [...PRODUCTS, {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 8"}
  ];

  window.setTimeout(function () {
    ReactDOM.render(<FilterableProductsTable products={PRODUCTS2}/>, 
    document.getElementById('tpListe'))
  }, 2000)