import { CronJob } from "cron";
import { PrayerResponse } from "../@types/prayer";
import { ColorResolvable, EmbedBuilder } from "discord.js";
import { Client } from "../base/client";

function createPrayerEmbed(prayer: string, time: string) {
  const prayerConfig = prayersConfig[prayer];
  return new EmbedBuilder()
    .setTitle(`It's ${prayer} time! : ${time}`)
    .setDescription(prayerConfig.message)
    .setColor(prayerConfig.color as ColorResolvable);
}

export async function getPrayersTimes() {
  const date = new Date();
  const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const response = await fetch(
    `https://api.aladhan.com/v1/timings/${today}?latitude=36.713086&longitude=3.179284`
  );

  const data: PrayerResponse = await response.json();

  return data.data.timings;
}

export async function setupPrayersSchedule(client: Client<boolean>) {
  let prayerJobs: CronJob[] = [];

  const channel = client.channels.cache.get(client.config.adkarChannelId);

  async function schedulePrayers() {
    prayerJobs.forEach((job) => job.stop());
    prayerJobs = [];

    const prayersTime = await getPrayersTimes();

    for (const prayer in prayersTime) {
      if (prayer === "Sunset") return;
      const [hour, minute] = prayersTime[prayer].split(":").map(Number);
      const cronExpression = `${minute} ${hour} * * *`;

      const job = new CronJob(
        cronExpression,
        () => {
          if (channel?.isTextBased()) {
            channel.send({
              embeds: [createPrayerEmbed(prayer, prayersTime[prayer])],
            });
          }
        },
        null,
        true,
        "Africa/Algiers"
      );

      job.start();

      prayerJobs.push(job);
    }
  }

  const updateJob = new CronJob(
    "0 0 * * *",
    async () => {
      console.log("Updating prayers time...");
      await schedulePrayers();
    },
    null,
    true,
    "Africa/Algiers"
  );

  updateJob.start();

  await schedulePrayers();

  console.log("Setup cron jobs for prayers...")
}

const prayersConfig: Record<string, { message: string; color: string }> = {
  Fajr: {
    message:
      "It's time for Fajr prayer. Start your day with worship and blessings.",
    color: "#f1c40f",
  },
  Sunrise: {
    message: "Sunrise has occurred. It's no longer permissible to pray Fajr.",
    color: "#e67e22",
  },
  Dhuhr: {
    message: "It's time for Dhuhr prayer. Don't miss the noon obligation.",
    color: "#3498db",
  },
  Asr: {
    message: "It's time for Asr prayer. Perform your afternoon duty to Allah.",
    color: "#e74c3c",
  },

  Maghrib: {
    message: "It's time for Maghrib prayer. Pray before the sky darkens.",
    color: "#2ecc71",
  },
  Isha: {
    message: "It's time for Isha prayer. Complete your day with worship.",
    color: "#34495e",
  },
  Imsak: {
    message:
      "Stop eating or drinking in preparation for Fajr and fasting (Siyyam).",
    color: "#95a5a6",
  },
  Midnight: {
    message:
      "It's Islamic midnight. Reflect on your deeds and seek forgiveness.",
    color: "#1abc9c",
  },
  Firstthird: {
    message:
      "It's the first third of the night. An excellent time for Quran recitation.",
    color: "#16a085",
  },
  Lastthird: {
    message:
      "It's the last third of the night. Pray Tahajjud and seek Allah's mercy.",
    color: "#27ae60",
  },
};
