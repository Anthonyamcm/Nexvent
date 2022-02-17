import React from 'react';
import { View, Text} from 'react-native';
import CustomButton from '../Button/Button';
import Calendar from "react-native-calendar-range-picker";
import styles from './Modal.style';

class CalendarContainer extends React.Component {

    render(){

        return(
            <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 15, marginVertical: 50, borderRadius: 32 }}>

                <View style={styles.modalHeader}>
                    <Text style={styles.modalText}>{'Calendar'}</Text>
                </View>
                    
                <View style={{paddingVertical: 15}}>
                    <Calendar
                            disabledBeforeToday={true}
                            startDate={this.props.startDate}
                            endDate={this.props.endDate}
                            onChange={(startDate, endDate) => {this.props.onChange(startDate, endDate)}}
                            isMonthFirst={true}
                            style={{
                                monthNameText: {fontFamily: 'GTEestiDisplay-Medium'},
                                dayNameText: {fontFamily: 'GTEestiDisplay-Medium'},
                                dayText: {fontFamily: 'GTEestiDisplay-Medium'},
                                holidayColor: 'black',
                                selectedDayBackgroundColor: '#0072ff'
                            }}/>
                </View>

                <View style={styles.modalFooter}>
                    <CustomButton
                        title='Save'
                        shouldHaveGradient={true}
                        titleFontSize={24}
                        isLoading={this.props.isSaving}
                        onPress={this.props.save}
                        style={{shadowColor: "#0072ff",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.5,
                                shadowRadius: 3.84,
                                elevation: 5,
                                position: 'absolute',
                                bottom: 15,
                                alignSelf: 'center'
                                }}/>
                    </View>
            </View>
            
        )
    }
}

export default CalendarContainer