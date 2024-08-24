import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TitleConponent from '../components/TitleConponent';
import ButtonComponent from '../components/ButtonComponent';
import { LinearGradient } from 'expo-linear-gradient';
import SubQuestCard from '../components/SubQuestCard';
import { SubLevel } from '../datas/data';
import RowComponent from '../components/RowComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { loadCurrenLevel } from '../datas/ProgressStorage';
import { CurrenLevel } from '../datas/progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const SubQuestScreen = ({ route }: { route: any }) => {
    const { item, user } = route.params || {};
    const [score, setscore] = useState(0);
    const [total, settotal] = useState(0);
    const [currentLevel, setcurrentLevel] = useState<CurrenLevel>();
    const navigation: any = useNavigation();

    useEffect(() => {
        const fectchCurrentLevel = async() => {
            try {
                const storedCurrentLevel = await loadCurrenLevel();
                if(storedCurrentLevel) {
                    setcurrentLevel(storedCurrentLevel);
                }
            } catch(error) {
                console.log(error);
            }
        }
        fectchCurrentLevel();
    }, []);

    useEffect(() => {
            const currentScore = currentLevel?.progress.find(p => p.level === item.level)?.score;
            if(currentScore) {
                setscore(currentScore);
            }
    }, []);

    return (
        <View className='flex-1' style={{padding: 20}}>
            <Image source={item.backgroundImage} style={{width: screenWidth+100, position: 'absolute', height: screenHeight}} blurRadius={5}></Image>
            <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.2)']}
                    style={{ width: wp(100), height: hp(15), borderRadius: 35}}
                    start={{ x: 0.5, y: 0 }}
                    className='absolute top-0'
                />   
                    <TitleConponent text={item.title} size={40}></TitleConponent>
            <RowComponent justify='space-between'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name='arrow-left' size={40} color='white'></FontAwesome>
                </TouchableOpacity>
                <TitleConponent text={`${score}/${item.subLevel.length}`}></TitleConponent>
            </RowComponent>
            <View className='flex-row justify-between flex-wrap' style={{marginTop: 10}}>
                {item.subLevel.map((subquest: SubLevel, index: number) => {
                    return (
                        <SubQuestCard key={index} subquest={subquest} index={index} user={user} level={item.level}></SubQuestCard>
                    )
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SubQuestScreen;
