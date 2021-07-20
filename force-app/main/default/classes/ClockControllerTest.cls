/*
 * @author Gurjit Singh
 * @date 20-May-2021
 * @group Clock
 * @description Test class for apex controller ClockController.
 */
@isTest
public without sharing class ClockControllerTest {

	@isTest static void testClock() {
		Clock__c[] clocks  = ClockController.getClocks();
		System.assertEquals(1, clocks.size());
	}
}