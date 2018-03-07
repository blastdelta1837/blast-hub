

import {setupScuttlebot} from './scuttlebot';
import {setupDiscoveryPeer} from './discovery';
import {setupExpressApp} from './http';
import {setName} from './set-name';

const {ssbBot, ssbConf} = setupScuttlebot();
setupDiscoveryPeer({bot: ssbBot, config: ssbConf});
setupExpressApp({bot: ssbBot});
setName({bot: ssbBot});
