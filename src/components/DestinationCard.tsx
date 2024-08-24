import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Animated } from 'react-native';
import { Level } from '../datas/data';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import TitleConponent from './TitleConponent';
import { Lock1 } from 'iconsax-react-native';
import {User, Status} from '../datas/user';

interface Props {
    item: Level;
    navigation: any;
    index: number; 
    userLevel: number;
    user: User | null;
    // Thêm index để áp dụng độ trễ
}

const DestinationCard = (props: Props) => {
    const { item, navigation, index, userLevel, user } = props;
    const translateY = useRef(new Animated.Value(100)).current; // Bắt đầu từ dưới
   // const opacity = useRef(new Animated.Value(0)).current; // Bắt đầu từ không rõ
    const [userStatus, setuserStatus] = useState<Status | null>(null);
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: -0, // Đưa về vị trí gốc
            duration: 500, // Thay đổi thời gian nếu cần
            delay: 100 * index, // Độ trễ giữa các phần tử
            useNativeDriver: true,
        }).start();
        
    }, [translateY]);

    useEffect(() => {
        
    },[])
    //Dùng để hiện ra từ từ
    // useEffect(() => {
    //     Animated.timing(opacity, {
    //         toValue: 1,
    //         duration: 500,
    //         delay: 100 * (props.index || 0), // Delay để các phần tử xuất hiện lần lượt
    //         useNativeDriver: true,
    //     }).start();
    // }, [opacity]);

    const handleEnterLevel = async () => {
        await user?.updateuserStatus(item.level, false, 0,);
        navigation.navigate('SubQuestScreen',{ item, user });
    }
    return (
        <Animated.View style={{ ...styles.card, transform: [{ translateY }] }}>
            {index < userLevel ? (
                <TouchableOpacity
                    style={{ width: wp(44), height: wp(65) }}
                    className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
                    onPress={() => handleEnterLevel()}
                >
                    <Image
                        source={item.backgroundImage}
                        style={{ width: wp(44), height: wp(65), borderRadius: 35 }}
                        className="absolute"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={{ width: wp(44), height: hp(15), borderRadius: 35, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                        start={{ x: 0.5, y: 0 }}
                        className="absolute bottom-0"
                    />
                    <TitleConponent text={item.title} size={wp(4)} />
                </TouchableOpacity>
            ) : (
                <View
                    style={{ width: wp(44), height: wp(65), }}
                    className="flex justify-end relative p-4 py-6 space-y-2 mb-5"
                >
                    <Image
                        source={item.backgroundImage}
                        style={{ width: wp(44), height: wp(65), borderRadius: 35,}} // Dimmed image
                        className="absolute"
                    />
                    <View
                        style={{
                            position: 'absolute',
                            width: wp(44),
                            height: wp(65),
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Màu đen với độ mờ 50%
                            borderRadius: 35,
                        }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,1)']}
                        style={{ width: wp(44), height: hp(15), borderRadius: 35, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
                        start={{ x: 0.5, y: 0 }}
                        className="absolute bottom-0"
                    />
                    <Lock1 size={35} color='yellow' style={{position: 'absolute', top: 90, right: 70}}></Lock1>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: wp(44),
        height: wp(65),
        marginTop: 20,
    },
});

export default DestinationCard;
