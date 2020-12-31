import React, { Component } from 'react';
import { Badge,Card, CardBody, CardTitle } from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderSibling(props) {
    if (props.sibling.isDarivemula) {
        var color = 'primary';
        var text = 'Y'
    }
    else {
        var color = 'secondary';
        var text = 'N'
    }
    return (
        <Link to={`/members/${props.sibling.id}`}>
        <Card onClick={() =>props.selectMember(props.sibling)} >
            <CardBody >
                <CardTitle >{props.sibling.name} </CardTitle>
            </CardBody>
        </Card>
        </Link>
    );
}


class Siblings extends Component {

    render() {
       // console.log("inside render of siblings  " + JSON.stringify(this.props));

        if (this.props.siblings.length == 0) {
            return (
                <>
                    <h4 className="text-center">Siblings</h4>
                    <div className="text-danger text-center">No siblings are added</div>
                </>
            )
        }
        else {
            var siblings = this.props.siblings.map((sibling) => <RenderSibling key={sibling.id} sibling={sibling} selectMember={this.props.selectMember} />);
            return (
                <>
                    <h4 className="text-center">Siblings</h4>
                    {siblings}
                </>
            )
        }

    }
}

export default Siblings;