import NewCustomerForm from "./NewCustomerForm";
import CustomerList from "./CustomerList";
import { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

function Customers({ selectedTitle }) {
  const [newCustomerVisible, setNewCustomerVisible] = useState(false);
  const [customerData, setCustomerData] = useState("");
  const [searchbarUsed, setSearchbarUsed] = useState(false);
  const [searchbarQuery, setSearchbarQuery] = useState("");
  const [res, setRes] = useState("");

  //handle res

  function success(childData) {
    setRes(<p className="success">{childData}</p>);
    setTimeout(() => {
      setRes("");
    }, 1500);
  }

  function submitted(status) {
    setNewCustomerVisible(status);
  }

  //new customer btn

  const handleNewCustomer = () => {
    setNewCustomerVisible(true);
  };

  //back btn

  const handleBack = () => {
    setNewCustomerVisible(false);
  };

  //fetch customers initally

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9000/users?customers=${selectedTitle}&token=${token}`
      );
      setCustomerData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="dash-content-wrapper customers">
        <div className="customer-top-container">
          <button
            className="add-new-customer"
            id="add-customer"
            onClick={handleNewCustomer}
          >
            New Customer
          </button>
          {res}
        </div>
        <div className="customer-content">
          {newCustomerVisible == true && (
            <button
              className="btn-style"
              id="back-customer"
              onClick={handleBack}
            >
              Back
            </button>
          )}

          {newCustomerVisible == true && (
            <NewCustomerForm
              success={success}
              submitted={submitted}
              fetchCustomers={fetchCustomers}
            />
          )}
          {newCustomerVisible == false && (
            <CustomerList
              selectedTitle={selectedTitle}
              success={success}
              customerData={customerData}
              fetchCustomers={fetchCustomers}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Customers;
