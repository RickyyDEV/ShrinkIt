import Baker from "cronbake";

// Create a new Baker instance
const baker = Baker.create();

const dailyJob = baker.add({
  name: "daily-job",
  cron: "@every_second", // Runs daily at midnight
  callback: () => {
    console.log("Daily job executed!");
  },
});

baker.bakeAll();
