require("dotenv").config();
const {
  Client,
  Events,
  GatewayIntentBits,
  IntentsBitField,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});
//+++++++ status +++++++++
// let status = [
//     {
//         name:' KEN server',
//         type: ActivityType.Watching,
//     },

// ]


//+++++++ status +++++++++


client.on("ready", (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);

  const channel = readyClient.channels.cache.get("1337702958892056587");
  if (channel) {
    channel.send("work in progress");
  } else {
    console.log("Channel not found");
  }

  client.user.setActivity(
   
    {
    name:' KEN server',
    type: ActivityType.Watching,
    }
);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // console.log(interaction.commandName);

  if (interaction.commandName === "hey") {
    interaction.reply("hey!");
  }
  if (interaction.commandName === "ping") {
    interaction.reply("pong!");
  }
  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number")?.value;

    interaction.reply(`the sum is ${num1 + num2} `);
  }

  // ++++++++forEMbed+++++++++
  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("embed titel")
      .setDescription("this is embed description")
      .setColor("Random")
      .addFields(
        {
          name: "field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "field title",
          value: "some random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

//++++++++++ reaction role +++++++++++

// client.on('interactionCreate',async(interaction)=>{
//    try {
//     if(!interaction.isButton())return;
//     await interaction,deferReply({ephemeral: true}); //used for showing message to only user

//     const role = interaction.guild.roles.cache.get(interaction.customId);

//     if(!role){
//         interaction.editReply({
//             content:"i coundn't find that role",
//         });
//         return;
//     }
//     const hasRole = interaction.member.roles.cache.has(role.id);
//     if (hasRole){
//         await interaction.member.roles.remove(role);
//         await interaction.editReply(`the role${role}has been removed`);
//         return;
//     }

//     await interaction.member.roles.add(role)
//     await interaction.editReply(`the role ${role} has been added`);
//    } catch (error) {
//     consol.log(error)
//    }

// })


//++++++++++ reaction role +++++++++++

client.on('interactionCreate', async (interaction) => {
    try {
      if (!interaction.isButton()) return;
      await interaction.deferReply({ ephemeral: true });
  
      const role = interaction.guild.roles.cache.get(interaction.customId);
      if (!role) {
        interaction.editReply({
          content: "I couldn't find that role",
        });
        return;
      }
  
      const hasRole = interaction.member.roles.cache.has(role.id);
  
      if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed.`);
        return;
      }
  
      await interaction.member.roles.add(role);
      await interaction.editReply(`The role ${role} has been added.`);
    } catch (error) {
      console.log(error);
    }
  });

// client.on('messageCreate',(message)=>{
//     // if (message.content === "hello"){
//     //     message.reply('hey!');
//     // }
//     if (message.author.bot) return;
//     message.reply(message);
// })

client.login(process.env.TOKEN);
