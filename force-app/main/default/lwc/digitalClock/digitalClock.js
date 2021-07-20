/*
 * @author: Gurjit Singh
 * @date: 19-May-2021
 * @group: Clock
 * @description: Renders one clock with all the buttons on the page,
 *               iterating this component on parent digitalClockContainer 
 *               component to render multiple clocks.
 */

import { LightningElement, track, api } from 'lwc';
import { getClockData, getMonthNameFromIndex, getDayNameFromIndex } from './clockData';


const ONE_SECOND = 1000;
const FIVE_SECONDS = ONE_SECOND * 5;
const ONE_MINUTE = ONE_SECOND * 60;
const CLOCK_DIGIT_COLOR = '#2181ad';
const CLOCK_BACKGROUND_COLOR = 'black';

export default class DigitalClock extends LightningElement {

    // private track properties whcih needs to used in public api setter;
    @track adjustClock;

    //public api properties
    @api
    get clockData() {
        this.adjustClock;
    }
    set clockData(value) {
        this.adjustClock = { ...value };
        this.adjustTimezoneChange();
    }

    @api timeZoneOptions;

    // private track properties

    @track dotStyle = `${CLOCK_DIGIT_COLOR}`;
    @track adjustFirstDigit;
    @track adjustSecondDigit;
    @track adjustThirdDigit;
    @track adjustFourthDigit;
    @track show24HourClock;
    @track showClockProperties = false;
    @track dateTimeNow = new Date();
    @track selectedTimeZone;
    @track dateToday;
    @track amPm = 'AM';
    @track showSpinner;

    connectedCallback() {

        this.adjustClockDigits(this.dateTimeNow);
        this.blinkColon();

        setInterval(() => {
            //Calling this method here to intialize the Date object again to update the time.
            this.refreshDate();
            this.adjustClockDigits(this.dateTimeNow);

        }, FIVE_SECONDS);
    }

    // Handles the colon blink which seprates hour with minutes on the clock
    blinkColon() {
        setInterval(() => {
            this.dotStyle = this.dotStyle == `background: ${CLOCK_BACKGROUND_COLOR};` ? `background: ${CLOCK_DIGIT_COLOR};` :
                `background: ${CLOCK_BACKGROUND_COLOR};`;
        }, ONE_SECOND);
    }

    // Updates the clock time in every interval.
    adjustClockDigits(DateTime) {

        let hour = DateTime.getHours();
        let minutes = DateTime.getMinutes();
        if (hour > 12 && !this.show24HourClock) {
            hour -= 12;
            this.amPm = 'PM';
        } else {
            this.amPm = 'AM'
        }

        let hourString = hour.toString();
        let minutesString = minutes.toString();

        let firstDigit = hourString.charAt(1) ? hourString.charAt(0) : '0';
        let secondDigit = hourString.charAt(1) ? hourString.charAt(1) : hourString.charAt(0);
        let thirdDigit = minutesString.charAt(1) ? minutesString.charAt(0) : '0';
        let fourthDigit = minutesString.charAt(1) ? minutesString.charAt(1) : minutesString.charAt(0);

        let clockData = getClockData(CLOCK_DIGIT_COLOR, CLOCK_BACKGROUND_COLOR);

        this.adjustFirstDigit = clockData[firstDigit];
        this.adjustSecondDigit = clockData[secondDigit];
        this.adjustThirdDigit = clockData[thirdDigit];
        this.adjustFourthDigit = clockData[fourthDigit];

    }

    //show hide clock properties on the page
    handleClockProperties() {
        this.showSpinner = true;

        setTimeout(() => {
            this.showClockProperties = this.showClockProperties ? false : true;
            this.showSpinner = false;
        }, 100);
    }

    // when user clicks on cancel button of clock properties.
    handleCancelClockProperties() {
        this.showClockProperties = false;
    }

    // when user click on save button of clock properties dispatch an event to parent component
    // to update the record
    handleSaveClockProperties() {
        this.adjustTimezoneChange();
        this.showClockProperties = false;
        this.dispatchEvent(new CustomEvent('updateclock', {
            detail: this.adjustClock
        }))
    }

    //Do as the name suggest
    handle24HourClock(event) {
        this.show24HourClock = event.target.checked;
        this.adjustClockDigits(this.dateTimeNow);
    }

    //Add a clock with a default settings
    handleAddClock() {
        this.dispatchEvent(new CustomEvent('addclock', {
            detail: this.adjustClock
        }));

    }

    //Remove the clock by dispatching a custom event to parent component.
    handleRemoveClock() {
        this.dispatchEvent(new CustomEvent('removeclock', {
            detail: this.adjustClock
        }));
    }

    //Adjust the time as the timezone
    adjustTimezoneChange() {

        this.adjustClock.Time_Zone__c = this.selectedTimeZone ? this.selectedTimeZone : this.adjustClock.Time_Zone__c;
        let selectedTimeZoneLabel = this.timeZoneOptions.find(({ value }) => value == this.adjustClock.Time_Zone__c).label;
        let regEx = /\)(.*)\(/i;
        this.adjustClock.Time_Zone_Label__c = selectedTimeZoneLabel.match(regEx)[1];
        this.refreshDate();
        this.adjustClockDigits(this.dateTimeNow);
    }

    //intialize the date object on every interval.
    refreshDate() {
        this.dateTimeNow = new Date(new Date().toLocaleString('en-US', { timeZone: this.adjustClock.Time_Zone__c }));
        this.dateToday = `${getDayNameFromIndex(this.dateTimeNow.getDay())} ${this.dateTimeNow.getDate()}-${getMonthNameFromIndex(this.dateTimeNow.getMonth())}-${this.dateTimeNow.getFullYear()}`

    }

    //updates the time zone when user change the timezone value from the picklist.
    handleTimezoneChange(event) {
        this.selectedTimeZone = event.target.value;
    }
}