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

const Videos = (props) => {
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
 
    const pageChanged = (event) => {
      let aState = state.data;
      aState.done = false;
       console.log(event.target.innerHTML);
      aState.currentPage = event.target.innerHTML - 1;
      setState({
          data: aState
      });
    }
    
    useEffect(() => {
      globalActions.getVideoItems();
      
      var aState = state.data;
      setTimeout(() => {

          aState.items = globalState.videos;
          aState.done = true;

          console.log(state.data.items);

          const pageNumbers = [];
          for (let i = 1; i <= Math.ceil(aState.items.length / state.data.itemsPerPage); i++) {
              pageNumbers.push(i);
          }

          // aState.oneItemChoosen;
          let strStores = "";
          for(let i = 0; i < aState.items.length; i++) {
              for(let j = 0; j < aState.items[i].videosToStand.length; j++) {
                strStores = strStores + aState.items[i].videosToStand[j].stand.storeName + ", ";
                aState.items[i].string = strStores;
              }
              strStores = ""; 
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
    }, [globalState.videos.length, state.data.currentPage]);
    
    
    return (
		<React.Fragment>
      {!state.data.done ? (
        <div className="loading">
            <ReactLoading type={"bars"} color={"#ff7a28"} height={'10%'} width={'10%'} />
        </div>
        ) 
        :
        (        
          <div className="content_wrapper">

            <div className="list_namesV">
                <span style={{ marginLeft: "10px" }}>Название видео</span>
                <span style={{ marginLeft: "470px" }}>Магазины</span>
            </div>

            <div className="list_items">
                {state.data.items.map((item, index) => (
                    <FadeIn>                                    
                      <Link to={'/videos/' + item.id} className="noStyle">    
                          <div className="one_itemV one_item1 width80" key={ index }>
                              <div>{ item.name }</div>
                              <div>{ item.string }</div>
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
        )}
		</React.Fragment>
	);
}

export default Videos;