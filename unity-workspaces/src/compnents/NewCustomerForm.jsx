import { useState, useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");

const stateContent = [
  {
    "name": "Please Select",
    "abbreviation": "...",
  },

  {
    "name": "Alabama",
    "abbreviation": "AL",
  },
  {
    "name": "Alaska",
    "abbreviation": "AK",
  },
  {
    "name": "American Samoa",
    "abbreviation": "AS",
  },
  {
    "name": "Arizona",
    "abbreviation": "AZ",
  },
  {
    "name": "Arkansas",
    "abbreviation": "AR",
  },
  {
    "name": "California",
    "abbreviation": "CA",
  },
  {
    "name": "Colorado",
    "abbreviation": "CO",
  },
  {
    "name": "Connecticut",
    "abbreviation": "CT",
  },
  {
    "name": "Delaware",
    "abbreviation": "DE",
  },
  {
    "name": "District Of Columbia",
    "abbreviation": "DC",
  },
  {
    "name": "Federated States Of Micronesia",
    "abbreviation": "FM",
  },
  {
    "name": "Florida",
    "abbreviation": "FL",
  },
  {
    "name": "Georgia",
    "abbreviation": "GA",
  },
  {
    "name": "Guam",
    "abbreviation": "GU",
  },
  {
    "name": "Hawaii",
    "abbreviation": "HI",
  },
  {
    "name": "Idaho",
    "abbreviation": "ID",
  },
  {
    "name": "Illinois",
    "abbreviation": "IL",
  },
  {
    "name": "Indiana",
    "abbreviation": "IN",
  },
  {
    "name": "Iowa",
    "abbreviation": "IA",
  },
  {
    "name": "Kansas",
    "abbreviation": "KS",
  },
  {
    "name": "Kentucky",
    "abbreviation": "KY",
  },
  {
    "name": "Louisiana",
    "abbreviation": "LA",
  },
  {
    "name": "Maine",
    "abbreviation": "ME",
  },
  {
    "name": "Marshall Islands",
    "abbreviation": "MH",
  },
  {
    "name": "Maryland",
    "abbreviation": "MD",
  },
  {
    "name": "Massachusetts",
    "abbreviation": "MA",
  },
  {
    "name": "Michigan",
    "abbreviation": "MI",
  },
  {
    "name": "Minnesota",
    "abbreviation": "MN",
  },
  {
    "name": "Mississippi",
    "abbreviation": "MS",
  },
  {
    "name": "Missouri",
    "abbreviation": "MO",
  },
  {
    "name": "Montana",
    "abbreviation": "MT",
  },
  {
    "name": "Nebraska",
    "abbreviation": "NE",
  },
  {
    "name": "Nevada",
    "abbreviation": "NV",
  },
  {
    "name": "New Hampshire",
    "abbreviation": "NH",
  },
  {
    "name": "New Jersey",
    "abbreviation": "NJ",
  },
  {
    "name": "New Mexico",
    "abbreviation": "NM",
  },
  {
    "name": "New York",
    "abbreviation": "NY",
  },
  {
    "name": "North Carolina",
    "abbreviation": "NC",
  },
  {
    "name": "North Dakota",
    "abbreviation": "ND",
  },
  {
    "name": "Northern Mariana Islands",
    "abbreviation": "MP",
  },
  {
    "name": "Ohio",
    "abbreviation": "OH",
  },
  {
    "name": "Oklahoma",
    "abbreviation": "OK",
  },
  {
    "name": "Oregon",
    "abbreviation": "OR",
  },
  {
    "name": "Palau",
    "abbreviation": "PW",
  },
  {
    "name": "Pennsylvania",
    "abbreviation": "PA",
  },
  {
    "name": "Puerto Rico",
    "abbreviation": "PR",
  },
  {
    "name": "Rhode Island",
    "abbreviation": "RI",
  },
  {
    "name": "South Carolina",
    "abbreviation": "SC",
  },
  {
    "name": "South Dakota",
    "abbreviation": "SD",
  },
  {
    "name": "Tennessee",
    "abbreviation": "TN",
  },
  {
    "name": "Texas",
    "abbreviation": "TX",
  },
  {
    "name": "Utah",
    "abbreviation": "UT",
  },
  {
    "name": "Vermont",
    "abbreviation": "VT",
  },
  {
    "name": "Virgin Islands",
    "abbreviation": "VI",
  },
  {
    "name": "Virginia",
    "abbreviation": "VA",
  },
  {
    "name": "Washington",
    "abbreviation": "WA",
  },
  {
    "name": "West Virginia",
    "abbreviation": "WV",
  },
  {
    "name": "Wisconsin",
    "abbreviation": "WI",
  },
  {
    "name": "Wyoming",
    "abbreviation": "WY",
  },
];

function NewCustomerForm({ success, submitted, fetchCustomers }) {
  const [cFirst, setCFirst] = useState("");
  const [cLast, setCLast] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cAddress, setCAddress] = useState("");
  const [cCity, setCCity] = useState("");
  const [cState, setCState] = useState("");
  const [cZip, setCZip] = useState("");

  const [res, setRes] = useState("");

  //submit customer

  const postNewCustomer = async () => {
    const customerData = {
      newCustomerUserId: token,
      cFirst: cFirst,
      cLast: cLast,
      cEmail: cEmail,
      cPhone: cPhone,
      cAddress: cAddress,
      cCity: cCity,
      cState: cState,
      cZip: cZip,
    };

    try {
      const res = await axios.put(
        `http://localhost:9000/users?newCustomer=newCustomer`,
        customerData
      );
      fetchCustomers();
      success(res.data);
      submitted(false);
    } catch (err) {
      console.log(err);
    }
  };

  //save customer button

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    postNewCustomer();
  };

  return (
    <>
      <form className="new-customer">
        <h2>create a new customer</h2>
        <label htmlFor="customer-f-name" className="new-customer-label">
          First Name
          <input
            type="text"
            id="customer-f-name"
            className="new-customer-input"
            placeholder="First"
            required
            onChange={(e) => {
              setCFirst(e.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="customer-l-name" className="new-customer-label">
          Last Name
          <input
            type="text"
            id="customer-l-name"
            className="new-customer-input"
            placeholder="Last"
            required
            onChange={(e) => {
              setCLast(e.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="customer-email" className="new-customer-label">
          Email
          <input
            type="email"
            id="customer-email"
            placeholder="Email"
            className="new-customer-input"
            required
            onChange={(e) => {
              setCEmail(e.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="customer-phone" className="new-customer-label">
          Phone
          <input
            type="tel"
            id="customer-phone"
            className="new-customer-input"
            placeholder="Phone"
            required
            maxlength="10"
            onChange={(e) => {
              setCPhone(e.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="customer-address-1" className="new-customer-label">
          Address
          <input
            type="text"
            id="customer-address-1"
            placeholder="Address"
            className="new-customer-input"
            required
            onChange={(e) => {
              setCAddress(e.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="customer-address-2" className="new-customer-label">
          City
          <input
            type="text"
            id="customer-address-2"
            className="new-customer-input"
            placeholder="City"
            required
            onChange={(e) => {
              setCCity(e.currentTarget.value);
            }}
          />
        </label>
        <label htmlFor="customer-state" className="new-customer-label">
          State
          <select
            type="text"
            id="state-dropdown"
            className="new-customer-input"
            required
            onChange={(e) => {
              setCState(e.currentTarget.value);
            }}
          >
            {stateContent.map((state) => (
              <option key={state.name} value={state.name}>
                {state.abbreviation}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="customer-zip" className="new-customer-label">
          Zip Code
          <input
            type="text"
            id="customer-zip-code"
            className="new-customer-input"
            placeholder="Zip Code"
            required
            maxlength="5"
            onChange={(e) => {
              setCZip(e.currentTarget.value);
            }}
          />
        </label>
        <div className="new-customer-btn-cont">
          <button
            className="btn-style"
            id="save-customer"
            onClick={handleSaveCustomer}
          >
            Save Customer
          </button>
        </div>
      </form>
    </>
  );
}
export default NewCustomerForm;
