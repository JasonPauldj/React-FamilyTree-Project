import React, { Component } from 'react';
import SelectedMember from './SelectedMember';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMembers, selectMember, postMember } from '../redux/ActionCreators';

const mapStatetoProps = state => {
    return {
        members: state.members,
        selected_member: state.selectMember,
        parents: state.parents
    };
}

const mapDispatchtoProps = (dispatch) => ({
    fetchMembers: () => dispatch(fetchMembers()),
    selectMember: (member) => dispatch(selectMember(member)),
    postMember: (member, membertype) => dispatch(postMember(member, membertype))
})

class Member extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("mounted MDC");
        // this.props.fetchMembers(); 

    }



    render() {
        console.log("in MDC component" + JSON.stringify(this.props.sel_mem));
        /*  if (this.props.members.isLoading) {
             
              return (
                  <>
                 {/* <Header /> }
                  <Loading />
                  </>
              )
              
          }
          else { */
        if (this.props.sel_mem == null) {
           // this.props.selectMember(this.props.members.members[0]);
            return (
                <>
                    
                    <h4 className="text-center text-danger p-3" >Family member could not be found.</h4>
                </>
            )
        }

        else if (this.props.sel_mem != null) {
            var sel_mem = this.props.sel_mem;
            var parents = [];
            var children = [];
            var siblings = [];
            var partner = [];
            if (sel_mem.fatherid != null) {
                parents.push(this.props.members.members[sel_mem.fatherid]);
            }
            if (sel_mem.motherid != null) {
                parents.push(this.props.members.members[sel_mem.motherid]);
            }

            if (sel_mem.fatherid != null)
                siblings = this.props.members.members.filter((member) => (member.fatherid === sel_mem.fatherid && member.id != sel_mem.id));

            if (sel_mem.gender == 'M')
                children = this.props.members.members.filter((member) => member.fatherid === sel_mem.id);
            else
                children = this.props.members.members.filter((member) => member.motherid === sel_mem.id);

            partner = this.props.members.members.filter((member) => member.partnerid === sel_mem.id);

            return (
                <>
                    <SelectedMember selected_member={this.props.sel_mem} partner={partner}
                        parents={parents} children={children} siblings={siblings} selectMember={this.props.selectMember} postMember={this.props.postMember} />
                </>
            )
        }

        else {
            return (
                <div>Family member could not be found.</div>
            )
        }
    }

    /* return (
          <>

              <Header />
            <SelectedMember  selected_member={this.props.sel_mem} 
              fetchParents={this.props.fetchParents} parents ={this.props.parents}  />
          

          </>
     );*/
}


//export default Member;
export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Member));