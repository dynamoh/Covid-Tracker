import React, { useState, useEffect } from 'react'
import './Notifications.css'
import numeral from 'numeral'
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

function Notifications() {

    const [notifs, setNotifs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          axios.get("https://api.rootnet.in/covid19-in/notifications")
            .then((response) => {
                setNotifs(response.data.data.notifications.sort());
            })
            .catch(error => {
                console.log(error);
            })
        };
    
        fetchData();
    }, []);

    return (
        <div >
            <h3 className="notif-head" >Notifications & Adviseries</h3>
            <div className="table">
                {notifs.map((notif) => {
                    const ln = notif.title.length;
                    const title = notif.title.substr(11,ln).trim();

                    if(notif.title.split(" ")[0].length == 10) {
                        return (
                            <tr>
                                <td className="notif-date" > {
                                        notif.title.split(" ")[0].replaceAll('-','.')
                                    } 
                                </td>
                                <td>
                                   
                                    <Tooltip title="click to view details" placement="right">
                                        <a className="notif-link"  href={notif.link} >
                                            {title}
                                        </a>
                                    </Tooltip>
                                </td>
                                
                            </tr> 
                        )
                    }

                })}
            </div>
        </div>
    )
}

export default Notifications
