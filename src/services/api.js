import axios from "axios";

const URL = "https://employeedataupdate.up.railway.app";

export const createEmployee = async (data) => {
    const res = await axios.post(`${URL}`, data);
    return res;
};

export const getAllEmployee = async () => {
    const res = await axios.get(`${URL}`);
    return res;
};

export const getOneEmployee = async (id) => {
    const res = await axios.put(`${URL}/${id}`);

    return res;
};

export const updateEmployee = async (id, data) => {
    const res = await axios.put(`${URL}/${id}`, data);
    return res;
};

export const deleteEmployee = async (id) => {
    const res = await axios.delete(`${URL}/${id}`);
    return res;
};
