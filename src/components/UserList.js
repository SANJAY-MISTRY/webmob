import React, {useEffect, useState} from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper';


const UserList = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [resdata, setResdata] = useState('');
    // const classes = useStyles();
        useEffect(() => {
            const Ltoken = localStorage.getItem("accessToken");
            axios({
                method: 'get',
                url: 'http://68.183.48.101:3333/users/list',
                headers: {
                    'Authorization': `Bearer ${Ltoken}`
                },
            }).then(function (res) {
                setResdata(res.data.data.users)
                console.log("wwwwwwwwwwww",res.data.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        }, [resdata]);
        // const handleChangePage = (event, newPage) => {
        //     if(page<newPage && (documentState.list.length < (newPage+1)*5) && !(documentState.list.length == documentState.rows)){
        //         dispatch(documentActions.fetchDocumentsTobeApproved(newPage));
        //     }
        //     setPage(newPage);
        // };
    
        // const handleChangeRowsPerPage = (event) => {
        //     setRowsPerPage(+event.target.value);
        //     setPage(0);
        // };
    return (
        <div className="container">
        <h1 className="text-center">User List</h1>

        <div className="row">
        

        

{resdata && resdata.length > 0 ? (
    resdata.map((ele, index) => {
    return(
        
        
        <div key={index} class="card col-lg-3 col-sm-6 my-3 p-3" >
        <img class="card-img-top" src={ele.profile_pic} alt="Card image cap" />
        <div class="card-body">
            <h5 class="card-title">User Name: {ele.username}</h5>
            <p class="card-text">Email: {ele.email} </p>
        </div>
        </div>
    )
})
): <div><p style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}><CircularProgress /></p></div>}


            </div>
            {/* <div>
                <button onClick={minusPage}>minus</button>
                <button>Plus</button>
            </div> */}

        </div>
    );
}

export default UserList;