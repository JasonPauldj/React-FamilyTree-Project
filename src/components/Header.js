import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';


class Header extends Component {
    render() {
        return (
            <Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2>Darivemula Family Tree</h2>
                        </div>
                    </div>
                </div>
            </Jumbotron>
        );
    }
}

export default Header;