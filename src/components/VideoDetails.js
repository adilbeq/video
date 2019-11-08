import React, { useState, useEffect } from 'react';
import useGlobal from '../store';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect, Link } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './StoreDetails.css';
import './InputStyle.css';

import { setTimeout } from 'timers';

const VideoDetails = (props) => {
    const [globalState, globalActions] = useGlobal();
	const [state, setState] = useState({
		data: {
            videoName: null,
            ip: null,
            city: null,
            startTime: null,
            endTime: null,
            id: null,
            storesAll: []
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
        if(e.target.id == "videoName") {
            aState.videoName = e.target.value;
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
        // globalActions.deleteStore({
        //     "id": state.data.id
        // });
        createNotification('edited');
        setTimeout(() => {
            props.history.push('/');
        }, 1000);
    }

    const editStore = () => {
        console.log(state.data.videoName + " changing new name");

        // globalActions.editStore({
        //     id: state.data.id,
		// 	ip: state.data.ip,
		// 	videoName: state.data.videoName,
		// 	city: state.data.city, 
		// 	startTime: state.data.startTime,
		// 	endTime: state.data.endTime
        // });

        createNotification('success');
    }

    const chooseStore = (id) => {
        let aState = state.data;
        let tempArray = aState.storesAll;
        for(let i = 0; i < tempArray.length; i++) {
            if(tempArray[i].id == id) {
                if(!tempArray[i].active) {
                    tempArray[i].active = true;
                }
                else {
                    tempArray[i].active = false;
                }
            }
        }
        
        setState({
            data: aState
        });
    }

    useEffect(() => {
        console.log("video details");
        globalActions.getStoreItems();
        // var temp = globalState.videos;
        
        setTimeout(() => {
            let aState = state.data;
            console.log("id: " + props.match.params.id);
            globalActions.getInfoById(props.match.params.id); // globalState.infoID

            let temp1 = globalState.infoID;
            console.log(globalState.infoID);
            temp1.forEach(function(element) {
                aState.videoName = element.name;
                console.log(element.videosToStand);

                element.videosToStand.forEach(function(el){
                    console.log(el.stand.id);
                    aState.storesAll = globalState.stores;
                    for(let j = 0; j < aState.storesAll.length; j++) {
                        // console.log(aState.storesAll[j].storeName + " " + aState.storesAll[j].id);
                        
                        if(aState.storesAll[j].id === el.stand.id) {
                            console.log("TAPTII");
                            aState.storesAll[j].active = true;
                            console.log(aState.storesAll[j].active);
                        }
                        else {
                            if(!aState.storesAll[j].active) {
                                aState.storesAll[j].active = false;
                            }
                        }
                    }
                });
            });

        
            console.log(aState.storesAll);
            setState({
                data: aState
            });
        }, 900);  
        
		return () => {
		};
	}, [globalState.infoID]);
    
    return (
		<React.Fragment>
			<div>
                <div className="content_wrapper">
                    <div className="list_names">
                        <span style={{marginLeft: "10px"}}>Видео "{state.data.videoName}"</span>
                        
                        <div className="list_items">
                            <div className="one_itemV ">
                                <div className="wrapper__store left">
                                    <div className="wrapper__store_title">
                                        Загруженное видео
                                        <span className="againUpload">Загрузить</span>
                                    </div>
                                    <div className="video__box" style={{display: "flex", justifyItems: "center", alignItems:"center", justifyContent:"center"}}>

                                    </div>

                                    <div className="wrapper__store_data" style={{width:"91%"}}>
                                        <div className="label_wrapper"> 
                                            <p className="label">Название</p>
                                            <TextField
                                                className="inputEdit"
                                                margin="dense"
                                                id="videoName"
                                                fullWidth
                                                placeholder={state.data.videoName}
                                                onChange={saveResults}
                                            />
                                        </div>
                                    </div>
                                    <div className="wrapper__store_title">Период</div>
                                    <div className="times2">
                                        <div className="label_wrapper">
                                            <p className="label">Время начала</p>
                                            <TextField
                                                className="inputEditTime"
                                                margin="dense"
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
                                                value={state.data.endTime}
                                                onChange={saveResults}
                                            />
                                        </div>
                                    </div>
                                    <div className="edit_buttonsV">
                                        <div>
                                            <Button onClick={editStore} variant="contained" style={{fontSize: "13px", background: "black", color: "white", fontWeight: "bold", borderRadius: "0", width: "110px", height: "40px"}}>
                                                Сохранить
                                            </Button>
                                        </div>
                                        <div>
                                            <Button onClick={deleteStore} className="delete" variant="" style={{ fontSize: "13px", textTransform: "none", background: "transparent", color: "#ff7212", fontWeight: "bold", borderRadius: "0", width: "150px", height: "40px"}}>
                                                Удалить видео
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="onlyArrow">
                                    <svg className="icon" style={{marginBottom: "190px"}}>
                                        <path d="M-0.000,10.000 L19.667,10.000 L19.667,-0.000 L40.000,20.000 L19.667,40.000 L19.667,30.000 L-0.000,30.000 L-0.000,10.000 L-0.000,10.000 Z" fill="#dee6e7" />
                                    </svg>
                                </div>

                                <div className="rightStores moreSpace">
                                    <div className="wrapper__store_title">
                                        Магазины
                                    </div>
                                    
                                    <div className="selectStore">
                                        {state.data.storesAll.map((item, index) => (  // state.data.storesAll
                                            <div className="oneStoreInRight">
                                                <div onClick={() => chooseStore(item.id)} style={{ cursor: "pointer"}} className="input_wrapper">
                                                    <div 
                                                        className={"customInput " + (item.active === true ? 'activeInput' : '')}
                                                        ></div>
                                                </div>
                                                <div className="storeNameInput">{item.storeName}</div>
                                                <div className="rightIcons">

                                                </div>
                                            </div>
                                        ))}
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

export default VideoDetails;