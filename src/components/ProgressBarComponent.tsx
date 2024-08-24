import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

interface Props {
    length: number;
    index: number;
}

const ProgressBarComponent = (props: Props) => {
    const {length, index} = props;
    const progress = useRef(new Animated.Value(0)).current;
    const progressAnim = progress.interpolate({
        inputRange: [0, length],
        outputRange: ['0%','100%'],
    })

    useEffect(() => {
        const nextQuestion = () => {
            Animated.timing(progress, {
                toValue: index+1,
                duration: 600,
                useNativeDriver: false,
            }).start();
        }
        nextQuestion();
    },[index])

    return (
        <View style={{
            width: '100%',
            height: 20,
            borderRadius: 20,
            backgroundColor: '#00000020',
        }}>
            <Animated.View style={{
                height: 20,
                borderRadius: 20,
                backgroundColor: 'coral',
                width: progressAnim,
            }}></Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ProgressBarComponent;
