import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Character, characters } from '../datas/char';
import CharacterCard from '../components/CharacterCard';
import TitleConponent from '../components/TitleConponent';
import { Audio } from 'expo-av';
import ButtonComponent from '../components/ButtonComponent';
import { getUser, saveUser } from '../datas/UserStorage';
import {User} from '../datas/user';
import { CommonActions } from '@react-navigation/native';
import TextComponent from '../components/TextComponent';
import { CurrenLevel, Progress } from '../datas/progress';
import { saveCurrenLevel } from '../datas/ProgressStorage';

const ChoiceCharScreen = ({navigation}: any) => {
    const [selectId, setselectId] = useState('');
    const [charSelected, setcharSelected] = useState<Character | undefined>(undefined);
    const [sound, setsound] = useState<Audio.Sound | null>(null);
    const [user, setuser] = useState<User | null>(null);
    const [errorText, seterrorText] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await getUser();
                setuser(storedUser);
        } 
        fetchUser();
        
    }, []);
    const initialProgress = { level: 1, completed: false, score: 0};
    const initCurrenProgress: Progress[] = [{level: 1, score: 0, isComplete: false, seasons: []}];
    const initCurrenLevel = new CurrenLevel(initCurrenProgress);

    const handleSelected = async (id: string, char: Character) => {
        setselectId(id);
        setcharSelected(char);
        seterrorText('');
        if(sound) {
            await sound.stopAsync();
        }

        if(char.voice.length > 0) {
            const {sound: newSound} = await Audio.Sound.createAsync(char.voice[0].path);
            setsound(newSound);
            await newSound.playAsync();
        }
    }

    const handleBegin = async () => {
        if (user && charSelected) {
            // Create a new instance of User
            const updatedUser = new User(user.name, charSelected, initialProgress, 1);
            await saveUser(updatedUser);
            await saveCurrenLevel(initCurrenLevel);
            if(sound) {
                await sound.stopAsync();
            }
             navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'HomeScreen' }],
                })
              );
        }else {
            seterrorText('Bạn hãy chọn nhân vật trước !!');
        }
    };
    return (
        <View>
            <View className='p-4'>
                <TitleConponent text='Xin hãy chọn nhân vật' color='black'></TitleConponent>
                
                <View className='flex-row flex justify-between flex-wrap' style={{ marginTop: 10}}>
                
                    {characters.map((item, index) => {
                        return (
                            <CharacterCard item={item} index={index} onSelected={(id: string, char: Character) => handleSelected(id, char)} selected={item.id === selectId} key={index}></CharacterCard>
                        )
                    })}
                    
                </View>
                <View>
                    {errorText && <TextComponent text={errorText} color='coral' size={15} flex={0}></TextComponent>}
                    {(charSelected ) ? <TitleConponent text={`Bạn đã chọn ${charSelected.name}`} color='black'></TitleConponent> : <TitleConponent text=''></TitleConponent>}
                </View>
                <View style={{alignItems: 'center', height: 90, justifyContent: 'flex-end'}}>
                <ButtonComponent text='Bắt đầu' onPress={() => handleBegin()} color='coral'></ButtonComponent>
                </View>
            </View>
        </View>
        
        
    );
}

const styles = StyleSheet.create({})

export default ChoiceCharScreen;
