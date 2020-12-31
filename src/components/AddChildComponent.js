import React, {Component} from 'react';
import { Button,Modal,ModalHeader,ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';


class AddChild extends Component {
    
    constructor(props)
    {
        super(props);
        this.state ={
           id : null,
            name : '',
            dob : '',
            isDarivemula : true,
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
            isDarivemula : true,
            fatherid : (this.props.selected_member.gender === 'M') ? this.props.selected_member.id : this.props.selected_member.partnerid,
            motherid : (this.props.selected_member.gender ==='F') ? this.props.selected_member.id : this.props.selected_member.partnerid,
            partnerid : null,
            gender : this.state.gender  
        }
        this.toggleModal();
        this.props.postMember(newMember,"child");
        

    }

    render()
    {
      
        return(
            <>
            <Button color='primary' onClick={this.handleClick}>Add Child</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Add Child</ModalHeader>
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

export default AddChild;