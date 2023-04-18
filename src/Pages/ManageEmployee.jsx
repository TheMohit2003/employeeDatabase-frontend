import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, getAllEmployee } from '../services/api'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ManageEmployee = () => {

    toast.configure();

    const navigate = useNavigate();

    const [state, setState] = useState({
        isLoading: false,
        data: []
    })

    const fetchAllEmployees = async () => {
        setState({ ...state, isLoading: true })
        const res = await getAllEmployee();
        setState({ ...state, isLoading: false, data: res.data })
    }

    useEffect(() => {
        fetchAllEmployees();
    }, [])


    const deleteEm = async (id) => {

        const res = await deleteEmployee(id);

        console.log(res);

        if (res.status === 200) {
            toast.success('Employee Deleted', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            window.location.reload()


        } else {
            toast.error(`Error : ${res.data.message} `, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }

    let { isLoading, data } = state;

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Manage Employee</h4>
                            <p className="card-description">
                            </p>

                            <div className="row">
                                <div className="col-12">
                                    <div className="table-responsive">
                                        <table id="example" className="display table expandable-table" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>NO</th>
                                                    <th>Name</th>
                                                    <th>Age</th>
                                                    <th>Department</th>
                                                    <th>Status</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ paddingTop: "30px" }} >

                                                {
                                                    isLoading === false
                                                        ? data?.map((ele, i) => {

                                                            return (
                                                                <tr key={ele._id} >
                                                                    <td>{i + 1}</td>
                                                                    <td>{ele.name}</td>
                                                                    <td>{ele.age}</td>
                                                                    <td>{ele.department}</td>
                                                                    <td>{ele.status === 1 ? "Remote" : ele.status === 2 ? "Contract" : "FullTime"}</td>
                                                                    <td>
                                                                        <td>
                                                                            <a href={`/edit?id=${ele._id}`} style={{ fontSize: "20px", cursor: "pointer", color: "green" }} className="fa-solid fa-pen-to-square"></a>
                                                                            <i className="fa-solid fa-trash" onClick={() => { deleteEm(ele._id) }} style={{ fontSize: "18px", cursor: "pointer", color: "red", marginLeft: "10px" }} ></i>
                                                                        </td>
                                                                    </td>
                                                                </tr>
                                                            )

                                                        })
                                                        : "Loading"
                                                }



                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <Link to="/create"><button className='btn btn-primary'>Create Employee data</button></Link>
            </div>
        </div>
    )
}

export default ManageEmployee