/** @jsx React.DOM */

// The above declaration must remain intact at the top of the script.
var converter = new Showdown.converter();

var Comment = React.createClass({
    render: function() {
        console.log("........inside ?????? render.........")
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <tr>
                <td>{this.props.product}</td>
                <td>{this.props.about}</td>
                <td>{this.props.quantity}</td>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
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
        console.log("........inside products render.........")
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
                    <CommentList data={this.state.data}/>
                </div>
            </div>
            );
    }
});

var CommentList = React.createClass({
    render: function() {
        console.log("........inside comment list render.........")
        var commentNodes = this.props.data.map(function(comment, index) {
            //console.log("index = " + index + ", comment: " + comment);
            return (
                <Comment key={index} about={comment.about} product={comment.product} quantity={comment.quantity}>{comment.product}</Comment>

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
                    {commentNodes}
                </table>
            </div>
            );
    }
});

console.log("hello");

React.renderComponent(
    <Products url="/products" pollInterval={2000}/>,
    document.getElementById('content')
);
