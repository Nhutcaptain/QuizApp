import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import globalStyle from '../styles/globalStyle';
import TextComponent from '../components/TextComponent';
import TitleConponent from '../components/TitleConponent';
import ButtonComponent from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import InputComponent from '../components/InputComponent';
import {User} from "../datas/user";
import { saveUser } from '../datas/UserStorage';

const WelcomeScreen = ({navigation}: any) => {
    const [name, setname] = useState('');
    const [errorText, setErrorText] = useState('');

    const handleChangeName = async () => {
        if(!name) {
            setErrorText('Bạn hãy nhập tên trước')
        } else {
           const user = new User(name,'', undefined, 0);
        await saveUser(user);
            setErrorText('');
            // navigation.dispatch(
            //     CommonActions.reset({
            //       index: 0,
            //       routes: [{ name: 'HomeScreen' }],
            //     })
            //   );
            navigation.navigate('ChoiceCharSCreen');
        }
        
    }

    useEffect(() => {
        setErrorText('');
    },[name])
    
    return (
        <View className='flex-1 justify-end'>
            <Image className='h-full w-full absolute' source={require('../../assets/images/background3.jpg')}></Image>
            <View style={{padding: 20, paddingBottom: 40, marginBottom: 32}}>
                <View style={{marginBottom: 12}}>
                    <TitleConponent text='CHÀO MỪNG BẠN ĐẾN VỚI VÙNG ĐẤT' size={40}></TitleConponent>
                </View>
                <View>
                    <InputComponent 
                        value={name} 
                        onChange={(val) => setname(val)}
                        allowClear
                        placeHolder='Nhập tên tại đây '
                        textColor='#DCDCDC'
                        align='center'
                        fontSize={20}
                        fontWeight='bold'
                        ></InputComponent>
                        {errorText && <TextComponent text={errorText} color='coral' flex={0} />}
                </View>
                <View style={{alignItems: 'center'}}>
                    <ButtonComponent text='Bắt đầu' onPress={() => handleChangeName()} color='orange'></ButtonComponent>
                </View>    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default WelcomeScreen;
