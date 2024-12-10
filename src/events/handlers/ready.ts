import { Event } from '../../@types/event';
import { setupPrayersSchedule } from "../../utils/prayer";

import figlet from 'figlet';
import chalk from 'chalk';
const event: Event<'ready'> = {
  name: 'ready',
  run: async client => {
    const text = figlet.textSync(`${client.user.displayName}`, {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      whitespaceBreak: true
    });
    
    console.log(chalk.yellow.bold(text), '\n');
    setupPrayersSchedule(client);
    return true;
  }
};

export default event;
