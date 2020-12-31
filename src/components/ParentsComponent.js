import React, { Component } from 'react';
import { Badge,Card, CardBody, CardTitle } from 'reactstrap';
import {Link} from 'react-router-dom';

function RenderParent(props) {
   /* if (props.parent.isDarivemula) {
        var color = 'primary';
        var text = 'Y'
    }
    else {
        var color = 'secondary';
        var text = 'N'
    }*/
    return (
        <Link to={`/members/${props.parent.id}`}>
        <Card onClick={() =>props.selectMember(props.parent)} >
            <CardBody >
                <CardTitle >{props.parent.name} </CardTitle>
            </CardBody>
        </Card>
        </Link>
    );
}

class Parents extends Component {

    constructor(props) {
        super(props);
    }
    render() {
       // console.log("inside render of parents  " + JSON.stringify(this.props));

        if (this.props.parents.length === 0) {
            return (
                <>
                    <h4 className="text-center">Parents</h4>
                    <div className="text-danger text-center">No parents are added</div>
                </>
            )
        }
        else {
            var parents = this.props.parents.map((parent) => <RenderParent key={parent.id} parent={parent} selectMember={this.props.selectMember}/>);
            return (
                <>
                    <h4 className="text-center">Parents</h4>
                     {parents} 
                </>
            )
        }


    }
}

export default Parents;