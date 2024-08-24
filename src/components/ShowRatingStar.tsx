import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const ShowRatingStar = () => {
    return (
        <View style={{flex: 1}}>
            <LottieView 
                source={require('../../assets/animation/gif/starAnimation.json')}
                autoPlay
                loop={true}
                style={{width: '100%', height: '100%'}}
                ></LottieView>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ShowRatingStar;
