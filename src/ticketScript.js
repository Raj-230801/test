require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
client.once('ready', (readyClient) => {
    console.log('Ready!');
    const channel = readyClient.channels.cache.get("1337764268384456856");
  if (channel) {
    channel.send("<@927185860821147709> hi \n how i assist you");
  } else {
    console.log("Channel not found");
  }
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'create_ticket') {
        const guild = interaction.guild;
        if (!guild) {
            return interaction.reply({ content: 'This command can only be used in a server.', ephemeral: true });
        }
        const member = interaction.member;
        const channelName = `ticket-${member.user.username}`; // Customize channel name
        const categoryId = process.env.TICKET_CATEGORY_ID; // Set your category ID in .env
        try {
            const channel = await guild.channels.create({
                name: channelName,
                type: 0, // Text channel
                parent: categoryId, // Place in the specified category
                permissionOverwrites: [
                    {
                        id: guild.id, // Everyone
                        deny: ['ViewChannel'], // Deny viewing by default
                    },
                    {
                        id: member.id, // Ticket creator
                        allow: ['ViewChannel', 'SendMessages', 'AttachFiles', 'EmbedLinks', 'AddReactions', 'UseExternalEmojis'], // Allow permissions
                    },
                    {
                        id: client.user.id, // Bot
                        allow: ['ViewChannel', 'SendMessages'],
                    },
                    // Add staff roles here if needed
                ],
            });

            const embed = new EmbedBuilder()
                .setTitle('New Ticket Created!')
                .setDescription(`Your ticket has been created in <#${channel.id}>. Please describe your issue.`)
                .setColor(0x0099FF);

            await interaction.reply({ embeds: [embed], ephemeral: true }); // Only visible to the user who created ticket


            const ticketEmbed = new EmbedBuilder()
                .setTitle('Welcome to your Ticket!')
                .setDescription(`Hello ${member}, \n\nPlease describe your issue, and our support team will assist you shortly.`)
                .setColor(0x00FF00);

            const closeButton = new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder().addComponents(closeButton);

            channel.send({ embeds: [ticketEmbed], components: [row] });

        } catch (error) {
            console.error('Error creating ticket:', error);
            interaction.reply({ content: 'There was an error creating the ticket. Please try again later.', ephemeral: true });
        }
    }

    if (interaction.customId === 'close_ticket') {
        const channel = interaction.channel;

        if (!channel || channel.type !== 0) {
            return interaction.reply({ content: 'This command can only be used in a ticket channel.', ephemeral: true });
        }

        const member = interaction.member;
        const channelName = channel.name;

        if (!channelName.startsWith('ticket-')) {
            return interaction.reply({ content: 'This command can only be used in a ticket channel.', ephemeral: true });
        }


        try {

            const embed = new EmbedBuilder()
                .setTitle('Ticket Closed')
                .setDescription(`This ticket has been closed by ${member}.`)
                .setColor(0xFF0000);

            await channel.send({ embeds: [embed] });

            setTimeout(async () => {
                await channel.delete();
            }, 5000); // Delete the channel after 5 seconds

        } catch (error) {
            console.error('Error closing ticket:', error);
            interaction.reply({ content: 'There was an error closing the ticket. Please try again later.', ephemeral: true });
        }
    }
});

client.login(process.env.TOKEN);


// Command to create the ticket button (Run this once)
client.on('messageCreate', async message => {
    if (message.content === '!createTicketButton') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('create_ticket')
                    .setLabel('Create Ticket')
                    .setStyle(ButtonStyle.Primary)
            );

        message.channel.send({ content: 'Click the button below to create a support ticket:', components: [row] });
    }
});