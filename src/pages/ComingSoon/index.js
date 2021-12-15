import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ComingSoon extends Component {
    render() {
        return (
            <div id="content">
                <div className="container-fluid">
                    {/* <!-- 404 Error Text --> */}
                    <div className="text-center">
                        <div className="error mx-auto" data-text="Wait!">Wait!</div>
                        <p className="lead text-gray-800 mb-5">Coming Soon...</p>
                        <p className="text-gray-500 mb-0">This feature is coming very soon, we will inform you...</p>
                        <Link to="/dashboard">&larr; Back to main</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ComingSoon);