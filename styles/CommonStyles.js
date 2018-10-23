import { StyleSheet } from 'react-native';
import Colors from './Colors';

const CommonStyles = StyleSheet.create({
    overlay: {
        backgroundColor: Colors.overlayWhite,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        borderRadius: 8,
        flexDirection: 'column',
        backgroundColor: Colors.questionBlue,
        justifyContent: 'space-between',
        width: '90%',
        height: 250,//'50%'
    },
    imageCard: {
        width: '90%',
        height: '75%',//'50%'
    },
    headerContainer: {
        borderRadius: 8,
        flexDirection: 'row',
        backgroundColor: Colors.headerGray,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 54,
        width: '100%'
    },
    headerIcon:
    {
        backgroundColor: Colors.headerGray,
        margin: 12,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 12,
        color: '#F2994A',
    },
    cardContent: {
        backgroundColor: Colors.darken,
        borderRadius: 8,
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proceedButtonText: {
        color: Colors.headerOrange,
        fontWeight: 'bold',
    },
    imageFull: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    }
});

export default CommonStyles;