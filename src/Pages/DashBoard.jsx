import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import '../App.css';
ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
  const [sampledata, setSampleData] = useState([]);

  const fetchData = async () => {
    fetch('https://employeedataupdate.up.railway.app/')
      .then((response) => response.json())
      .then((data) => setSampleData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getEmployeeCountsByDepartment = () => {
    const departments = [
      'tech(frontend)',
      'finance',
      'manufacturing',
      'marketing',
    ];
    const counts = [0, 0, 0, 0];
    sampledata.forEach((employee) => {
      const departmentIndex = departments.indexOf(employee.department);
      if (departmentIndex >= 0) {
        counts[departmentIndex]++;
      }
    });
    return counts;
  };

  const getEmployeeCountsByStatus = () => {
    const statuses = ['Contract', 'Remote', 'Full-time'];
    const counts = [0, 0, 0];
    sampledata.forEach((employee) => {
      const statusIndex = statuses.indexOf(employee.status);
      if (statusIndex >= 0) {
        counts[statusIndex]++;
      }
    });
    return counts;
  };

  const data1 = {
    labels: ['tech(frontend)', 'finance', 'manufacturing', 'marketing'],
    datasets: [
      {
        label: 'Number of employees by department',
        data: getEmployeeCountsByDepartment(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const data3 = {
    labels: sampledata.length > 0 ? sampledata.map((d) => d.department) : [],
    datasets: [
      {
        label: 'Age distribution of employees by department',
        data: sampledata.map((d) => d.age),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 0, 0, 0.8)',
          'rgba(0, 255, 0, 0.8)',
          'rgba(0, 0, 255, 0.8)',
          'rgba(255, 192, 203, 0.8)',
        ],
        backgroundColor: ['#ffcc5c', '#28a745', '#007bff', '#dc3545'],
        borderWidth: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Employee Data',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className='box'>
      <div className='graph-box'>
      <h3>Employee data department wise </h3>
        <Pie data={data1} options={options} />
      </div>
      <div className='graph-box'>
      <h3>Employee data age wise </h3>
        <Doughnut data={data3} options={options} />
      </div>
    </div>
  );
}
