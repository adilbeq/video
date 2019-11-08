import React, { useState, useEffect } from 'react';
import useGlobal from '../store';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect, Link } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './StoreDetails.css';

import { setTimeout } from 'timers';

const StoreDetails = (props) => {
    const [globalState, globalActions] = useGlobal();
	const [state, setState] = useState({
		data: {
            storeName: null,
            ip: null,
            city: null,
            startTime: null,
            endTime: null,
            id: null
        }
	});
    
    const createNotification = (type) => {
        
        switch (type) {
            case 'info':
                NotificationManager.info('Info message');
                break;
            case 'success':
                NotificationManager.success('Магазин успешно удален!', 'Удалено', 900);
                break;
            case 'edited':
                NotificationManager.success('Магазин успешно обновлен!', 'Обновлено', 900);
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
                });
                break;
        }
       
    };

    const saveResults = (e) => {
        let aState = state.data;
   
        console.log("city came " + e.target.value);

        if(e.target.id == "city") {
            aState.city = e.target.value;
        }
        if(e.target.id == "ip") {
            aState.ip = e.target.value;
        }
        if(e.target.id == "storeName") {
            aState.storeName = e.target.value;
        }
        if(e.target.id == "startTime") {
            aState.startTime = e.target.value;
        }
        if(e.target.id == "endTime") {
            aState.endTime = e.target.value;
        }
        
        setState({
            data: aState
        });
    }

    const deleteStore = () => {
        globalActions.deleteStore({
            "id": state.data.id
        });
        createNotification('edited');
        setTimeout(() => {
            props.history.push('/');
        }, 1000);
    }

    const editStore = () => {
        console.log(state.data.storeName + " changing new name");

        globalActions.editStore({
            id: state.data.id,
			ip: state.data.ip,
			storeName: state.data.storeName,
			city: state.data.city, 
			startTime: state.data.startTime,
			endTime: state.data.endTime
        });

        createNotification('success');
    }
    
    useEffect(() => {
        console.log("store details");
        var temp = globalState.stores;
        let aState = state.data;

        for(let i = 0; i < temp.length; i++) {
            if(temp[i].id == props.match.params.id){
                aState.storeName = temp[i].storeName;
                aState.ip = temp[i].ipAddress;
                aState.startTime = temp[i].updateStartTime;
                aState.endTime = temp[i].updateEndTime;
                aState.city = temp[i].city; 
                aState.id = temp[i].id; 
            }
        }
        console.log(aState.storeName);
        setState({
            data: aState
        });

		return () => {
		};
	}, []);
    
    return (
		<React.Fragment>
			<div>
                <div className="content_wrapper">
                    <div className="list_names">
                        <span style={{marginLeft: "10px"}}>Магазин {state.data.storeName}</span>
                        
                        <div className="list_items">
                            <div className="one_item">
                                <div className="wrapper__store">
                                    <div className="wrapper__store_title">Магазин</div>
                                    <div className="wrapper__store_data">
                                        <div className="label_wrapper"> 
                                            <p className="label">Название</p>
                                            <TextField
                                                className="inputEdit"
                                                margin="dense"
                                                id="storeName"
                                                fullWidth
                                                placeholder={state.data.storeName}
                                                onChange={saveResults}
                                            />
                                        </div>
                                        <div className="label_wrapper">
                                            <p className="label">IP адрес</p>
                                            <TextField
                                                className="inputEdit"
                                                margin="dense"
                                                id="ip"
                                                placeholder={state.data.ip}
                                                fullWidth
                                                onChange={saveResults}
                                            />
                                        </div>
                                    </div>
                                    <div className="wrapper__store_title">Период</div>
                                    <div className="times">
                                        <div className="label_wrapper">
                                            <p className="label">Время начала</p>
                                            <TextField
                                                className="inputEditTime"
                                                margin="dense"
                                                type="time"
                                                id="startTime"
                                                value={state.data.startTime}
                                                onChange={saveResults}
                                            />
                                        </div>
                                        <div className="label_wrapper">
                                            <p className="label">Время завершения</p>
                                            <TextField
                                                className="inputEditTime"
                                                margin="dense"
                                                id="endTime"
                                                type="time"
                                                value={state.data.endTime}
                                                onChange={saveResults}
                                            />
                                        </div>
                                    </div>
                                    <div className="edit_buttons">
                                        <div>
                                            <Button onClick={editStore} variant="contained" style={{fontSize: "13px", background: "black", color: "white", fontWeight: "bold", borderRadius: "0", width: "110px", height: "40px"}}>
                                                Сохранить
                                            </Button>
                                        </div>
                                        <div>
                                            <Button onClick={deleteStore} className="delete" variant="" style={{ fontSize: "13px", textTransform: "none", background: "transparent", color: "#ff7212", fontWeight: "bold", borderRadius: "0", width: "150px", height: "40px"}}>
                                                Удалить магазин
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                       
                    </div>
                </div>
                <NotificationContainer/>
            </div>
		</React.Fragment>
	);
}

export default StoreDetails;