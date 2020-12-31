import React, { Component } from 'react';
import { Badge,Card, CardBody, CardTitle } from 'reactstrap';
import AddPartner from './AddPartnerComponent';
import {Link} from 'react-router-dom';

function RenderPartner(props) {
    if (props.partner.isDarivemula) {
        var color = 'primary';
        var text = 'Y'
    }
    else {
        var color = 'secondary';
        var text = 'N'
    }
    return (
        <Link to={`/members/${props.partner.id}`}>
        <Card onClick={() =>props.selectMember(props.partner)} >
            <CardBody >
                <CardTitle >{props.partner.name} </CardTitle>
            </CardBody>
        </Card>
        </Link>
    );
}

class Partner extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        //console.log("inside render of partners  " + JSON.stringify(this.props));

        if (this.props.partner.length == 0) {
            return (
                <>
                    <h4 className="text-center">Partner</h4>
                    <div className="text-danger text-center">No partners are added</div>
                    <br></br>
                    <div className="d-flex justify-content-center">
                    <AddPartner selected_member={this.props.selected_member} partner={this.props.partner} children={this.props.children} postMember={this.props.postMember} />
                    </div>
               </>
            )
        }
        else {
            var partners = this.props.partner.map((partner) => <RenderPartner key={partner.id} partner={partner} selectMember={this.props.selectMember}/>);
            return (
                <>
                    <h4 className="text-center">Partner</h4>
                     {partners} 
                     <br></br>
                     <div className="d-flex justify-content-center">
                    <AddPartner selected_member={this.props.selected_member} partner={this.props.partner} children={this.props.children} postMember={this.props.postMember}  />
                    </div>
                </>
            )
        }


    }
}

export default Partner;