import React, { useState, useEffect } from 'react';
import useGlobal from '../store';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import plusBTN from './plus.svg';
import logo from './technoLogo.png';
import './Header.css';

const Header = (props) => {
    const [globalState, globalActions] = useGlobal();
	const [state, setState] = useState({
		data: {
            storesChoosen: true,
            videosChoosen: false,
            searchText: null,
            open: false,
            open2: false,
            addCity: null,
            addIpAddress: null,
            addStoreName: null,
            addTimeStart: null,
            addTimeEnd: null,    
            vids: null,

            startDate: null,
            endDate: null,
            ids: null,
            videoFile: null
		}
	});
    
    
    useEffect(() => {

		return () => {
		};
	}, []);

    const storesClicked = (event) => {
		let aState = state.data;

		aState.storesChoosen = true;
        globalActions.setStoresActive(true);
        aState.videosChoosen = false;
        globalActions.setVideosActive(false);

		setState({
			data: aState
        });

        setTimeout(() => {
            props.history.push('/');
        }, 100);
        
    }
    
    const videosClicked = (event) => {
		let aState = state.data;

        aState.storesChoosen = false;
        globalActions.setStoresActive(false);
        aState.videosChoosen = true;
        globalActions.setVideosActive(true);
        
		setState({
			data: aState
        });
        
        setTimeout(() => {
            props.history.push('/videos');
           // return <Redirect push to='/videos' />
        }, 100);

        //other
    }
    
    const addNewStore = () => {
        console.log("add new store clicked");
        let aState = state.data;
        aState.open = true;
        setState({
            data: aState
        });
    }

    const addNewVideo = () => {
        console.log("add new video clicked");
        let aState = state.data;
        aState.open2 = true;
        setState({
            data: aState
        });
    }
    
    const handleClose = () => {
        let aState = state.data;
        aState.open = false;
        setState({
            data: aState
        });
    }

    const setResults = (e) => {
        let aState = state.data;
        
        console.log("city came " + e.target.id);
        if(e.target.id == "city"){
            aState.addCity = e.target.value;
        }
        if(e.target.id == "ipAddress"){
            aState.addIpAddress = e.target.value;
        }
        if(e.target.id == "storeName"){
            aState.addStoreName = e.target.value;
        }
        if(e.target.id == "startTime"){
            aState.addTimeStart = e.target.value;
        }
        if(e.target.id == "endTime"){
            aState.addTimeEnd = e.target.value;
        }
        setState({
            data: aState
        });
    }

    const sendServerStore = () => {
        
        console.log(state.data.addCity);
        console.log(state.data.addIpAddress);
        globalActions.addNewStore({
            "city": state.data.addCity,
            "ip": state.data.addIpAddress,
            "name": state.data.addStoreName,
            "endTime": state.data.addTimeEnd,
            "startTime": state.data.addTimeStart
        });

        let aState = state.data;

        aState.storesChoosen = true;
        globalActions.setStoresActive(true);
        aState.videosChoosen = false;
        globalActions.setVideosActive(false);
        aState.searchText = null;
        aState.open = false;
        aState.addCity = null;
        aState.addIpAddress = null;
        aState.addStoreName = null;
        aState.addTimeStart = null;
        aState.addTimeEnd = null;

		setState({
            data: aState
        });

    }

    const sendServerVideo = () => {

    }

    const setResults2 = (e) => {
        let aState = state.data;
        const formData = new FormData();

        console.log(e.target.value);
        if(e.target.id == "endDate") {
            aState.endDate = e.target.value;
            formData.append('endDate', e.target.value);
            
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
        }
        if(e.target.id == "videoFile") {
            aState.videoFile = e.target.value;
            console.log("this is input of VIDEO" + e.target.files[0]);
            formData.append('file', e.target.files[0]);
            formData.append('ids', state.data.ids);
            formData.append('startDate', state.data.startDate);
            formData.append('endDate', state.data.endDate);
            formData.append('name', state.data.videoName);
            
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }
        }
        if(e.target.id == "ids") {
            aState.ids = e.target.value;
        }
        if(e.target.id == "startDate") {
            aState.startDate = e.target.value;
        }
        if(e.target.id == "videoName") {
            aState.videoName = e.target.value;
        }

        setState({
            data: aState
        });
    }

    

    return (
		<React.Fragment>
			<div className="header">
                <div className="header__row">
                    <div className={"header__videos_tg"  + (state.data.videosChoosen == true ? ' active' : '')} onClick={videosClicked}>
                        <svg className="icon" width="25px" height="18px" >
                            <path d="M9.545,12.588 L9.545,5.412 L15.818,9.000 L9.545,12.588 ZM23.498,3.155 C23.222,2.110 22.409,1.287 21.377,1.007 C19.505,0.500 12.000,0.500 12.000,0.500 C12.000,0.500 4.495,0.500 2.623,1.007 C1.591,1.287 0.777,2.110 0.501,3.155 C-0.000,5.048 -0.000,9.000 -0.000,9.000 C-0.000,9.000 -0.000,12.951 0.501,14.845 C0.777,15.890 1.591,16.713 2.623,16.992 C4.495,17.500 12.000,17.500 12.000,17.500 C12.000,17.500 19.505,17.500 21.377,16.992 C22.409,16.713 23.222,15.890 23.498,14.845 C24.000,12.951 24.000,9.000 24.000,9.000 C24.000,9.000 24.000,5.048 23.498,3.155 Z" fill="#dee6e7"/>
                        </svg>
                        <span style={{ paddingLeft: '10px' }}>ВИДЕО</span>
                    </div>
                    <div className={"header__stores_tg" + (state.data.storesChoosen == true ? ' active' : '')} onClick={storesClicked}>
                        <svg className="icon" width="25px" height="18px">
                            <path d="M21.345,0.545 L21.345,2.325 L24.015,2.325 C24.015,1.342 23.218,0.545 22.235,0.545 L21.345,0.545 ZM14.225,0.545 L14.225,2.325 L16.895,2.325 L16.895,0.545 L14.225,0.545 ZM7.105,0.545 L7.105,2.325 L9.775,2.325 L9.775,0.545 L7.105,0.545 ZM17.785,0.545 L17.785,3.215 L20.455,3.215 L20.455,0.545 L17.785,0.545 ZM10.665,0.545 L10.665,3.215 L13.335,3.215 L13.335,0.545 L10.665,0.545 ZM3.545,0.545 L3.545,3.215 L6.215,3.215 L6.215,0.545 L3.545,0.545 ZM1.765,0.545 C0.782,0.545 -0.015,1.342 -0.015,2.325 L-0.015,2.325 L2.655,2.325 L2.655,0.545 L1.765,0.545 ZM3.545,6.775 L6.215,6.775 L6.215,13.005 L3.545,13.005 L3.545,6.775 ZM17.785,6.775 L20.455,6.775 L20.455,13.005 L17.785,13.005 L17.785,6.775 ZM8.885,15.675 L8.885,6.775 L15.115,6.775 L15.115,15.675 L8.885,15.675 ZM0.875,3.215 L0.875,15.675 C0.875,16.658 1.672,17.455 2.655,17.455 L21.345,17.455 C22.328,17.455 23.125,16.658 23.125,15.675 L23.125,3.215 L21.345,3.215 L21.345,4.105 L16.895,4.105 L16.895,3.215 L16.005,3.215 L15.115,3.215 L14.225,3.215 L14.225,4.105 L9.775,4.105 L9.775,3.215 L8.885,3.215 L7.105,3.215 L7.105,4.105 L2.655,4.105 L2.655,3.215 L0.875,3.215 Z" fill="#dee6e7" />
                        </svg>
                        <span style={{ paddingLeft: '10px' }}>МАГАЗИНЫ</span>
                    </div>
                    <div className="header__search">
                        <div >
                            <svg className="icon" width="25px" height="18px">
                                <path d="M3.000,7.000 C3.000,4.791 4.791,3.000 7.000,3.000 C9.209,3.000 11.000,4.791 11.000,7.000 C11.000,9.209 9.209,11.000 7.000,11.000 C4.791,11.000 3.000,9.209 3.000,7.000 ZM-0.000,7.000 C-0.000,10.866 3.134,14.000 7.000,14.000 C10.866,14.000 14.000,10.866 14.000,7.000 C14.000,3.134 10.866,-0.000 7.000,-0.000 C3.134,-0.000 -0.000,3.134 -0.000,7.000 ZM12.321,14.418 L17.321,19.187 L19.633,16.969 L14.594,12.187 L12.321,14.418 Z" fill="#dee6e7"/>
                            </svg>
                            <input type="text" value={state.data.searchText} placeholder="Поиск"/>
                        </div>
                    </div>
                    {!globalState.videosActive ? ( 
                        <div className="addStore" onClick={addNewStore}>
                            <img style={{
                                marginTop: "3px",
                                marginLeft: "15px"
                            }} 
                                src={plusBTN} alt="add" width="30px"/>
                            <p style={{ marginLeft: "10px", fontWeight: 500 , marginTop: "15px"}}>Добавить магазин</p>
                        </div>
                    ) : (
                        <div className="addStore" onClick={addNewVideo}>
                            <img style={{
                                marginTop: "3px",
                                marginLeft: "15px"
                            }} 
                                src={plusBTN} alt="add" width="30px"/>
                            <p style={{ marginLeft: "10px", fontWeight: 500 , marginTop: "15px"}}>Добавить видео</p>
                        </div>
                    )}
                    <div style={{ width: "100%" }} >
                        <img style={{ float: "right", marginRight: "25px" }} src={logo} alt="logo"></img>
                    </div>
                </div>
            </div>
            <Dialog
                fullWidth
                height="800px"
                open={state.data.open}
                onClose={handleClose}
                aria-labelledby="dialog-title">
                <DialogTitle id="dialog-title">Добавить новый магазин</DialogTitle>
                    <DialogContent>
                    <TextField
                        margin="dense"
                        id="city"
                        label="Город"
                        value={state.data.addCity}
                        fullWidth
                        onChange={setResults}
                    />
                    <TextField
                        margin="dense"
                        id="ipAddress"
                        label="IP адрес"
                        value={state.data.addIpAddress}
                        fullWidth
                        onChange={setResults}
                    />
                    <TextField
                        margin="dense"
                        id="storeName"
                        label="Название магазина"
                        value={state.data.addStoreName}
                        fullWidth
                        onChange={setResults}
                    />
                    <TextField
                        margin="dense"
                        id="startTime"
                        label="Время начала"
                        type="time"
                        value={state.data.addTimeStart}
                        fullWidth
                        onChange={setResults}
                    />
                    <TextField
                        margin="dense"
                        id="endTime"
                        label="Время окончания"
                        type="time"
                        value={state.data.addTimeEnd}
                        fullWidth
                        onChange={setResults}
                    />

                    <Button style={{
                        background: '#ff7212',
                        color: '#FFF',
                        marginTop: '10px',
                        float: "right",
                        fontWeight: "700",
                        fontSize: "12px"
                    }} onClick={sendServerStore}>Добавить</Button>
                </DialogContent>
            </Dialog>

            <Dialog
                fullWidth
                height="800px"
                open={state.data.open2}
                onClose={handleClose}
                aria-labelledby="dialog-title">
                <DialogTitle id="dialog-title">Добавить новое видео</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="videoName"
                            label="Название"
                            value={state.data.videoName}
                            fullWidth
                            onChange={setResults2}
                        />
                   
                        <TextField
                            margin="dense"
                            id="startDate"
                            type="datetime-local"
                            label="Старт"
                            value={state.data.vids}
                            fullWidth
                            onChange={setResults2}
                        />
                        <TextField
                            margin="dense"
                            id="endDate"
                            label="Конец"
                            type="datetime-local"
                            value={state.data.vendDate}
                            fullWidth
                            onChange={setResults2}
                        />
                        <TextField
                            margin="dense"
                            id="ids"
                            label="Айдишки"
                            value={state.data.vids}
                            fullWidth
                            onChange={setResults2}
                        />
                        <TextField
                            margin="dense"
                            id="videoFile"
                            label="Видео файл"
                            value={state.data.vids}
                            fullWidth
                            type="file"
                            onChange={setResults2}
                        />

                        <Button style={{
                            background: '#ff7212',
                            color: '#FFF',
                            marginTop: '10px',
                            float: "right",
                            fontWeight: "700",
                            fontSize: "12px"
                        }} onClick={sendServerVideo}>Добавить</Button>
                </DialogContent>
            </Dialog>
		</React.Fragment>
        
	);
}

export default withRouter(Header);