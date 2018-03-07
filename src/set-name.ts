
import pull = require('pull-stream');
import {Scuttlebot} from './scuttlebot';

interface Options {
  bot:
    Pick<Scuttlebot, 'id'> &
    Pick<Scuttlebot, 'whoami'> &
    Pick<Scuttlebot, 'createUserStream'> &
    Pick<Scuttlebot, 'publish'>;
}
export function setName({bot} : Options) {
  const aboutName: string = process.env.HOST;

  if (!aboutName) {
    console.error("The HOST env variable must be set in order to update the profile name");
    process.exit(1);
  }
  bot.whoami((err: string, {id} : {id: string}) => {
    pull(
      bot.createUserStream({id}),
      pull.filter((msg: any) => msg.value.content.type === "about"),
      pull.collect((err:string, msgs: [any]) => {
        if (msgs.length == 0) {
          bot.publish({
            type: 'about',
            about: id,
            name: aboutName,
          }, (err: string, info: string) => {
            if (err) {
              console.error("Could not update profile name!", err);
            } else {
              console.log("Profile name updated.");
            }
          });
        } else {
          console.log("About message already published!");
        }
      })
    )
  });
}
