import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DestinationComponent from '../components/DestinationComponent';
import TitleConponent from '../components/TitleConponent';
import { ScrollView } from 'react-native-gesture-handler';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import {User} from '../datas/user';
import { getUser, removeUser } from '../datas/UserStorage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Character, characters } from '../datas/char';
import { Audio } from 'expo-av';
import { CurrenLevel } from '../datas/progress';
import { loadCurrenLevel } from '../datas/ProgressStorage';

const HomeScreen = ({ navigation }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [selectedChar, setSelectedChar] = useState<Character | null>(null);
    const [currentLevel, setcurrentLevel] = useState<CurrenLevel | null>();

    // Fetch user data and set selected character when screen is focused
    useFocusEffect(
        useCallback(() => {
            const fetchUser = async () => {
                try {
                    const storedUser = await getUser();
                    setUser(storedUser);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            };

            fetchUser();

            return () => {
                // Cleanup function if needed
            };
        }, [])
    );

    useEffect(() => {
        const getCharacterDetails = () => {
            if (user && user.char) {
                if (typeof user.char === 'string') {
                    return characters.find(c => c.id === user.char) || null;
                } else {
                    return user.char;
                }
            }
            return null;
        };

        setSelectedChar(getCharacterDetails());
    }, [user]);

    useEffect(() => {
        const playHomeSound = async () => {
            try {
                if (selectedChar) {
                    const voiceClip = selectedChar.voice.find(v => v.purpose === 'When go Home');
                    if (voiceClip) {
                        const { sound: newSound } = await Audio.Sound.createAsync(voiceClip.path);
                        setSound(newSound);
                        await newSound.playAsync();
                    }
                }
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        };

        playHomeSound();
    },[selectedChar])

    const handleChangeName = async () => {
        try {
            await removeUser();
            sound?.stopAsync();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'WelcomeScreen' }],
                })
            );
        } catch (error) {
            console.error('Error removing user:', error);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 15, marginTop: 30 }}>
                <TouchableOpacity onPress={handleChangeName}>
                    <AntDesign name='close' size={20} color='black' />
                </TouchableOpacity>
                <TitleConponent
                    text={`Xin chào ${user?.name}, nhân vật bạn chọn là ${selectedChar?.name || 'chưa chọn'}`}
                    color='black'
                />
                <TitleConponent
                    text='Hãy chọn Level cho bạn'
                    color='black'
                    size={30}
                />
                <DestinationComponent />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;
