import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './Header';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMembers, selectMember, postMember } from '../redux/ActionCreators';
import MemberDetailsComponent from './MemberDetailsComponent';

const mapStatetoProps = state => {
    return {
        members: state.members,
    };
}

const mapDispatchtoProps = (dispatch) => ({
    fetchMembers: () => dispatch(fetchMembers()),
    selectMember: (member) => dispatch(selectMember(member)),
    postMember : (member,membertype) => dispatch(postMember(member,membertype))
})



class Main extends Component {

    constructor(props) {
        super(props);
    }

   componentDidMount() {
        this.props.fetchMembers(); 
    }

   
    render() {

        const MemberComp = (props) => {
            return (
                <MemberDetailsComponent sel_mem={this.props.members.members.filter((mem) => mem.id === parseInt(props.match.params.memberid,10))[0]} />
            )
        }
        console.log("in main component" + JSON.stringify(this.props));
        return(
        <>
        <Header />
        <Switch>
        <Route exact path="/members" component={Home}/>
        <Route path="/members/:memberid" component={MemberComp} />
        <Redirect to="/members" component={Home} />
        </Switch>
        </>
        )
        /*if (this.props.members.isLoading) {
           
            return (
                <>
                <Header />
                <Loading />
                </>
            )
            
        }
        else {
            if(this.props.selected_member.selected_member == null)
            {
                this.props.selectMember(this.props.members.members[0]);
                return (
                    <>
                <Header />
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
        } */
    }
}



//export default Main;
export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(Main));