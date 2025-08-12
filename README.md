# Swift
Swift is a multi-purpose discord bot designed for niche servers.

## Foreword

Swift was initially designed as a university project to help me understand JavaScript better. It has since become larger-scope than anticipated, and as such, its been practical to treat this as a professional project. This would mean documenting each step of the process, the use of version control, as well as a manual for users who wish to incorporate Swift into their Discord Servers.

While there still is a long way to go until Swift is production ready, you can still observe progress on the project through this GitHub repository.

Additionally, below is a list of commands for operating Swift.

## Command List

### 🎲 Fun

| Command | Description | Usage | Permissions |
| --- | --- | --- | --- |
| `/flip` | Flips a coin. | 
| `/roll` | Rolls a dice. |
| `/dadjoke` | Tells a dad joke. They're all terrible. |
| `/reddit` | Retrieves a random post from reddit from a given subreddit. | `/reddit <subreddit>` |
| `/level` | Shows a breakdown of level ranges for Souls games. | `/level <game> [level]` |

### 🎵 Music

| Command | Description | Usage | Permissions |
| --- | --- | --- | --- |
| `/play` | Plays a song. The search query can either be in the form of keywords or a url. | 
| `/pause` | Pauses the current song. |
| `/resume` | Resumes the current song. |
| `/stop` | Stops the music player. |
| `/skip` | Skips the current song. |
| `/queue` | Displays the song queue. |

### 🛡️ Moderation

| Command | Description | Usage | Permissions |
| --- | --- | --- | --- |
| `/role` | Shows role info. Can also be used to assign/revoke roles. | `/role info <role>`, `/role add <role> [member]`, `/role remove <role> [member]` | | `ManageRoles` |
| `/ban` | Bans a member. | `/ban <user>` | | `BanMembers` |
| `/unban` | Unbans a previously banned user. | `/unban <user>` | `BanMembers` |
| `/banlist` | Shows a list of banned users. | | `BanMembers` |
| `/kick` | Kicks a member. | `/kick <user>` | `KickUser` |
| `/timeout` | Times a member out for a specified duration (in minutes). | `/timeout <user> [duration]` | `MuteMembers` |

### 🛠️ Utility

| Command | Description | Usage | Permissions |
| --- | --- | --- | --- |
| `/server` | Shows server info. | 
| `/stats` | Shows a breakdown of Swift's statistics. |
| `/who` | Gets info on a user. | `/who <user>` |
| `/git` | Gets info on a GitHub user/repository. | `/git who <user>`, `/git repo <repository>` |
