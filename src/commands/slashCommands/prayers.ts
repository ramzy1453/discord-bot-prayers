import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../../@types/command";
import { CommandTypes } from "../../@types/enums";
import { getPrayersTimes } from "../../utils/prayer";

let command: Command = {
  type: CommandTypes.SlashCommand,
  data: new SlashCommandBuilder()
    .setName("prayers")
    .setDescription("Get today's prayers times")
    .setDMPermission(false),

  execute: async (_client, interaction) => {
    const prayers = await getPrayersTimes();

    await interaction.deferReply();

    const { username } = interaction.user;

    let prayersEmbed = new EmbedBuilder()
      .setTitle("** Get today's prayers times **")
      .setColor(0x00ff00)
      .setFooter({
        text: `Requested by ${username}`,
      });

    prayersEmbed.setDescription(
      Object.entries(prayers)
        .map(([prayer, time]) => `${prayer} : ${time}`)
        .join("\n")
    );

    await interaction.editReply({
      embeds: [prayersEmbed],
    });

    return true;
  },
};

export default command;
