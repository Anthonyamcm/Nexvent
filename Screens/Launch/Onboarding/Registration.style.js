import { StyleSheet , Dimensions} from 'react-native';
import * as appColors from '../../../Components/colors/appColor'

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({

    mainContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        marginTop: 30
    },
    title: {
        textAlign: 'left',
        fontSize: 24,
        marginTop: 10,
        fontFamily: 'GTEestiDisplay-Medium'
    },
    inputTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontFamily: 'GTEestiDisplay-Medium',
        color: appColors.grey4,
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