import React from 'react';
import useGlobalHook from 'use-global-hook';

const initialState = {
	token: '',
	login: true,
	userLogin: '',
	stores: [],
	storesActive: true,
	videosActive: false,
	videos: [],
	infoID: [],
	globalID: []
}

const actions = {
	globalID: (store, payload) => {		
		store.setState({
			globalID: payload
		})
	},	
	setStoresActive: (store, payload) => {		
		store.setState({
			storesActive: payload
		})
	},
	setVideosActive: (store, payload) => {		
		store.setState({
			videosActive: payload
		})
	},
	getStoreItems: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
		fetch('http://172.16.12.34:8080/api/stands', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            })
        }).then(res => res.json()).then(
            (result) => {
				
				store.setState({
					stores: result
				})
				//console.log(store.state.stores);
            },
            (error) => {
                console.log('error', error);
            }
        );
	},
	getVideoItems: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
		fetch('http://172.16.12.34:8080/api/video-files', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            })
        }).then(res => res.json()).then(
            (result) => {
				console.log(result);
				store.setState({
					videos: result
				})
				//console.log(store.state.stores);
            },
            (error) => {
                console.log('error', error);
            }
        );
	},
	addNewStore: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
		fetch('http://172.16.12.34:8080/api/stands', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ token,
			},
			body: JSON.stringify({	
				"city": payload.city,
				"ipAddress": payload.ip,
				"storeName": payload.name,
				"updateEndTime": payload.endTime,
				"updateStartTime": payload.startTime
			})
		}).then(res => res.json()).then(
			(result) => {
				const tempItemsThree = store.state.stores.slice();
				tempItemsThree.push(result);
				store.setState({
					stores: tempItemsThree
				});
			},
			(error) => {
				console.log('error ', error);
			}
		);
	},
	deleteStore: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
		fetch('http://172.16.12.34:8080/api/stands/' + payload.id, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ token,
			}
		}).then(res => res.json()).then(
			(result) => {
				
			},
			(error) => {
				console.log('error ', error);
			}
		);
	},
	editStore: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
		fetch('http://172.16.12.34:8080/api/stands/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ token,
			},
            body: JSON.stringify({	
                "id": payload.id,
				"ipAddress": payload.ip,
				"storeName": payload.storeName,
				"city": payload.city,
				"updateStartTime": payload.startTime,
				"updateEndTime": payload.endTime
            })
		}).then(res => res.json()).then(
			(result) => {
				console.log(result);
			},
			(error) => {
				console.log('error ', error);
			}
		);
	},
	uploadNewVideo: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
		fetch('http://172.16.12.34:8080/api/uploadFile', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer '+ token,
			},
            body: payload
		}).then(res => res.json()).then(
			(result) => {
				console.log(result);
				
			},
			(error) => {
				console.log('error ', error);
			}
		);
	},
	getInfoById: (store, payload) => {
		var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTU3NTEwMDAxNn0.xPkLXaRcIuppY6vHMFgRffPzcAMhSefb26_dXEtsqN-nmaxNLltXJKsm80Zguy5QYU9obvK4yHq9eS2Lpj1HxA";
        fetch('http://172.16.12.34:8080/api/video-files/' + payload, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/json'
            })
        }).then(res => res.json()).then(
            (result) => {
				console.log(result);
				
				let temp = [];
				temp.push(result);
                store.setState({
                    infoID: temp
                });
            },
            (error) => {
                console.log('error', error);
            }
        );
	}
}

const useGlobal = useGlobalHook(React, initialState, actions);
export default useGlobal;