import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SubQuestScreen from '../screens/SubQuestScreen';
import { Level } from '../datas/data';
import { getUser } from '../datas/UserStorage';
import ChoiceCharScreen from '../screens/ChoiceCharScreen';
import QuesionScreen from '../screens/QuesionScreen';

type RootStackParamList = {
    WelcomeScreen: undefined;
    ChoiceCharSCreen: undefined;
    HomeScreen: undefined;
    SubQuestScreen: {item: Level};
    QuestionScreen: undefined;
  };

  const Router = () => {
    const Stack = createStackNavigator<RootStackParamList>();
    const [isBegin, setisBegin] = useState(true);
    const [isLoading, setisLoading] = useState(true);  // Thay đổi isLoading ban đầu thành true

    useEffect(() => {
        const checkUser = async () => {
            const user = await getUser();
            setisBegin(!(user && user.name && user.char));
            setisLoading(false);  // Hoàn tất kiểm tra, tắt trạng thái tải
        }
        checkUser();
    },[]);

    if (isLoading) {
          return (<View>
            
          </View>)
    }

    const MainRouter = (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='HomeScreen'>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SubQuestScreen' component={SubQuestScreen}
                options={{...TransitionPresets.SlideFromRightIOS, transitionSpec: {
                    open: {
                        animation: 'timing',
                        config: {
                            duration: 250,
                        },
                    },
                    close: {
                        animation: 'timing',
                        config: {
                            duration: 250,
                        },
                    },
                }}}
            />
            <Stack.Screen name='QuestionScreen' component={QuesionScreen}></Stack.Screen>
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen name='ChoiceCharSCreen' component={ChoiceCharScreen}></Stack.Screen>
        </Stack.Navigator>
    );

    const BeginRouter = (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen name='ChoiceCharSCreen' component={ChoiceCharScreen}></Stack.Screen>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='SubQuestScreen' component={SubQuestScreen}
                options={{...TransitionPresets.SlideFromRightIOS, transitionSpec: {
                    open: {
                        animation: 'timing',
                        config: {
                            duration: 250,
                        },
                    },
                    close: {
                        animation: 'timing',
                        config: {
                            duration: 250,
                        },
                    },
                }}}
            />
        </Stack.Navigator>
    );

    return isBegin ? BeginRouter : MainRouter;
};


const styles = StyleSheet.create({})

export default Router;
