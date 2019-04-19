const ical = require('ical-generator');
const moment = require('moment');

export default class MainGeneretor {
    constructor() {

    }



    start() {
        const cal = ical({
            domain: 'sebbo.net',
            prodId: {company: 'superman-industries.com', product: 'ical-generator'},
            name: 'My Testfeed',
            timezone: 'Asia/Yakutsk'
        });
         
    
          cal.domain('localhost:3000');
     
          // … or get values
          cal.domain(); // --> "sebbo.net"
           
          // create a new event
          const event = cal.createEvent({
              start: moment(),
              end: moment().add(1, 'hour'),
              timestamp: moment(),
              summary: 'My Event',
              organizer: 'Sebastian Pekarek <mail@example.com>'
          });
           
          // like above, you can also set/change values like this…
          event.summary('My Super Mega Awesome Event');
           
          // get the iCal string
          cal.toString(); // --> "BEGIN:VCALENDAR…"
           
           
          // You can also create events directly with ical()
          ical({
              domain: 'localhost:3000',
              prodId: '//superman-industries.com//ical-generator//EN',
              events: [
                  {
                      start: moment(),
                      end: moment().add(1, 'hour'),
                      timestamp: moment(),
                      summary: 'My Event',
                      organizer: 'Sebastian Pekarek <mail@example.com>'
                  }
              ]
          }).toString();
          window.open( "data:text/calendar;charset=utf8," + escape( cal ) );
    }
}