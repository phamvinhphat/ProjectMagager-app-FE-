import './Employee.css';
import React, {Component, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useRows} from "../../src/Data";
import {Link} from "react-router-dom";

export default function DataTable() {
    const [data, setData] = useState(useRows);
    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));


    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        {
            field: 'username',
            headerName: 'username',
            width: 150,
            renderCell: (params) => {
                return ( <
                    div className = "UserList" >
                    <
                    img className = "UserListImg"
                    src = { params.row.Avatar }
                    alt = "" /> { params.row.username } <
                    /div>
                )
            }
        },
        { field: 'Email', headerName: 'Email', width: 150 },
        {
            field: 'status',
            headerName: 'status',
            width: 120,
        },
        {
            field: 'Department',
            headerName: 'Department',
            width: 180,
        },
        {
            field: 'Group',
            headerName: 'Group',
            width: 160,
        },
        {
            field: 'Task',
            headerName: 'Task',
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return ( <
                    >
                    <
                    Link to = { "/User/" + params.row.id } >
                    <
                    button className = "UserListEdit" > Edit < /button> <
                    /Link>

                    <
                    DeleteForeverIcon className = "UserListDelete"
                    onClick = {
                        () => handleDelete(params.row.id) }
                    /> <
                    />
                )
            }

        }
    ];

    const rows = [{
            id: 1,
            username: 'Đô Lâm ',
            Avatar: "https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
            Email: "dolam@gmail.com",
            status: "active",
            Department: "Phòng FontEnd",
            Group: "null",
            Task: "null.",
        },
        {
            id: 2,
            username: 'Tuấn Thành ',
            Avatar: "https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
            Email: "dolam@gmail.com",
            status: "active",
            Department: "Phòng phân tích thiết kế",
            Group: "null",
            Task: "null.",
        },
        {
            id: 3,
            username: 'Vĩnh Phát',
            Avatar: "https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
            Email: "dolam@gmail.com",
            status: "active",
            Department: "Phòng BackEnd",
            Group: "null",
            Task: "null.",
        },
        {
            id: 4,
            username: 'Đại Phạm',
            Avatar: "https://image.freepik.com/free-vector/man-avatar-profile-round-icon_24640-14046.jpg",
            Email: "dolam@gmail.com",
            status: "active",
            Department: "Phòng BackEnd",
            Group: "null",
            Task: "null.",
        },
    ];

    return ( <
        div className = "userListt"
        style = {
            { height: 400, width: '100%' } } >
        <
        DataGrid rows = { data }
        disableSelectionOnClick columns = { columns }
        pageSize = { 5 }
        checkboxSelection />
        <
        /div>
    );
}
export class Employee extends Component {
    render() {
        return ( <
            div classname = "Employee" >
            <
            DataTable />
            <
            /div>
        )
    }
}