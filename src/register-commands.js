require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
    {
        name:'embed',
        description: 'sends test embed',
    },
  {
    name: "hey",
    description: "replies with hey!",
  },
  {
    name: "ping",
    description: "pong",
  },
  {
    name: "add",
    description: "adds two numbers",
    options: [
      {
        name: "first-number",
        description: "the first number",
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: "one",
            value: 1,
          },
          {
            name: "two",
            value: 2,
          },
          {
            name: "three",
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: "second-number",
        description: "the second number",
        type: ApplicationCommandOptionType.Number,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("registering slash commands....");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.client_id,
        process.env.guild_id
      ),
      { body: commands }
    );

    console.log("slash command is register");
  } catch (error) {
    console.log(`tere was an error: ${error}`);
  }
})();
