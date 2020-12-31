import React, { Component } from 'react';
import { Badge, Card, CardBody, CardText, CardTitle } from 'reactstrap';
import Parents from './ParentsComponent';
import Partner from './PartnersComponent';
import Siblings from './SiblingsComponent';
import Children from './ChildrenComponent';

class SelectedMember extends Component {

    constructor(props) {
        super(props);
    }

    render() {
      //  console.log("inside render of selected member " + JSON.stringify(this.props));
        if (this.props.selected_member.isDarivemula) {
            var color = 'primary';
            var text = 'Y'
        }
        else {
            var color = 'secondary';
            var text = 'N'
        }

        if (this.props.selected_member.gender == 'M') {
            var childFather = this.props.selected_member.id;
        }
        else {
            var childMother = this.props.selected_member.id;
        }



        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-4 offset-4 mt-1">
                            <Card >
                                <CardBody>
                                    <CardTitle>{this.props.selected_member.name} <Badge color={color}>{text}</Badge>  </CardTitle>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col -12 col-md-3">
                            <Partner selected_member={this.props.selected_member} children={this.props.children} partner={this.props.partner} selectMember={this.props.selectMember} postMember={this.props.postMember} />
                        </div>
                        <div className="col -12 col-md-3">
                            <Parents parents={this.props.parents} selectMember={this.props.selectMember} />
                        </div>
                        <div className="col -12 col-md-3">
                            <Siblings siblings={this.props.siblings} selectMember={this.props.selectMember} />
                        </div>
                        <div className="col -12 col-md-3">
                            <Children selected_member={this.props.selected_member} children={this.props.children} selectMember={this.props.selectMember} postMember={this.props.postMember} />
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default SelectedMember;