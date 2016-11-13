import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as Identicon from 'identicon.js';
import * as moment from 'moment';
import * as md5 from 'blueimp-md5';

interface Message {
  from: string;
  when: Date | string;
  message: string;
  icon?: string;
}

@Component({
  selector: 'ds-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  private messages: Message[] = [{
    from: 'Watwat Kekek',
    when: new Date(),
    message: 'Well hi there',
  }, {
    from: 'BurBur Wahoo',
    when: new Date(),
    message: 'Hello you too',
  }, {
    from: 'Watwat Kekek',
    when: new Date(),
    message: 'So whats up?',
  }, {
    from: 'BurBur Wahoo',
    when: new Date(),
    message: 'Really looooooooooooong message for you Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub.',
  }, {
    from: 'BurBur Wahoo',
    when: new Date(),
    message: 'Walking catfish; Spanish mackerel sandroller delta smelt zebra pleco whale catfish lemon sole barramundi hog sucker orbicular velvetfish." Triggerfish slipmouth goatfish flagblenny mako shark brown trout mudminnow mahseer; tripletail mahseer Oriental loach cardinalfish alligatorfish beardfish powen cod icefish.',
  }, {
    from: 'Watwat Kekek',
    when: new Date(),
    message: 'Buri deepwater flathead tonguefish, "banded killifish, rough scad springfish tadpole fish." Jewel tetra; barred danio swampfish great white shark monkfish tui chub Sevan trout, bent-tooth spotted danio, North American freshwater catfish jewfish. Boxfish armoured catfish northern sea robin Rattail mora, "loach; buffalofish bigmouth buffalo pineconefish, California flyingfish," capelin discus. Garpike featherback long-finned char deep sea anglerfish gizzard shad catla, barbeled dragonfish crappie Owens pupfish? Bocaccio basking shark upside-down catfish popeye catafula yellowtail snapper rivuline rudderfish southern smelt daggertooth pike conger bluntnose knifefish.',
  }, {
    from: 'BurBur Wahoo',
    when: new Date(),
    message: 'Warty angler dorado redmouth whalefish, pearl perch sharksucker boarfish sandperch squaretail sandperch Steve fish? Yellowtail clownfish wolf-eel; Colorado squawfish elephant fish killifish jewelfish pilot fish Pacific trout, longneck eel South American darter. California flyingfish peamouth tarwhine beaked salmon crocodile shark surf sardine, "sea lamprey treefish ricefish." Wrymouth anglerfish piranha crocodile shark Rio Grande perch coolie loach wrymouth; smalleye squaretail tubeblenny snake mackerel moonfish; sleeper skipping goby longneck eel, yellowfin croaker banded killifish! Three-toothed puffer halosaur, "Redfish longfin smelt striped burrfish longfin escolar pineconefish lagena, gibberfish river loach Quillfish combtooth blenny."',
  }, {
    from: 'Watwat Kekek',
    when: new Date(),
    message: 'Olive flounder slender barracudina beardfish orbicular batfish bonefish? Driftwood catfish lizardfish stickleback black bass; southern flounder jewelfish; halfmoon silver hake kaluga. Anchovy, "Japanese eel bass squirrelfish longjaw mudsucker eagle ray mud cat trench angelfish rivuline waryfish!"',
  }, {
    from: 'BurBur Wahoo',
    when: new Date(),
    message: 'Amago Modoc sucker mummichog; atka mackerel: trout-perch longneck eel pencil catfish roundhead New Zealand smelt. Cavefish southern hake slimy sculpin; plaice Redfin perch tarpon, kingfish batfish.',
  }]

  private dstructTime;

  constructor() {
    this.dstructTime = 5;

    _.forEach(this.messages, (message: Message) => {
      const hash = md5(message.from);
      const data = new Identicon(hash).toString();
      message.icon = `data:image/png;base64,${data}`;
      message.when = moment(message.when).calendar();
    });
  }
}
