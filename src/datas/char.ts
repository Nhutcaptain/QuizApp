import { AVPlaybackSource } from "expo-av";
import { ImageSourcePropType } from "react-native";

interface VoiceClip {
    path: AVPlaybackSource;
    purpose?: string;
}

interface Character {
    id: string,
    name: string;
    image: ImageSourcePropType;
    voice: VoiceClip[];
}

const characters: Character[] = [
    {
        id: '01',
        name:'Doraemon',
        image: require("../../assets/images/characters/Doraemon.png"),
        voice: [
            {
                path: require('../../assets/sounds/Doraemon.mp3'),
                purpose:'When selected',
            },
             {
                path: require("../../assets/sounds/JaianVoice.mp3"),
                purpose:'When go Home',
             }
        ],
    },
    {
        id: '02',
        name: 'Nobita',
        image: require('../../assets/images/characters/Nobita.png'),
        voice: [],
    },
    {
        id: '03',
        name: 'Shizuka',
        image: require('../../assets/images/characters/Shizuka.png'),
        voice: [],
    },
    {
        id: '04',
        name: 'Jaian',
        image: require('../../assets/images/characters/Jaian.png'),
        voice: [],
    },
    {
        id: '05',
        name: 'Doraemi',
        image: require('../../assets/images/characters/Dorami.png'),
        voice: [],
    },
    {
        id: '06',
        name: 'Suneo',
        image: require('../../assets/images/characters/Suneo.png'),
        voice: [],
    }
] 

export {Character, characters};