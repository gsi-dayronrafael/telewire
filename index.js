require("dotenv").config
const Bot = require('node-telegram-bot-api');
const {
    INPUT_STATUS: ipstatus,
    INPUT_TOKEN: tgtoken,//Telegram api token
    INPUT_CHAT: chatid,// Telegram Chat ID
    INPUT_IU_TITLE: ititle,// Issue title
    INPUT_IU_NUM: inum,// Issue Number
    INPUT_IU_ACTOR: iactor,// Issue made by
    INPUT_IU_BODY: ibody,// Issue Body
    INPUT_PR_NUM: pnum,// PR Number
    INPUT_PR_STATE: prstate,// PR Opened, reponed or closed
    INPUT_PR_TITLE: ptitle,// PR Title
    INPUT_PR_BODY: pbody,// Body of the PR
    GITHUB_EVENT_NAME: ghevent,// Name of the trigger event
    GITHUB_REPOSITORY: repo,// Repository the trigger was made from
    GITHUB_ACTOR: ghactor,// User who triggered the action
    GITHUB_SHA: sha,// Commit ID
    GITHUB_WORKFLOW: ghwrkflw// Workflow Name
} = process.env;

const bot = new Bot(tgtoken)

const evresp = (gevent) => {
    switch (gevent) {           
        case "pull_request":
            return `
🔃🔀🔃🔀🔃🔀

The Following PR was sucessfully merge to beta-release:

PR ${prstate} 
        
PR Number:      ${pnum}        
PR Title:       ${ptitle}      
PR Body:        *${pbody}*      
PR By:          ${ghactor}

Please consider to sync develop and staging branches with merged commits right away.
        
[Link to Repo ](https://github.com/${repo}/)
        
        default:
            return `
⬆️⇅⬆️⇅
            
ID: ${ghwrkflw}
        
Action was a *${ipstatus}!*
        
\`Repository:  ${repo}\` 
        
On:          *${ghevent}*
        
By:            *${ghactor}* 
        
Tag:        ${process.env.GITHUB_REF}
        
[Link to Repo ](https://github.com/${repo}/)
            `
    }
}
const output = evresp(ghevent)
bot.sendMessage(chatid,output,{parse_mode : "Markdown"})
