// userStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './user';

const USER_KEY = 'user';

export const getUser = async (): Promise<User | null> => {
    try {
        const userJson = await AsyncStorage.getItem(USER_KEY);
        if (userJson) {
            const userObj = JSON.parse(userJson);
            // Convert the plain object back to a User instance
            return User.fromPlainObject(userObj);
        }
        return null;
    } catch (error) {
        console.error('Error fetching user from storage', error);
        return null;
    }
};

export const saveUser = async (user: User) => {
    try {
        // Convert the User instance to a plain object
        const userJson = JSON.stringify(user.toPlainObject());
        await AsyncStorage.setItem(USER_KEY, userJson);
    } catch (error) {
        console.error('Error saving user to storage', error);
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
        console.error('Error removing user from storage', error);
    }
};
