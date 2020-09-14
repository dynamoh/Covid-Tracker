import React, { useState, useEffect } from 'react'
import './Notifications.css'
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';


function compare(a, b) {
    var x = new Date(a);
    var y = new Date(b);
    if (x > y) return 1;
    if (y > x) return -1;
  
    return 0;
}


function Notifications() {

    const [notifs, setNotifs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          axios.get("https://api.rootnet.in/covid19-in/notifications")
            .then((response) => {
                
                const data = response.data.data.notifications;
                const filtered_list = []
                data.map((notif) => {
                    const ln = notif.title.length;
                    const title = notif.title.substr(11,ln).trim();

                    if(notif.title.split(" ")[0].length === 10) {
                        filtered_list.push({
                            'date': notif.title.split(" ")[0].replaceAll('-','.'),
                            'link': notif.link,
                            'title': title
                        })
                    }

                })

                filtered_list.sort(compare);
                setNotifs(filtered_list);

            })
            .catch(error => {
                console.log(error);
            })
        };
    
        fetchData();
    }, []);

    return (
        <div >
            <h3 className="notif-head" > <i class="fas fa-bullhorn" style={{ marginRight: '15px' }} ></i> Notifications & Adviseries</h3>
            <div className="table">
                {notifs.map((notif) => {
                    return (
                        <tr>
                            <td className="notif-date" > { notif.date }
                            </td>
                            <td>
                                
                                <Tooltip title="click to view details" placement="right">
                                    <a className="notif-link" target="_blank" href={notif.link} >
                                        {notif.title}
                                    </a>
                                </Tooltip>
                            </td>
                            
                        </tr> 
                    )
                })}
            </div>
        </div>
    )
}

export default Notifications
