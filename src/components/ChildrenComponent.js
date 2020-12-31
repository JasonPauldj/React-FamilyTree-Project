import React, { Component } from 'react';
import { Badge, Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import AddChildComponent from './AddChildComponent';
import {Link} from 'react-router-dom';

function RenderChild(props) {
   /* if (props.child.isDarivemula) {
        var color = 'primary';
        var text = 'Y'
    }
    else {
        var color = 'secondary';
        var text = 'N'
    }*/
    return (
        <Link to={`/members/${props.child.id}`}>
        <Card onClick={() => props.selectMember(props.child)}>
            <CardBody >
                <CardTitle>{props.child.name} </CardTitle>
                <CardSubtitle></CardSubtitle>
            </CardBody>
        </Card>
        </Link>
    );
}


class Children extends Component {

    render() {
      //  console.log("inside render of children  " + JSON.stringify(this.props));

        if (this.props.children.length === 0) {
            return (
                <>
                    <h4 className="text-center">Children</h4>
                    <div className="text-danger text-center">No children are added</div>
                    <br></br>
                    <div className="d-flex justify-content-center">
                    <AddChildComponent selected_member={this.props.selected_member} postMember={this.props.postMember}  />
                    </div>
                </>
            )
        }
        else {
            var children = this.props.children.map((child) => <RenderChild key={child.id} child={child} selectMember={this.props.selectMember} />);
            return (
                <>
                    <h4 className="text-center">Children</h4>
                    {children}
                    <br></br>
                    <div className="d-flex justify-content-center">
                    <AddChildComponent selected_member={this.props.selected_member} postMember={this.props.postMember}  />
                    </div>
                </>
            )
        }

    }
}

export default Children;