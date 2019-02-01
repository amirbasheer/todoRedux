import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../redux/todo/action';
import TodoReducer from '../redux/todo/reducer';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const { fetchData,addData,deleteData,updateData,editData } = actions;

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            task:'',
            id:'',
            value:''
        };
        this.addTask = this.addTask.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    async openModal(v,i) {
       await this.setState({modalIsOpen: true,task: v,id:i});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentWillMount() {
        this.props.fetchData();
    }

    // componentDidMount(){
    //     setTimeout(res=>{
    //         this.props.fetchData();
    //     },1000)
    // }

    updateStatus = (id,status) => {
        this.props.updateData(id,status);
    }
    updateTask = (id,value) => {
        this.props.editData(id,value);
        this.closeModal();
    }
    deleteTask = (id ) => {
        this.props.deleteData(id);
    }
    addTask(){
        if(this.state.value !== '' ){
            var status = '0';
            this.props.addData(this.state.value,status);
        }
        else {
            alert("Plz add Task");
        }
        this.setState({value:''});
    }
    onTextChange = async (e) => {
        await this.setState({value:e.target.value});

    }
        render() {
        const { TodoResult } = this.props;
        const { result } = TodoResult;
        const data = result.map((val,id) => {
           return <tr>
               { val.status == '0' ?
                   <td><i className="fa fa-check text-secondary" aria-hidden="true" onClick= {() => this.updateStatus(val.id,val.status)}></i></td>:
                   <td><i className="fa fa-check-square-o text-success" aria-hidden="true" onClick= {() => this.updateStatus(val.id,val.status)}></i></td>
               }

               <td> <i onClick= {() => this.openModal(val.task,val.id)}>{val.status == '0' ? <p>{val.task}</p> : <strike>{val.task}</strike>}</i></td>
               <td><i style={{color:'red'}} className="fa fa-times-circle-o" aria-hidden="true" onClick= {() => this.deleteTask(val.id)}></i></td>
           </tr>
        })
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>TODO LIST</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" style={{ marginTop: '15px'}}>
                            <input type='text' placeholder='Add Task' value={this.state.value} onChange={(e) => this.onTextChange(e)}  />
                            <button style={{ padding: '3px 8px', marginBottom: '6px', marginLeft: '10px'}} className="btn btn-success" onClick={this.addTask}>Add Task</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <table className="table text-center">
                                    <tr>
                                        <th></th>
                                        <th>Tasks</th>
                                        <th></th>
                                    </tr>
                                {data}
                            </table>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                       <i style={{float: 'right', marginTop: '-12px',color:'red'}} className="fa fa-times-circle-o" aria-hidden="true" onClick={this.closeModal}></i>
                        <h4>Update Task</h4>
                            <input type="text" value={this.state.task} onChange ={(e) => this.setState({task:e.target.value})}/>
                            <button style={{ padding: '3px 8px', marginLeft: '10px'}} className="btn btn-success" onClick= {() => this.updateTask(this.state.id,this.state.task)}>Update</button>
                    </Modal>

                </div>
        )
    }
}
function mapStateToProps(state) {
    return { TodoResult: state.TodoReducer,}
}
export default connect(
    mapStateToProps,
    { fetchData,addData,deleteData,updateData,editData}
)(Todo);