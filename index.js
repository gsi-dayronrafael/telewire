require("dotenv").config;
const Bot = require("node-telegram-bot-api");
const {
  INPUT_STATUS: ipstatus,
  INPUT_TOKEN: tgtoken, //Telegram api token
  INPUT_CHAT: chatid, // Telegram Chat ID
  INPUT_IU_TITLE: ititle, // Issue title
  INPUT_IU_NUM: inum, // Issue Number
  INPUT_IU_ACTOR: iactor, // Issue made by
  INPUT_IU_BODY: ibody, // Issue Body
  INPUT_PR_NUM: pnum, // PR Number
  INPUT_PR_STATE: prstate, // PR Opened, reponed or closed
  INPUT_PR_TITLE: ptitle, // PR Title
  INPUT_PR_BODY: pbody, // Body of the PR
  GITHUB_EVENT_NAME: ghevent, // Name of the trigger event
  GITHUB_REPOSITORY: repo, // Repository the trigger was made from
  GITHUB_ACTOR: ghactor, // User who triggered the action
  GITHUB_SHA: sha, // Commit ID
  GITHUB_WORKFLOW: ghwrkflw, // Workflow Name
} = process.env;

const bot = new Bot(tgtoken);

const evresp = (gevent) => {
  switch (gevent) {
    case "pull_request":
      return `
<h1>El siguiente PR se mezcló correctamente en beta-release:</h1>

PR estado :     ${prstate}         
<b>PR #:</b>    ${pnum}        
PR título:      ${ptitle}      
PR descr:       ${pbody}      
PR por:         ${ghactor}

Por favor actualize las ramas: develop y staging, inmediatamente!!!
        
[Enlace al repo ](https://github.com/${repo}/)`;
  }
};
const output = evresp(ghevent);
bot.sendMessage(chatid, output, { parse_mode: "HTML" });
