/*
 * @author: Gurjit Singh
 * @date: 19-May-2021
 * @group: Clock
 * @description: Iterate on digitalClock page as per the number of clock records queried
 *               from server or on this page.
 */

import { LightningElement, track, wire } from 'lwc';
import GET_CLOCKS from '@salesforce/apex/ClockController.getClocks';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { updateRecord, createRecord, deleteRecord } from 'lightning/uiRecordApi';
import CLOCK_OBJECT from '@salesforce/schema/Clock__c';
import SHOW24CLOCK_FIELD from '@salesforce/schema/Clock__c.show_24_Hour_Clock__c';
import TIMEZONE_FIELD from '@salesforce/schema/Clock__c.Time_Zone__c';
import TIMEZONE_LABEL_FIELD from '@salesforce/schema/Clock__c.Time_Zone_Label__c';
import CLOCK_ID_FIELD from '@salesforce/schema/Clock__c.Id';
import USER_FIELD from '@salesforce/schema/Clock__c.User__c';
import TIME_ZONE_OPTIONS from '@salesforce/schema/User.TimeZoneSidKey';
import hasClockPermission from '@salesforce/customPermission/Clock_Permission';

export default class DigitalClockApp extends LightningElement {

    @track clocksDataArray = []; //array length equals to number of clocks on the page.
    @track timeZoneOptions = [];
    @track showSpinner = true;


    get hasClockPermissions() {
        return hasClockPermission
    }

    get showClocks() {
        return (this.timeZoneOptions.length > 0 && this.clocksDataArray.length > 0)
    }

    //getting all the timezone options.
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: TIME_ZONE_OPTIONS })
    allTimeZones(result) {
        const { data, error } = result;
        if (data) {
            for (const { label, value } of data.values) {
                this.timeZoneOptions.push({
                    label,
                    value
                });
            }

        } else if (error) {
            console.log('Error loading the picklist values', JSON.stringify(error));
        }
    }

    connectedCallback() {

        //Using imperative apex over wire method becuase needs to a DML in case of no clock found.
        this.getClocksData();
    }

    // apex call to query clock records.
    getClocksData() {
        GET_CLOCKS()
            .then(clocks => {
                this.clocksDataArray = JSON.parse(JSON.stringify(clocks));
                setTimeout(() => {
                    this.showSpinner = false;
                }, 500)
            })
            .catch(error => {
                console.log(`There is an error in loading the clocks data: ${JSON.stringify(error)}`);
            });
    }

    //When user clicks on add button.
    handleAddClock(event) {
        this.showSpinner = true;
        const fields = this.populateClockFieldsForLDS(event.detail, false);
        const recordInput = { apiName: CLOCK_OBJECT.objectApiName, fields }

        // LDS to create the clock record.
        createRecord(recordInput)
            .then(() => {
                this.getClocksData();
                console.log(`A new clock created`);
            }).catch(error => console.log(`There is an error in creating the clock: ${JSON.stringify(error)}`))
    }

    //When user clicks on cross button to delete the record.
    handleRemoveClock(event) {
        const recordId = event.detail.Id;
        this.showSpinner = true;

        //LDS to delete the clock record.
        deleteRecord(recordId)
            .then(() => {
                console.log('A clock is deleted.');
                this.getClocksData();
            })
            .catch(error => console.log(`There is an error in deleting the clock recod ${JSON.stringify(error)}`));
    }

    // when user updates the clock properties and click save button.
    handleUpdateClock(event) {
        this.showSpinner = true;

        const fields = this.populateClockFieldsForLDS(event.detail, true);
        const recordInput = { fields };

        //LDS to update clock recod.
        updateRecord(recordInput)
            .then(() => {
                console.log(`clock updated`);
                this.showSpinner = false;
            })
            .catch(error => console.log(`There is an error in updating the clock record ${JSON.stringify(error)}`))
    }

    //Populating the fields for LDS. 
    populateClockFieldsForLDS(clockData, includeId) {

        console.log(JSON.stringify(clockData));

        const fields = {};
        fields[SHOW24CLOCK_FIELD.fieldApiName] = clockData.show_24_Hour_Clock__c;
        fields[TIMEZONE_FIELD.fieldApiName] = clockData.Time_Zone__c;
        fields[TIMEZONE_LABEL_FIELD.fieldApiName] = clockData.Time_Zone_Label__c;
        fields[USER_FIELD.fieldApiName] = clockData.User__c;
        if (includeId)
            fields[CLOCK_ID_FIELD.fieldApiName] = clockData.Id

        return fields;
    }
}