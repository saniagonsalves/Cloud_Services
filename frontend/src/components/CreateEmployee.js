import React, { Component } from 'react'
import ManagerServices from '../services/ManagerServices';

export default class CreateEmployee extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            emailId: '',
            firstName: '',
            lastName: '',
            id: this.props.match.params.id
        }
        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this);
        this.changeEmailId=this.changeEmailId.bind(this);
        this.saveEmployee=this.saveEmployee.bind(this);
        
    }
    componentDidMount(){
        if(this.state.id==-1)
        {
            return 
        }
        else
        {
        ManagerServices.getEmployeeById(this.state.id).then((res)=> {
            let employee=res.data;
            this.setState({first_name: employee.firstName,
                last_name: employee.lastName, 
            emailid: employee.emailId});
        
        } );}
    }

    changeFirstNameHandler=(event)=>{
        this.setState({firstName: event.target.value});
    }
    changeLastNameHandler=(event)=>{
        this.setState({lastName: event.target.value});
    }
    changeEmailId=(event)=> {
        this.setState({emailId: event.target.value});
    }

    saveEmployee=(e)=>{
        e.preventDefault();
        let employee={emailid: this.state.emailId, first_name: this.state.firstName, last_name: this.state.lastName};
        console.log('employee'+ JSON.stringify(employee));
    

            if(this.state.id==-1)
            {
                ManagerServices.createEmployee(employee).then(res => {
                    this.props.history.push('/hr'); 
                });

            }
            else
            {
                ManagerServices.updateEmployee(employee, this.state.id).then(res => {
                    this.props.history.push('/hr');
                });

            }

    }

    cancel(){
        this.props.history.push('/hr')
    }

    getTitle()
    {
        if(this.state.id==-1)
        {
            return <h3 className="text-center">Add Employee</h3>
        }else
        {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    
    render() {
        return (
            <div>
                <div className="container">
                <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                {
                    this.getTitle()
                }
                <div className="card-body">
                <form>
                    <div className="form-group">
                        <label>First Name</label>
                        <input placeholder="First Name" name="first_name" className="form-control"
                        value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input placeholder="First Name" name="last_name" className="form-control"
                        value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input placeholder="Email Address" name="emailid" className="form-control"
                        value={this.state.emailId} onChange={this.changeEmailId}/>
                    </div>
                    <button className="btn btn-success" onClick={this.saveEmployee}>Save</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}> Cancel</button>
                </form>
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}
