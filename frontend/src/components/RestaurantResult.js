import React, { Component } from 'react';
import '../style/RestaurantResult.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class RestaurantResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            restaurant: {},
            schedule: {},
            mondaystart: "",
            mondayend: "",
            tuesdaystart: "",
            tuesdayend: "",
            wednesdaystart: "",
            wednesdayend: "",
            thursdaystart: "",
            thursdayend: "",
            fridaystart: "",
            fridayend: "",
            saturdaystart: "",
            saturdayend: "",
            sundaystart: "",
            sundayend: "",
            showModal: false,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    handleClose =()=> {
        this.setState({ showModal: false });
      }
    
      handleShow =()=> {
        this.setState({ showModal: true });
      }

    onClickHandler(remail, npemail, npname, dish, servings){
        let body = {
            restaurant_email: remail,
            nonprofit_email: npemail,
            nonprofit_name: npname,
            dish: dish,
            servings: servings
        }
        axios.post('http://127.0.0.1:4000/api/requests/', 
            body
        )
        .then(function (response) {
                // console.log("success")
        })
    }

    getTimeStr = (ms) => {
        var mins = ms.getMinutes();
        var hrs = ms.getHours();
        var minstr = ""+mins;
        if (mins < 10){
            minstr = "0"+minstr;
        }
        if (hrs === 0 ){
            hrs = 12;
        }
        if (hrs > 12){
            hrs = hrs % 12;
            minstr = minstr +"PM";
        } else{
            minstr = minstr +"AM";
        }
        var hrsstr = ""+hrs;
        return hrsstr+":"+minstr;
    }

    showSched() {
        var res = this.state.schedule;
        if (res.mondaystart){
            let ms = new Date(res.mondaystart);
            this.setState({mondaystart: this.getTimeStr(ms)});
        }
        if (res.mondayend){
            let ms = new Date(res.mondayend);
            this.setState({mondayend: this.getTimeStr(ms)});
        }
        if (res.tuesdaystart){
            let ms = new Date(res.tuesdaystart);
            this.setState({tuesdaystart: this.getTimeStr(ms)});
        }
        if (res.tuesdayend){
            let ms = new Date(res.tuesdayend);
            this.setState({tuesdayend: this.getTimeStr(ms)});
        }
        if (res.wednesdaystart){
            let ms = new Date(res.wednesdaystart);
            this.setState({wednesdaystart: this.getTimeStr(ms)});
        }
        if (res.wednesdayend){
            let ms = new Date(res.wednesdayend);
            this.setState({wednesdayend: this.getTimeStr(ms)});
        }
        if (res.thursdaystart){
            let ms = new Date(res.thursdaystart);
            this.setState({thursdaystart: this.getTimeStr(ms)});
        }
        if (res.thursdayend){
            let ms = new Date(res.thursdayend);
            this.setState({thursdayend: this.getTimeStr(ms)});
        }
        if (res.fridaystart){
            let ms = new Date(res.fridaystart);
            this.setState({fridaystart: this.getTimeStr(ms)});
        }
        if (res.fridayend){
            let ms = new Date(res.fridayend);
            this.setState({fridayend: this.getTimeStr(ms)});
        }
        if (res.saturdaystart){
            let ms = new Date(res.saturdaystart);
            this.setState({saturdaystart: this.getTimeStr(ms)});
        }
        if (res.saturdayend){
            let ms = new Date(res.saturdayend);
            this.setState({saturdayend: this.getTimeStr(ms)});
        }
        if (res.sundaystart){
            let ms = new Date(res.sundaystart);
            this.setState({sundaystart: this.getTimeStr(ms)});
        }
        if (res.sundayend){
            let ms = new Date(res.sundayend);
            this.setState({sundayend: this.getTimeStr(ms)});
        }
        // console.log(this.state);
    }

    componentDidMount(){
        let url = `http://127.0.0.1:4000/api/restaurants/${this.props.restEmail}`
        axios.get(url,)
        .then((response) => {
            this.setState({restaurant:response.data.data})
        })
        let surl = `http://127.0.0.1:4000/api/schedules/${this.props.restEmail}`
        axios.get(surl,)
        .then((response) => {
            this.setState({schedule:response.data.data})
            this.showSched();
        })
    }
    
    render() {
        return (
        <div className="rest-result" onClick = {() => this.onClickHandler(this.props.restEmail, this.props.npEmail, this.props.npName, this.props.restItem, this.props.restNumb )}>
            <span onClick={() => this.handleShow()} className="rest-text-under">{this.props.restName}</span> 
                <Modal isOpen={this.state.showModal} toggle={() => this.handleClose()}>
                    <ModalHeader>
                        {this.state.restaurant.name}
                        <Button className="rx" onClick={() => this.handleClose()}>&times;</Button>
                    </ModalHeader>
                    <ModalBody>
                        <p> {this.state.restaurant.address} </p>
                        <p> {this.state.restaurant.city},{this.state.restaurant.state}  </p>
                        <p> {this.state.restaurant.zip_code} </p>
                        <p> Phone: {this.state.restaurant.phone_number}, Email: {this.state.restaurant.email} </p>
                        <p> M: {this.state.mondaystart}-{this.state.mondayend}</p>
                        <p> T: {this.state.tuesdaystart}-{this.state.tuesdayend}</p>
                        <p> W: {this.state.wednesdaystart}-{this.state.wednesdayend}</p>
                        <p> TH: {this.state.thursdaystart}-{this.state.thursdayend}</p>
                        <p> F: {this.state.fridaystart}-{this.state.fridayend}</p>
                        <p> SAT: {this.state.saturdaystart}-{this.state.saturdayend}</p>
                        <p> SUN: {this.state.sundaystart}-{this.state.sundayend}</p>
                    </ModalBody>
                </Modal>
            <span className="rest-text">{this.props.restItem}</span> 
            <span className="rest-text">{this.props.restPrice}</span> 
            <span className="rest-text-last">{this.props.restNumb}</span> 
        </div>
        );
    }
}

export default RestaurantResult;