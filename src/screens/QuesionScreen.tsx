import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Modal, Easing, Keyboard, Image  } from 'react-native';
import { SubLevel, Option } from '../datas/data';
import TitleConponent from '../components/TitleConponent';
import TextComponent from '../components/TextComponent';
import RowComponent from '../components/RowComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowRight2, ArrowRotateLeft, CloseCircle, Home2, TickCircle } from 'iconsax-react-native';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';

import LottieView from 'lottie-react-native';
import SpaceComponent from '../components/SpaceComponent';
import { useNavigation } from '@react-navigation/native';
import { Season } from '../datas/progress';
import { loadCurrenLevel, saveCurrenLevel } from '../datas/ProgressStorage';
import ShowRatingStar from '../components/ShowRatingStar';
import ProgressBarComponent from '../components/ProgressBarComponent';

const QuesionScreen = ({ route }: { route: any }) => {

    const navigation: any = useNavigation();

    const { subquest, level } = route.params as { subquest: SubLevel, level: number };
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
    const [correctOption, setcorrectOption] = useState<number | undefined>(undefined);
    const [currentOptionCorrect, setcurrentOptionCorrect] = useState<Option | null>(null);
    const [selectedOption, setselectedOption] = useState<Option | null>(null);
    const [disableSelect, setdisableSelect] = useState(false);
    const [showNextButton, setshowNextButton] = useState(false);
    const [essayAnswer, setessayAnswer] = useState('');
    const [showCorrectText, setshowCorrectText] = useState(false);
    const [finish, setfinish] = useState(false);
    const [onSelectedOption, setonSelectedOption] = useState<Option | null>(null);
    const progress = (currentQuestionIndex + 1) /subquest.questions.length;
    const [showModal, setshowModal] = useState(false);
    const [score, setscore] = useState(0);
    const [isExpanded, setisExpanded] = useState(false);
    const [imageSource, setImageSource] = useState(require('../../assets/animation/gif/star.gif'));

    const currentOptions = subquest.questions[currentQuestionIndex]?.options || [];
    // Animated values for question and options
    const questionAnimatedValue = useRef(new Animated.Value(300)).current;
    const translateY = useRef(new Animated.Value(200)).current;
    const AnimatedStar = ({ delay }: { delay: number }) => {
        const opacity = useRef(new Animated.Value(0)).current;
    
        useEffect(() => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400, // Thời gian hiệu ứng xuất hiện
                delay: delay, // Trễ thời gian để xuất hiện
                useNativeDriver: true,
            }).start();
        }, [delay]);
    
        return (
            <Animated.View style={{width:100,height: 100 ,opacity }}>
                <ShowRatingStar />
            </Animated.View>
        );
    };

    useEffect(() => {
      if (isExpanded) {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateY, {
          toValue: 200,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start();
      }
    }, [isExpanded]);
  
    useEffect(() => {
        // Animate the question and options together
        Animated.stagger(100, [
            Animated.timing(questionAnimatedValue, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
           
        ]).start();
    }, [currentQuestionIndex]);

    const validateAnswer = () => {
        let correctId = subquest.questions[currentQuestionIndex].options?.find(o => o.isCorrect === true)?.id;
        setcorrectOption(correctId);
        if (onSelectedOption?.isCorrect) {
            console.log('This is a correct answer');
            setscore(score+1);

        } else {
            console.log("This is an incorrect answer !!!");
            setselectedOption(onSelectedOption);
        }
        setdisableSelect(true);
        setshowNextButton(true);
        setonSelectedOption(null);
        setisExpanded(true);
        if(currentQuestionIndex == subquest.questions.length) {
            setfinish(true);
        }
    }

    const handleNextQuestion = () => {
        questionAnimatedValue.setValue(300);
        setcurrentQuestionIndex(currentQuestionIndex + 1);
        setselectedOption(null);
        setdisableSelect(false);
        setshowNextButton(false);
        setessayAnswer('');
        setcorrectOption(undefined);
        setshowCorrectText(false);
        setisExpanded(false);
       
    }

    const renderOptions = () => {
        return (
            <View style={{ marginTop: 10 }}>
                {subquest.questions[currentQuestionIndex].options?.map((option, index) => (
                    
                        <TouchableOpacity
                            onPress={() => setonSelectedOption(option)}
                            disabled={disableSelect}
                            key={index}
                            style={{
                                borderWidth: 2,
                                marginTop: 10,
                                borderColor: option.id == correctOption ? 'green' : option == selectedOption ? 'red' : 'rgba(117, 114, 114, 0.57)',
                                borderRadius: 20,
                                backgroundColor: option==onSelectedOption ? 'rgba(245, 187, 39, 0.42)' : option.id == correctOption ? 'rgba(23, 206, 38, 0.2)' : option == selectedOption ? 'rgba(207, 23, 23, 0.45)' : 'white',
                                padding: 10,
                            }}
                        >
                            <RowComponent justify='flex-start'>
                                <TextComponent text={option.text} color='black' size={20}></TextComponent>
                                {option.id == correctOption ? (
                                    <View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', borderRadius: 30 / 2 }}>
                                            <TickCircle size={30} color='white'></TickCircle>
                                        </View>
                                    </View>
                                ) : option == selectedOption ? (
                                    <View style={{ justifyContent: 'center' }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', borderRadius: 30 / 2 }}>
                                            <CloseCircle size={30} color='white'></CloseCircle>
                                        </View>
                                    </View>
                                ) : null}
                            </RowComponent>
                        </TouchableOpacity>
                  
                ))}
            </View>
        )
    }

    const handleAnswerEssay = () => {
        let correctAnswer = subquest.questions[currentQuestionIndex].rightEssayAnswer?.toLowerCase();
        Keyboard.dismiss();
        setdisableSelect(true);
        if(essayAnswer.toLowerCase() == correctAnswer) {
            setshowCorrectText(true);
            setscore(score+1);
            console.log("This is a correct answer");
        }else {
            console.log("This is an incorrect answer");
        }
        if(currentQuestionIndex +1 == subquest.questions.length) {
            setfinish(true);
        }
        setisExpanded(true);
    }
    
    const handleFinih = async () => {
        setshowModal(true);
        setessayAnswer('');
        const currentSeason: Season = {season: subquest.season, score: score, isComplete: true, isSelected: true};
        let currentLevel = await loadCurrenLevel();
        await currentLevel?.updateSeason(currentSeason, level);
        if(currentLevel) {
            saveCurrenLevel(currentLevel);
        }
    }

    const handleRefreshQuestion = () => {
            questionAnimatedValue.setValue(300);
        setshowModal(false);
        setfinish(false);
        setcurrentQuestionIndex(0);
        setselectedOption(null);
        setdisableSelect(false);
        setshowNextButton(false);
        setcorrectOption(undefined);
        setshowCorrectText(false);
        setisExpanded(false);
        setscore(0);
        

    }

    return (
        <View className='p-4'>
            <TitleConponent text='Questions' color='black'></TitleConponent>
                <ProgressBarComponent length={subquest.questions.length} index={currentQuestionIndex}></ProgressBarComponent>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <TextComponent text={`${currentQuestionIndex + 1}/`} color='black' size={20} flex={0}></TextComponent>
                <TextComponent text={`${subquest.questions.length}`} color='black' size={20}></TextComponent>
            </View>
            <Animated.View style={{ transform: [{ translateX: questionAnimatedValue }] }}>
                <TitleConponent text={`Câu ${currentQuestionIndex + 1}: ${subquest.questions[currentQuestionIndex].question}`} color='black'></TitleConponent>
                {subquest.questions[currentQuestionIndex].type === 'multichoice' ? renderOptions() : 
                    <View style={{marginTop: 20}}>
                        {showCorrectText && <TitleConponent text='Chính xác' color='green' size={25}></TitleConponent>}
                        <InputComponent 
                        isEditable={!disableSelect}
                        onChange={(val) => setessayAnswer(val)} 
                        value={essayAnswer}
                        placeHolder='Hãy nhập câu trả lời ở đây'
                        allowClear
                        ></InputComponent>
                        
                    </View>
                }
            </Animated.View>
            <RowComponent styles={{marginTop: 20}} justify='space-between'>
                <ButtonComponent text='Trả lời' onPress={() =>  subquest.questions[currentQuestionIndex].type=='multichoice' ?validateAnswer() : handleAnswerEssay()} isDisable={disableSelect}></ButtonComponent>
                {(currentQuestionIndex+1 < subquest.questions.length) && 
                    <TouchableOpacity style={{justifyContent: 'center', backgroundColor: 'blue', borderRadius: 15, width: 60, alignItems: 'center', paddingVertical: 5}} onPress={() => handleNextQuestion()}>
                        <ArrowRight2 size={40} color='white'></ArrowRight2>
                    </TouchableOpacity>
                }
            </RowComponent>
            <SpaceComponent height={30}></SpaceComponent>
            {isExpanded && <Animated.View
                    style={{
                    transform: [{ translateY }],
                    height: 200,
                    width: '100%',
                    padding: 20,
                    borderRadius: 15,
                    borderWidth: 2,
                    borderColor: 'rgba(117, 114, 114, 0.57)',
                    }}
                >
                    <TextComponent
                    text={subquest.questions[currentQuestionIndex]?.expand}
                    color="black"
                    size={20}
                    />
                </Animated.View>}
            { finish && (<View style={{alignItems: 'center', marginTop: 20}}>
                    <ButtonComponent text='Kết thúc' onPress={() => handleFinih()} width={120}></ButtonComponent>
                </View>) 
            }

            <Modal 
                visible={showModal}
                transparent={true}
                animationType='slide'
            >
                <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center',}}>
                    <View style={{height: 350, width: 300}}>
                        <LottieView
                            source={require('../../assets/animation/congratulation.json')}
                            autoPlay
                            style={{width: 500, height: 500, position: 'absolute', left: -80, top: -70, right: 0}}
                        ></LottieView>
                    </View>
                    <View style={{width: '100%', alignItems: 'flex-start'}}> 
                        <View style={{flexDirection: 'row', marginLeft: 50}}>
                            {Array.from({length: score}).map((_, index) => (
                                <AnimatedStar key={index} delay={index * 500} />
                            ))}
                        </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <TitleConponent text='TỔNG ĐIỂM' color='black' size={30}></TitleConponent>
                        <TextComponent text={`${score} điểm`} flex={0} color='black' size={20}></TextComponent>
                        <RowComponent styles={{marginTop: 20}}>
                            <ButtonComponent width={130} onPress={() => handleRefreshQuestion()} text='Làm lại' icon={<ArrowRotateLeft size={20} color='white' />}></ButtonComponent>
                                <SpaceComponent width={20}></SpaceComponent>
                            <ButtonComponent width={130} onPress={() => navigation.goBack()} text='Trở về' icon={<Home2 size={20} color='white'></Home2>}></ButtonComponent>
                        </RowComponent>
                    </View>
                </View>
            </Modal>
            
        </View>
    );
}

const styles = StyleSheet.create({});

export default QuesionScreen;
