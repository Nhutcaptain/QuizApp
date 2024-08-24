import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrenLevel, Progress } from './progress';

const CURRENLEVEL_KEY = 'currenlevel';

export const saveCurrenLevel = async (currenLevel: CurrenLevel) => {
    try {
        const jsonValue = JSON.stringify(currenLevel.toPlainObject());
        await AsyncStorage.setItem('currenlevel', jsonValue);
        console.log('CurrenLevel saved successfully');
    } catch (e) {
        console.error('Failed to save CurrenLevel', e);
    }
};

export const loadCurrenLevel = async (): Promise<CurrenLevel | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('currenlevel');
        if (jsonValue != null) {
            const obj = JSON.parse(jsonValue);
            return CurrenLevel.fromPlainObject(obj);
        }
        return null;
    } catch (e) {
        console.error('Failed to load CurrenLevel', e);
        return null;
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(CURRENLEVEL_KEY);
    } catch (error) {
        console.error('Error removing user from storage', error);
    }
};