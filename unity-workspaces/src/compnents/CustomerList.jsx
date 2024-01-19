import { useEffect, useState, useRef } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
const selectedCustomer = [];

function CustomerList({ customerData, fetchCustomers }) {
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const customerDelete = useRef(null);

  //fetch customers

  const handleCustomerSelect = (e) => {
    e.preventDefault();
    if (selectedCustomer.length <= 0) {
      selectedCustomer.push(e.currentTarget.value);
      customerDelete.current.classList.remove("hidden");
    } else if (selectedCustomer.length > 0) {
      selectedCustomer.pop();
      selectedCustomer.push(e.currentTarget.value);
    }
  };

  const handleCustomerDelete = async () => {
    const customerDeleteData = {
      customerDeleteUserId: token,
      deleteCustomerId: selectedCustomer[0],
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/users?customerDelete=true`,
        customerDeleteData
      );
      fetchCustomers();
      setDeleteSuccess(<p className="success delete-success">{res.data}</p>);
      selectedCustomer.pop();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCustomerDeleteBtn = (e) => {
    e.preventDefault();
    handleCustomerDelete();
  };

  return (
    <>
      <div className="customer-list-cont">
        <div className="customer-list-top">
          <p id="customer-name-title">Name</p>
          <p id="customer-address-title">Address</p>
          <p id="customer-contact-title">Contact</p>
          <i
            className="fa-solid fa-trash customer-delete hidden"
            ref={customerDelete}
            onClick={handleCustomerDeleteBtn}
          ></i>
        </div>
        <div className="customer-list">
          {customerData &&
            customerData?.map((user) =>
              user.customers.map((customer) => (
                <button
                  className="customer-row"
                  key={customer._id}
                  value={customer._id}
                  onClick={handleCustomerSelect}
                >
                  <p className="customer-row-name">
                    {customer.customerFirst} {customer.customerLast}
                  </p>
                  <p className="customer-row-address">
                    {`${customer.customerAddress}, ${customer.customerCity}, ${customer.customerState} ${customer.customerZip}`}
                  </p>
                  <div className="customer-row-contact">
                    {`${customer.customerPhone}`}
                    <p className="row-email">{customer.customerEmail}</p>
                  </div>
                </button>
              ))
            )}
        </div>
      </div>
    </>
  );
}
export default CustomerList;
