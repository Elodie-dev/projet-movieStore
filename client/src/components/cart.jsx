import React from "react";
import {Link, IndexLink} from "react-router-dom";
import {store, removeCart} from "../utils/shared-state.js";
import {removeAll} from "../utils/shared-state.js";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import CartCard from "./cart-card.jsx";
import numeral from "numeral";


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        
    }
    componentDidMount() {
        this.unsub = store.subscribe(() => this.setState(store.getState()));
    }
    componentWillUnmount() {
        this.unsub();
    }    
    countPrice(){
        var totalPrice = 0;
        this.state.carts.map(item => 
            totalPrice += (item.quantity *item.price) 
        )
        return totalPrice;
    }    
    render() {
        var cartCards;
        if (this.state.carts) {
            if(this.state.carts.length == 0){
                cartCards = (
                    <div>
                        <p className="mdl-typography--display-1-color-contrast cartEmpty">Votre panier est vide.</p>
                    </div>

                );
            } else {
            cartCards = this.state.carts.map(movie => 
                <CartCard key={movie.movie_id} 
                    movie={movie}>
 
                </CartCard>);
            }
        }      
 
        var tdStyle = {
            width: '619px'
        } 
        var tdStyle2 = {
            width: '13.3%',
            
            verticalAlign: 'top',
            textAlign: 'center'
        }

        var trStyle = {
            marginBottom: '25px',
            width:'1028px',
            paddingBottom: '5px',
            borderBottom: '1px dotted grey',
            fontWeight: 'bold'
        }
        var trStyle2 = {
            marginTop: '25px',
            width:'1028px',
            paddingTop: '5px',
            borderTop: '1px dotted grey'

        }        
  
        return (

            <div className="android-more-section">

                <div className="android-section-title mdl-typography--display-1-color-contrast">
                    Contenu du panier
                </div>
                <div className="android-card-container mdl-grid">
                        <tr style={trStyle}>
                            <th style={tdStyle}></th>
                            <th style={tdStyle2}>Quantit??</th>
                            <th style={tdStyle2}>Prix</th>
                            
                        </tr>


                        {cartCards}

                        
                        <th style={trStyle2}>
                            <td style={tdStyle}>

                            </td>
                            <td style={tdStyle2}></td>
                            <td style={tdStyle2}>Total:</td>
                            <td style={tdStyle2}>{numeral(this.countPrice()).format('???0,0.00')}</td>
                            
                        </th>
                </div>
                  <Link to="/orderDetails" className="btn btn-success">Confirmer</Link>
            </div>
        );
    }
}