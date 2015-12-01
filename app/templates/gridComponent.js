//React Component

var SingleProduct = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.product}</td>
                <td>{this.props.about}</td>
                <td>{this.props.quantity}</td>
            </tr>
            );
    }
});

var Products = React.createClass({

    loadProductsFromServer: function() {
        $.ajax({
            url: this.props.url,

            dataType: 'json',

            success: function(data) {
                this.setState({data: data});
            }.bind(this),

            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)

        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount: function() {
        this.loadProductsFromServer();
        //setInterval(this.loadProductsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="container">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">Products</h3>
                        <div className="pull-right">
                            <span className="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">
                                <i className="glyphicon glyphicon-filter"></i>
                            </span>
                        </div>
                    </div>
                    <div className="panel-body">
                    <input type="text" className="form-control" id="dev-table-filter" data-action="filter" data-filters="#dev-table" placeholder="Filter Products" />
                    </div>
                    <ProductList data={this.state.data}/>
                </div>
            </div>
            );
    }
});

var ProductList = React.createClass({
    render: function() {
        var productNodes = this.props.data.map(function(product, index) {
            return (
                <SingleProduct key={index} about={product.about} product={product.product} quantity={product.quantity}>{product.product}</SingleProduct>

                );
        });
        return (
            <div className="panel-body">
                <table className="table table-hover" id="dev-table">
                    <thead>
                        <tr>
                            <th>Products</th>
                            <th>Product Description</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    {productNodes}
                </table>
            </div>
            );
    }
});


ReactDOM.render(
    <Products url="/products" pollInterval={2000}/>,
    document.getElementById('content')
);
