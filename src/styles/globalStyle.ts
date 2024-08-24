import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get('window');

const globalStyle = StyleSheet.create({
    backgroundImage: {
        flex: 0,
        height: '100%',
        width: '100%',
       position: 'absolute',
    },

    container: {
        flex: 1,
        backgroundColor: '#373A40',
        paddingHorizontal: 20,
        paddingTop: 42,
    },
    text: {

    },
    inputContainer: {
        backgroundColor: '#6666',
        padding: 10,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
    },
   
})

export default globalStyle