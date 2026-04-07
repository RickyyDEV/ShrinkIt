import Baker from "cronbake";

const baker = Baker.create();
const dailyJob = baker.add({
  name: "daily-job",
  cron: "@every_second", // Runs daily at midnight
  callback: () => {
    console.log("Daily job executed!");
  },
});

dailyJob.start();
