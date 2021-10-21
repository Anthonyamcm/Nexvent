import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

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
        fontWeight: '700',
        marginTop: '5%',
        fontFamily: 'GTEestiDisplay-Medium'
    },
    stepActive: {
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#00c6ff',
        backgroundColor: '#00c6ff',
        height: 10,
        width: 20,
        marginLeft: 5
    },
    stepInactive: {
        borderRadius: 6,
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'lightGray',
        height: 10,
        width: 20,
        marginLeft: 5
    },
    stepPassed: {
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'lightGray',
        backgroundColor: 'lightGray',
        height: 10,
        width: 20,
        marginLeft: 5
    },
    stepContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 85,
        marginTop: height * 0.02,
        marginBottom: height * 0.02,
        marginLeft: -5
    },
    flagContainer: {
        width: 100,
        flexDirection: 'row',
        paddingStart: 5,
        paddingEnd: 5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tosContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: height * 0.05,
        fontFamily: 'GTEestiDisplay-Medium'
    },
    clickableText: {
        fontFamily: 'GTEestiDisplay-Medium',
        textDecorationLine: 'underline',
    },
    codeInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 250,
        alignItems: 'center',
        fontFamily: 'IBMPlexSans-Regular'
    },

    codeInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        fontFamily: 'IBMPlexSans-Regular'
    },
    pinIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 50,
    }
});

export default styles;