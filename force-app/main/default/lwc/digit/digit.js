import { LightningElement, api } from 'lwc';

export default class Digit extends LightningElement {

    @api adjustDigit; // adjust which html line should be in visible on the page
    
}