import React, {Component} from 'react';
import { Button,Modal,ModalHeader,ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';


class AddPartner extends Component {
    
    constructor(props)
    {
        super(props);
        this.state ={
           id : null,
            name : '',
            dob : '',
            isDarivemula : false,
            fatherid : null,
            motherid : null,
            gender : ''   ,
          isModalOpen : false
        }

        this.handleClick = this.handleClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this)
    }

    handleClick()
    {
        this.setState({
            isModalOpen : true
        })
    }

    toggleModal()
    {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }

    handleChange(event)
    {
        var value = event.target.value;
        var stateprop = event.target.name;
        this.setState({
            [stateprop]:value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var newMember ={
            name : this.state.name,
            dob : this.state.dob,
            isDarivemula : false,
            fatherid : null,
            motherid :null,
            partnerid : this.props.selected_member.id,
            gender : this.state.gender  
        }

        
        
        
        this.toggleModal();
       
        this.props.postMember(newMember,'partner');
        //console.log('props is. . . ' + JSON.stringify(this.props));
        
       // var oldMember ={ ...this.props.selected_member, partnerid : this.props.partner[0].id}

       // this.props.updateMember(oldMember);
        
        /*if(this.props.children.length >0)
        {
            this.props.children.forEach((value,index,array)=>{
                var updateMember = {
                    "name": value.name,
                    "dob": value.dob,
                    "isDarivemula": true,
                    "fatherid": (this.props.selected_member.gender=='M') ? this.props.selected_member.id ? this.props.
                    "motherid": null,
                    "partnerid": null,
                    "gender": "F",
                    "id": 10
                }
            })
        }*/

    }

    render()
    {
       // console.log("inside render of add partners  " + JSON.stringify(this.props));
        return(
            <>
            <Button color='primary' onClick={this.handleClick}>Add Partner</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Add Partner</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input type="text" name="name" value={this.state.name} onChange={this.handleChange}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Gender</Label>
                            <Input type="select" name="gender" value={this.state.gender} onChange={this.handleChange}>
                                <option>M</option>
                                <option>F</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input type="date" name="dob" value={this.state.dob} onChange={this.handleChange}>
                                
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="success" >Add Family Member</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            
            </>
        )
    }

}

export default AddPartner;