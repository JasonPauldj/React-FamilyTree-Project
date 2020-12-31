import React, { Component } from 'react';
import SelectedMember from './SelectedMember';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMembers, selectMember, postMember } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';

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

class Home extends Component {

    

    componentDidMount() {
        this.props.fetchMembers();

    }



    render() {
        console.log("in home component" + JSON.stringify(this.props));

        if (this.props.members.isLoading) {

            return (
                <>
                    {/* <Header /> */}
                    <Loading />
                </>
            )

        }
        else {
            var sel_mem = this.props.members.members[0];
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
                    <SelectedMember selected_member={sel_mem} partner={partner}
                        parents={parents} children={children} siblings={siblings} selectMember={this.props.selectMember} postMember={this.props.postMember} />
                </>
            )
        }
        /*
        else {
            if(this.props.selected_member.selected_member == null)
            {
                this.props.selectMember(this.props.members.members[0]);
                return (
                    <>
                <Loading />
                </>
                )
            }
           
          else  if( this.props.selected_member.selected_member !=null)
            {
                var sel_mem = this.props.selected_member.selected_member;
                var parents =[];
                var children=[];
                var siblings=[];
                var partner=[];
                if(sel_mem.fatherid != null)
                {
                    parents.push(this.props.members.members[sel_mem.fatherid]);
                }
                if(sel_mem.motherid != null)
                {
                    parents.push(this.props.members.members[sel_mem.motherid]);
                }
                
                if(sel_mem.fatherid!=null)
                siblings= this.props.members.members.filter((member) => (member.fatherid == sel_mem.fatherid && member.id != sel_mem.id));
                
                if(sel_mem.gender == 'M')
                children = this.props.members.members.filter((member)=> member.fatherid== sel_mem.id);
                else
                children = this.props.members.members.filter((member)=> member.motherid== sel_mem.id);

                partner = this.props.members.members.filter((member) => member.partnerid==sel_mem.id);

                return (
                    <>
                    <Header />
                    <SelectedMember selected_member={this.props.selected_member.selected_member} partner={partner}
                    parents ={parents} children={children} siblings={siblings} selectMember={this.props.selectMember} postMember={this.props.postMember}/>
                    </>
                )
            }

            else {
                return (
                    <div>Family member could not be found.</div>
                )
            }
        }*/

    }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Home));