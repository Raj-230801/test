require('dotenv').config();
const{Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});
// const gender = [
//     {
//         id: '1337995667968098354',
//         label: "male"
//     },
//     {
//         id: '1337995667968098354',
//         label: "female"
//     },
// ]

const shotGun = [
{    
    id:'1337982539775611000',
    label: 'hurricane',
},
{    
    id:'1337982604774998109',
    label: 'sparkle',
},
{    
    id:'1337982664665206875',
    label: 'arnie',
},
{    
    id:'1337982720537792622',
    label: 'cyclops',
},
{    
    id:'1337993866007023646',
    label: 'shenji',
},
]

client.on('ready',async(c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

  try {
    const channel = await client.channels.cache.get ('1219502922761637960')
    if(!channel) return;

    const row= new ActionRowBuilder();

    shotGun.forEach((role)=> {
        row.components.push(
            new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Primary)  
        )
    });
    // gender.forEach((role)=> {
    //     row.components.push(
    //         new ButtonBuilder()
    //         .setCustomId(role.id)
    //         .setLabel(role.label)
    //         .setStyle(ButtonStyle.Primary)  
    //     )
    // });

    await channel.send({
        content: 'https://cdn.discordapp.com/attachments/1228077541944721419/1229482954783199445/BackgroundEraser_20240415_202608460.jpg?ex=67a8e53b&is=67a793bb&hm=58baa8decaa596b6201c6b3c26f3a1dc00a83e51e48fc3bfb91e5416a7bb15da&',
        components: [row],
    });
    // await channel.send({
    //     content: 'https://cdn.discordapp.com/attachments/1228077541944721419/1229479241888960542/BackgroundEraser_20240415_200409323.jpg?ex=67a8e1c5&is=67a79045&hm=a4ca93a291c9ec0879a566a4822966c183b97128fe935050470412847553aaea&',
    //     components: [row],
    // });
        process.exit();
  } catch (error) {
    console.log(error)
  }
})



client.login(process.env.TOKEN);