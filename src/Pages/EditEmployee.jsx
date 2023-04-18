import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllEmployee, getOneEmployee, getOneInterview, updateEmployee, updateInterview } from '../services/api';
import { Multiselect } from 'multiselect-react-dropdown';


const EditEmployee = () => {


    toast.configure();

    let [searchParams, setSearchParams] = useSearchParams();
    let id = searchParams.get("id");

    const [data, setData] = useState({
        isLoading: false,
        details: {}
    })


    const navigate = useNavigate();

    const getCurrentEmployee = async () => {
        setData({ ...data, isLoading: true })
        const res = await getOneEmployee(id);
        setData({ ...data, isLoading: false, details: res.data })
    }


    useEffect(() => {
        getCurrentEmployee()
    }, [])


    const callOnSubmit = async (e) => {

        e.preventDefault();

        const data = {
            name: e.target.name.value,
            age: e.target.age.value,
            address: e.target.address.value,
            department: e.target.department.value,
            status: e.target.status.value,
        }

        const res = await updateEmployee(id, data);

        if (res.status === 200) {
            toast.success('Employee Updated', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            navigate("/all")


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

    let { isLoading, details } = data;


    return (


        <>
            {

                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">

                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card">

                                    {
                                        isLoading == false
                                            ? (
                                                <div className="card-body">
                                                    <h4 className="card-title">Update Employee</h4>
                                                    <p className="card-description">
                                                    </p>
                                                    <form onSubmit={callOnSubmit} className="forms-sample">

                                                        <div className="row g-3" style={{ marginTop: '30px' }}>

                                                            <div className="col">
                                                                <label htmlFor="name">Name</label>
                                                                <input type="text" className="form-control" name="name"
                                                                    id="name" defaultValue={details?.name} required />
                                                            </div>

                                                            <div className="col">
                                                                <label htmlFor="age">Age</label>
                                                                <input type="text" className="form-control" name="age"
                                                                    id="age" defaultValue={details?.age} required />
                                                            </div>

                                                        </div>

                                                        <div className="row g-3" style={{ marginTop: '30px' }}>

                                                            <div className="col">
                                                                <label htmlFor="address">Address</label>
                                                                <input type="text" className="form-control" name="address"
                                                                    id="address" defaultValue={details?.address} required />
                                                            </div>

                                                        </div>


                                                        <div className="row g-3" style={{ marginTop: '30px' }}>

                                                            <div className="col">
                                                                <label htmlFor="department">Department</label>
                                                                <input type="text" className="form-control" name="department"
                                                                    id="department" defaultValue={details?.department} required />
                                                            </div>

                                                            <div className="col">
                                                                <label htmlFor="status">Status</label>
                                                                <select name="status" id="status" className='form-control' >

                                                                    {
                                                                        details?.status == 1
                                                                            ?
                                                                            <>
                                                                                <option selected value="1">Remote</option>
                                                                                <option value="2">Contract</option>
                                                                                <option value="3">Full Time</option>
                                                                            </>
                                                                            : details?.status == 2
                                                                                ?
                                                                                <>
                                                                                    <option value="1">Remote</option>
                                                                                    <option selected value="2">Contract</option>
                                                                                    <option value="3">Full Time</option>
                                                                                </> :
                                                                                <>
                                                                                    <option value="1">Remote</option>
                                                                                    <option value="2">Contract</option>
                                                                                    <option selected value="3">Full Time</option>
                                                                                </>
                                                                    }
                                                                </select>
                                                            </div>

                                                        </div>





                                                        <div className="col-12" style={{ marginTop: '50px' }}>
                                                            <button type="submit" name="submit"
                                                                className="btn btn-warning">Update</button>
                                                        </div>

                                                    </form>
                                                </div>
                                            )
                                            : "Loading"

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>

    )
}

export default EditEmployee