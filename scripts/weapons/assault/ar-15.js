// Create an AR-15
const ar15 = new Gun();

// Create parts
const rifle = new GunPart('Rifle', 'Main firearm component', 'rifle');
const upperReceiver = new GunPart('Upper Receiver', 'Upper portion of the rifle', 'receiver');
const barrel = new GunPart('Barrel', 'Guides projectile', 'barrel', ['upper_receiver']);
const boltCarrierGroup = new GunPart('Bolt Carrier Group', 'Moves and loads ammunition', 'bolt_carrier_group', ['upper_receiver']);
const bolt = new GunPart('Bolt', 'Locks and unlocks breech', 'bolt', ['bolt_carrier_group']);
const firingPin = new GunPart('Firing Pin', 'Strikes primer', 'firing_pin', ['bolt']);
const camPin = new GunPart('Cam Pin', 'Rotates bolt', 'cam_pin', ['bolt']);
const boltCarrier = new GunPart('Bolt Carrier', 'Holds and moves bolt', 'bolt_carrier', ['bolt_carrier_group']);
const chargingHandle = new GunPart('Charging Handle', 'Charges rifle', 'charging_handle', ['upper_receiver']);
const handguard = new GunPart('Handguard', 'Protects shooter\'s hand from heat', 'handguard', ['upper_receiver']);
const handguardRail = new GunPart('Handguard Rail', 'Allows attachment of accessories', 'handguard_rail', ['handguard']);
const handguardCovers = new GunPart('Handguard Covers', 'Provides grip and insulation', 'handguard_cover', ['handguard']);
const gasSystem = new GunPart('Gas System', 'Regulates gas for cycling', 'gas_system', ['upper_receiver']);
const gasBlock = new GunPart('Gas Block', 'Directs gas into tube', 'gas_block', ['gas_system']);
const gasTube = new GunPart('Gas Tube', 'Channels gas to action', 'gas_tube', ['gas_system']);
const gasKey = new GunPart('Gas Key', 'Transfers gas to bolt carrier', 'gas_key', ['bolt_carrier_group']);
const lowerReceiver = new GunPart('Lower Receiver', 'Lower portion of the rifle', 'receiver');
const triggerAssembly = new GunPart('Trigger Assembly', 'Controls firing sequence', 'trigger_assembly', ['lower_receiver']);
const trigger = new GunPart('Trigger', 'Initiates firing sequence', 'trigger', ['trigger_assembly']);
const hammer = new GunPart('Hammer', 'Strikes firing pin', 'hammer', ['trigger_assembly']);
const triggerSprings = new GunPart('Trigger Springs', 'Provides tension for trigger', 'trigger_springs', ['trigger_assembly']);
const hammerSprings = new GunPart('Hammer Springs', 'Provides tension for hammer', 'hammer_springs', ['trigger_assembly']);
const magazine = new GunPart('Magazine', 'Stores and feeds ammunition', 'magazine', ['lower_receiver']);
const magazineBody = new GunPart('Magazine Body', 'Holds ammunition', 'magazine_body', ['magazine']);
const magazineSpring = new GunPart('Magazine Spring', 'Feeds ammunition', 'magazine_spring', ['magazine']);
const magazineFollower = new GunPart('Magazine Follower', 'Indicates ammunition level', 'magazine_follower', ['magazine']);
const stock = new GunPart('Stock', 'Supports rifle against shoulder', 'stock', ['lower_receiver']);
const stockBody = new GunPart('Stock Body', 'Main portion of stock', 'stock_body', ['stock']);
const stockBuffer = new GunPart('Stock Buffer', 'Absorbs recoil', 'stock_buffer', ['stock']);
const stockSpring = new GunPart('Stock Spring', 'Returns stock to firing position', 'stock_spring', ['stock']);

// Attach parts to each other
rifle.attach(upperReceiver);
upperReceiver.attach(barrel);
upperReceiver.attach(boltCarrierGroup);
upperReceiver.attach(chargingHandle);
upperReceiver.attach(handguard);
upperReceiver.attach(gasSystem);
boltCarrierGroup.attach(bolt);
boltCarrierGroup.attach(firingPin);
boltCarrierGroup.attach(camPin);
boltCarrierGroup.attach(boltCarrier);
handguard.attach(handguardRail);
handguard.attach(handguardCovers);
gasSystem.attach(gasBlock);
gasSystem.attach(gasTube);
gasSystem.attach(gasKey);
rifle.attach(lowerReceiver);
lowerReceiver.attach(triggerAssembly);
triggerAssembly.attach(trigger);
triggerAssembly.attach(hammer);
triggerAssembly.attach(triggerSprings);
triggerAssembly.attach(hammerSprings);
lowerReceiver.attach(magazine);
magazine.attach(magazineBody);
magazine.attach(magazineSpring);
magazine.attach(magazineFollower);
lowerReceiver.attach(stock);
stock.attach(stockBody);
stock.attach(stockBuffer);
stock.attach(stockSpring);

// Add parts
ar15.addPart(rifle);

// Assemble
console.log(ar15.assemble());
