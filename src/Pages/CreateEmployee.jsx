import React, { useEffect, useState } from 'react'
import { createEmployee } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEmployee = () => {

    toast.configure();

    const navigate = useNavigate();




    const callOnSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            age: e.target.age.value,
            address: e.target.address.value,
            department: e.target.department.value,
            status: e.target.status.value,
        }

        const res = await createEmployee(data);

        if (res.status === 200) {
            toast.success('Employee Created', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigate("/")


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


    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="row">

                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">

                            <div className="card-body">
                                <h4 className="card-title">Create Employee</h4>
                                <p className="card-description">
                                </p>
                                <form onSubmit={callOnSubmit} className="forms-sample">

                                    <div className="row g-3" style={{ marginTop: '30px' }}>

                                        <div className="col">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" name="name"
                                                id="name" required />
                                        </div>

                                        <div className="col">
                                            <label htmlFor="age">Age</label>
                                            <input type="text" className="form-control" name="age"
                                                id="age" required />
                                        </div>

                                    </div>

                                    <div className="row g-3" style={{ marginTop: '30px' }}>

                                        <div className="col">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className="form-control" name="address"
                                                id="address" required />
                                        </div>

                                    </div>


                                    <div className="row g-3" style={{ marginTop: '30px' }}>

                                        <div className="col">
                                            <label htmlFor="department">Department</label>
                                            <input type="text" className="form-control" name="department"
                                                id="department" required />
                                        </div>

                                        <div className="col">
                                            <label htmlFor="status">Status</label>
                                            <select name="status" id="status" className='form-control' >
                                                <option value="1">Remote</option>
                                                <option value="2">Contract</option>
                                                <option value="3">Full Time</option>
                                            </select>
                                        </div>

                                    </div>





                                    <div className="col-12" style={{ marginTop: '50px' }}>
                                        <button type="submit" name="submit"
                                            className="btn btn-warning">Create</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployee;