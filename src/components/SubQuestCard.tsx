import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Animated, Image } from 'react-native';
import { SubLevel } from '../datas/data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TitleConponent from './TitleConponent';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '../datas/user';
import { saveUser } from '../datas/UserStorage';
import { CurrenLevel, Progress, Season } from '../datas/progress';
import { loadCurrenLevel, saveCurrenLevel } from '../datas/ProgressStorage';
import { useNavigation } from '@react-navigation/native';
import { Star1 } from 'iconsax-react-native';

interface Props {
    subquest: SubLevel;
    index: number;
    user: User;
    level: number;
}

const SubQuestCard = (props: Props) => {
    const {subquest, index, user, level} = props;
    const translateY = useRef(new Animated.Value(100)).current;
    const [currentLevel, setcurrentLevel] = useState<CurrenLevel | null>();

    const navigation: any = useNavigation();

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: -0, // Đưa về vị trí gốc
            duration: 500, // Thay đổi thời gian nếu cần
            delay: 100 * index, // Độ trễ giữa các phần tử
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    useEffect(() => {
        const fectchCurrentLevel = async() => {
            try {
                const storedCurrentLevel = await loadCurrenLevel();
                setcurrentLevel(storedCurrentLevel);
            } catch(error) {
                console.log(error);
            }
        }
        fectchCurrentLevel();
    },[])

    const saveCurrentLevel = async () => {
        const season: Season = {season: subquest.season, score: 0, isComplete: false, isSelected: false};
        if(currentLevel) {
            const currentProgress = currentLevel?.progress.find(p => p.level === level)
            currentLevel?.setSeason(season, currentProgress?.level);
            await saveCurrenLevel(currentLevel);
        } else {
            console.log('Error when save current level', {subquest});
        }
    };

    const handleEnterSeason = () => {
        navigation.navigate('QuestionScreen',{subquest, level});
    }
    

    return (
      <Animated.View style={{transform: [{translateY}]}}>
        <TouchableOpacity 
            style={{width: wp(44), height: wp(65)}}
            className='flex relative space-y-2 mb-5 justify-end p-4 py-6'
            onPress={() => handleEnterSeason()}
            >
               <Image
                    source={subquest.subbackgroundImage}
                    style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
                    className='absolute'
                />
                {currentLevel?.progress.find(p => p.level===level)?.seasons?.find(s => s.season === subquest.season)?.isComplete && 
                    <Star1 size={20} color='white'></Star1>
                }
           <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{ width: wp(44), height: hp(15), borderRadius: 35, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                    start={{ x: 0.5, y: 0 }}
                    className='absolute bottom-0'
                />
                <TitleConponent text={subquest.subtitle} size={wp(5)} />
       </TouchableOpacity>
      </Animated.View>
       
    );
};

const styles = StyleSheet.create({})

export default SubQuestCard;
