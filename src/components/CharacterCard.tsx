import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Character } from '../datas/char';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    item: Character;
    index?: number;
    selected?: boolean;
    onSelected: (id: string, char: Character) => void;
}

const CharacterCard = (props: Props) => {
  
    const { item, index, selected, onSelected } = props;
   
    return (
        <View style={[styles.container, {borderColor: selected ? '#43CD80' : '#BEBEBE', borderWidth: selected ? 2 : 1}]}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => onSelected(item.id, item)}>
                <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: wp(35),
        height: wp(45),
        marginBottom: 5, // Optional: add margin to space out items
        padding: 4,
        marginTop: 10,
        borderRadius: 35,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
    },
    touchableOpacity: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', // Center content vertically if needed
        alignItems: 'center',
         // Center content horizontally if needed
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Ensures the image covers the area without stretching
    },
});

export default CharacterCard;
