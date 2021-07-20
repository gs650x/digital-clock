/*
 * @author: Gurjit Singh
 * @date: 19-May-2021
 * @group: Clock
 * @description: Apex controller for digitalClockContainer LWC page
 * @Test class: ClockControllerTest
 */
public without sharing class ClockController {

	/*******************************************************************
	   @description : Query the clock records associated with the logged in user.
	   @param   : NA
	   @return  : Array of clock records.
	 ********************************************************************/
	@AuraEnabled
	public static Clock__c[] getClocks(){

		Clock__c[] clocksArray  = new Clock__c[0];

		clocksArray = getClocksArray();

		if(clocksArray.isEmpty()) {
			Clock__c clock = createDefaultClock();
			clocksArray.add(clock);
		}

		return clocksArray;
	}

	/*******************************************************************
	   @description : Create a clock record with salesforce user's time zone and default label.
	   @param   : NA
	   @return  : Single clock record.
	 ********************************************************************/
	private static Clock__c createDefaultClock() {

		Clock__c clock = new Clock__c();
		clock.user__c  = UserInfo.getUserId();
		clock.show_24_Hour_Clock__c = false;
		clock.Time_Zone__c          = UserInfo.getTimeZone().getID();
		clock.Time_Zone_Label__c    = 'default';
		insert clock;
		return clock;
	}

	//query selector method on clock object.
	private static Clock__c[] getClocksArray() {
		return [SELECT Id, Name, show_24_Hour_Clock__c,Time_Zone__c, Time_Zone_Label__c,
		        User__c FROM Clock__c WHERE User__c =: UserInfo.getUserId() order by createdDate];
	}
}