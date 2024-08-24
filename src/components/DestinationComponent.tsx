import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { levels } from '../datas/data';
import DestinationCard from './DestinationCard';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../datas/UserStorage';
import {User} from '../datas/user';

const DestinationComponent = () => {
    const [userLevel, setuserLevel] = useState(0);
    const navigation = useNavigation();
    const [user, setuser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await getUser();
            if (storedUser) {
                setuserLevel(storedUser.level);
                setuser(storedUser);
            }
        };
        fetchUser();
    }, []);
    return (
        <View className='flex-row justify-between flex-wrap' style={{paddingTop: 10}}>
            {levels.map((item, index) => {
                return (
                    <DestinationCard item={item} key={index} navigation={navigation} index={index} userLevel={userLevel} user={user}></DestinationCard>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({})

export default DestinationComponent;
