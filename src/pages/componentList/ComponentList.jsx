import React, { useState } from "react";
import apiService from "../../services/ApiService";
import { toast } from "react-toastify";
import Pagination from '@material-ui/lab/Pagination';

import "./componentList.css";
import { DeleteOutlineOutlined, EditOutlined } from "@material-ui/icons";
const ComponentList = (props) => {
  const [components, setComponents] = useState([]);
  const page = props.match.params.page ? props.match.params.page : 1;
  const [total, setTotal] = React.useState(0);
  const [perPage, setPerPage] = React.useState(10);

  const getData = () => {
    apiService.getComponents(page, perPage).then((data) => {
      setComponents(data.data.components);
      setTotal(data.data.total);

    });
  };
  React.useEffect(getData, [page, perPage]);

  const handleadd = () => {
    window.location.href = "/newcomponent";
  };


  return (
    <>
      <div className="componentList">
        <button className="btn-add" onClick={handleadd}>
          Create
        </button>
        <p className='usersText'>Components List</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Component Id</th>
              <th>Component Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {components.map((c, index) => (
              <tr key={index}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <td>
                  <EditOutlined
                    className='ActionIconEdit'
                    onClick={(e) => {
                      console.log("navigate to update");
                      props.history.push("/component/" + c._id);
                    }}
                  >
                    Edit
                  </EditOutlined>
                  <DeleteOutlineOutlined
                    className='ActionIconDelete'
                    onClick={(e) => {
                      apiService
                        .deleteComponent("/api/components/" + c._id)
                        .then((data) => {
                          
                          toast.success("Component Deleted Successfully");
                          console.log(data);
                          console.log(getData());
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    Delete
                  </DeleteOutlineOutlined>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(total / perPage)}
          className="pagination"
          variant='outlined'
          shape='circular'
          color="secondary"
           size="large"
          onChange={(e, value) => {
            console.log(value);
            props.history.push('/components/' + value);
          }}
        />{' '}
        <p className="paginationTextUserList">
        Showing <b>{(page - 1) * perPage}</b> -{' '}
        <b>{(page - 1) * perPage + components.length}</b> of <b>{total}</b> results
        </p>
      </div>
    </>
  );
};

export default ComponentList;
