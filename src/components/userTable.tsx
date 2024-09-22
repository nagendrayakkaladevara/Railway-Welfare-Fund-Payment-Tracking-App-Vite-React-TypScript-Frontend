import { Table, Tag } from "antd";
import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import Loader from "./loader";
import Search from "antd/es/input/Search";



const UserTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>(''); // State for search input


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await UserService.getTotalData();
        const formattedData = result.map(user => ({
          key: user._id,
          name: user.name,
          email: user.email || 'N/A',
          department: user.department || 'N/A',
          yearOfJoining: user.yearOfJoining || 'N/A',
          paymentHistory: user.paymentHistory,
        }));
        setDataSource(formattedData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredDataSource = dataSource.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.department.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Year of Joining',
      dataIndex: 'yearOfJoining',
      key: 'yearOfJoining',
    },
    {
      title: 'Payment History',
      children: [
        {
          title: 'Year of Payment',
          dataIndex: 'paymentHistory',
          key: 'yearOfPayment',
          render: (paymentHistory: any) => (
            <div>
              {paymentHistory.map((payment: any) => (
                <div key={payment.yearOfPayment}>
                  <strong>{payment.yearOfPayment}</strong>
                  <br />
                  <span style={{fontSize:'12px'}}>Status: <Tag color={(payment.status === 'paid' ? "green" : 'red')}>
                    {payment.status.toUpperCase()}
                  </Tag> - <span className="pi pi-indian-rupee" style={{ fontSize: '10px' }}></span> {payment.amount}</span>
                </div>
              ))}
            </div>
          ),
        },
      ],
    },
  ];

  console.log(error);


  return (
    <>
      <div className="flex justify-content-center m-5">
        <Search
          placeholder="Search by Name, Email, or Department"
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
          enterButton
        />
      </div>

      {loading ? (<>
        <Loader isLoading={loading} />
      </>) : (<>
        <Table dataSource={filteredDataSource} columns={columns} pagination={false} />
      </>)}
    </>
  )
}
export default UserTable;