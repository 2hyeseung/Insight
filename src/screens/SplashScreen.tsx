import React from 'react';
import {ImageBackground} from "react-native";
import { render } from 'react-dom';

export default class SplashScreen extends React.Component{

    render(){
        return (
            <ImageBackground
                resizeMode="stretch"
                source={require("../../assets/splash.gif")}    
                style={{flex:1}}>
            </ImageBackground>
        );
    }

}