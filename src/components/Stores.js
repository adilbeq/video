import React, { useState, useEffect } from 'react';
import useGlobal from '../store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Switch from "react-switch";
import Button from '@material-ui/core/Button';
import ReactLoading from "react-loading";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import "bootstrap/dist/css/bootstrap.css";
import './Stores.css';
import { FormControlLabel } from '@material-ui/core';

const Stores = () => {
    const [globalState, globalActions] = useGlobal();
	const [state, setState] = useState({
		data: {
            items: [],
            done: false,
            currentPage: 0,
            itemsPerPage: 13,
            pageNumbers: []
        }
	});
    
    
    useEffect(() => {
        globalActions.getStoreItems();
        
        var aState = state.data;
        setTimeout(() => {

            aState.items = globalState.stores;
            aState.done = true;

            console.log(state.data.items);

            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(aState.items.length / state.data.itemsPerPage); i++) {
                pageNumbers.push(i);
            }

            aState.pageNumbers = pageNumbers;

            const startIdx = state.data.currentPage * state.data.itemsPerPage;
            const endIdx   = (state.data.currentPage + 1) * state.data.itemsPerPage;

            const pageItems = aState.items.slice(startIdx, endIdx);
            aState.items = pageItems;

            setState({
                data: aState
            });

        }, 900);

		return () => {
		};
    }, [globalState.stores.length, state.data.currentPage]);
    
    const pageChanged = (event) => {
        let aState = state.data;
        aState.done = false;
		console.log(event.target.innerHTML);
        aState.currentPage = event.target.innerHTML - 1;
        setState({
            data: aState
        });
	}
    
    return (
		<React.Fragment>
            
            <div>
                {!state.data.done ? (
                    <div className="loading">
                        <ReactLoading type={"bars"} color={"#ff7a28"} height={'10%'} width={'10%'} />
                    </div>
                ) : 
                (
                    <FadeIn>
                        <div className="content_wrapper">           
                            <div className="list_names">
                                <span style={{marginLeft: "10px"}}>Название магазина</span>
                                <span>IP адрес</span>
                                <span>Город</span>
                                <span>Период</span>
                            </div>

                            <div className="list_items">
                                {state.data.items.map((item, index) => (
                                    <FadeIn>                                    
                                        <Link to={'/stores/' + item.id} className="noStyle">    
                                            <div className="one_item one_item1" key={ index }>
                                                <div>{ item.storeName }</div>
                                                <div>{ item.ipAddress }</div>
                                                <div>{ item.city }</div>
                                                <div>{ item.updateStartTime } - { item.updateEndTime }</div>
                                            </div>
                                        </Link>
                                     </FadeIn>
                                ))}
                            </div>
                            <FadeIn>
                                <div style={{display: "flex", marginTop: "20px"}}>
                                    {state.data.pageNumbers.map(number =>( 
                                        <FadeIn>
                                            <div key={number} className={"paginationBtn"  + (state.data.currentPage+1 == number ? ' activePage' : '')} >
                                                <span onClick={pageChanged}>{ number }</span>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </FadeIn>
                )}
            </div>   
			
		</React.Fragment>
	);
}

export default Stores;