import React, { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
    text: string,
    isLoading?: boolean,
    isDisable?: boolean,
    onPress: () => void,
    color?: string,
    padding?: number,
    borderRadius?: number,
    size?: number,
    width?: number,
    icon?: ReactNode
}

const ButtonComponent = (props: Props) => {

    const {text, isLoading, onPress, color, padding, borderRadius, size, width, icon, isDisable} = props;
    return (
        <TouchableOpacity onPress={onPress}
        disabled={isDisable}
        style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color ? color : isDisable ? 'gray' :'blue',
            padding: padding ? padding : 14,
            borderRadius: borderRadius ? borderRadius : 12,
            width: width ? width : 100
        }}>
            {
                isLoading ? <ActivityIndicator></ActivityIndicator> : 
                icon ? <RowComponent>
                    <TextComponent text={text} flex={0} styles={{textTransform: 'uppercase'}} size={size? size : 16}></TextComponent>
                    <SpaceComponent width={10}></SpaceComponent>
                    {icon}
                </RowComponent>
                : <TextComponent text={text} flex={0} styles={{textTransform: 'uppercase'}} size={size? size : 16}></TextComponent>
                
            }
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default ButtonComponent;
