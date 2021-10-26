import { StyleSheet , Dimensions} from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    title: {
        textAlign: 'left',
        fontSize: 24,
        marginTop: '5%',
        fontFamily: 'GTEestiDisplay-Regular'
    },
    inputTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontFamily: 'GTEestiDisplay-Medium',
        color: 'gray',
    },
    tosContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: height * 0.025,
        fontFamily: 'GTEestiDisplay-Medium'
    },
    clickableText: {
        fontFamily: 'GTEestiDisplay-Medium',
        textDecorationLine: 'underline',
    }
});

export default styles;