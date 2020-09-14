import React, { useEffect, useState } from 'react'
import './Helpline.css'
import axios from 'axios'

function Helpline() {

    const [helplines, setHelplines] = useState([]);

    useEffect(() => {

        axios.get('https://api.rootnet.in/covid19-in/contacts')
        .then(response => {
            setHelplines(response.data.data.contacts.regional);
        })

    }, [])

    return (
        <div className="helpline-container" >

            <div className="helpline-header">
                <h3 className="notif-head" > <i class="fas fa-phone-volume" style={{ marginRight: '15px;' }} ></i> Helpline numbers</h3>
                <div className="table" style={{ height: '550px' }} >
                    {helplines.map((helpline) => {

                        return (
                            <tr>
                                <td className="notif-date" > 
                                    {helpline.loc}
                                </td>
                                <td>
                                    {helpline.number}                               
                                </td>
                                
                            </tr> 
                        )

                    })}
                </div>
            </div>
            
        </div>
    )
}

export default Helpline
