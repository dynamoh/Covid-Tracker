import React from 'react'
import './Notifications.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function Notifications() {

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
      
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    return (
        <div >
            <h3 className="notif-head" >Notifications & Adviseries</h3>
            <TableContainer className="notifications-table" component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow className="notif-row-head" >
                        <TableCell align="left" className="notif-head" >Date</TableCell>
                        <TableCell align="left" className="notif-head" >Notification/Advisory </TableCell>
                        <TableCell align="right" className="notif-head" ></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="left">{row.carbs}</TableCell>
                            <TableCell align="left" className="notif-link" >view</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Notifications
