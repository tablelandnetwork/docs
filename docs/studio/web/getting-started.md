---
title: Getting started
description: Learn how to login in and set up your first project.
keywords:
  - studio
---

When using the [Studio](https://studio.tableland.xyz/), the first step is to connect, login, and create a team. This will allow you to create projects and deploy tables to supported EVM chains. Note that by default, _personal_ teams are created, which can only be accessed by you. If you'd like to create collaborative teams, you'll need to create a new team and [invite others to collaborate](/studio/web/collaborate) on projects within that team.

import singIn from "@site/static/assets/studio/1_sign-in.png";
import singInSig from "@site/static/assets/studio/2_sign-in-sig.png";
import createUsername from "@site/static/assets/studio/3_create-username.png";
import teamLanding from "@site/static/assets/studio/4_user-team-landing.png";
import createProject from "@site/static/assets/studio/5_create-project.png";

## Connect, sign in, & create a team

1. Start by going to the [Studio](https://studio.tableland.xyz/) in your browser. You'll go through a process of connecting your wallet and signing up with a username/email—this will create a _personal_ team by default.
2. In the top right corner, click the **Connect Wallet** button. Once connected, the button should now show **Sign In**, along with the connected wallet address.

   <img src={singIn} width='80%'/>

3. Click **Sign In**, which will open a popup model to create a username and email address—submit these once complete. Note that first, this will prompt you to sign a message—no transaction fees are required here, it’s just a signature!

  <div className="row margin-bottom--lg">
  <div className="col">

  <img src={singInSig} width='100%'/>

  </div>

  <div className="col">

  <img src={createUsername} width='100%'/>

  </div>
  </div>

4. You should now have a username and default _personal_ team created, giving you a landing page that will let you create projects. If you'd like to create collaborative projects, this will require you to create a **New Team**, located in the top left corner.

## Create a project

Now that you've done the initial setup steps, you're ready to start building. You should be on the landing page, which will show you a list of projects. If you haven't created any yet, you'll see a button to **New Project**.
—let's begin!

1. On the landing page, click **New Project** in the top right corner.
   <img src={teamLanding} width='80%'/>
2. This will bring you to a page where you can enter in project information, including the name and description— we'll call our project "starter" and the click **Submit** to set this project up for deployment.

## Next steps

With a team and project in place, you now have the necessary framework to create and interact with tables!
