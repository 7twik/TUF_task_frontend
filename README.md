# 7's IDE
<h2>Backend Link: <a href="https://github.com/7twik/TUF_task_backend">https://github.com/7twik/TUF_task_backend</a></h2>
<h1>What I have done? </h1><br/>
I made the IDE page where users can enter their username, choose language and write code and run it..<br/><br/>
While running the code I sent the data to judge0 api which returns a token, then I again sent the token to extract the output which might even result in pending or it might even be compilation error or be a simple output.<br/><br/>
If it comes as pending then I have to request again in a recursive way after 5 second timer <br /><br/>
While all this is happening I made a loader as the response time was a bit too high<br /><br/>
Then I showed the output in another field and presented the submit button as well on clicking which it will get stored in the mysql db<br/>
In backend i am fetching mysql data on a cron job and setting it to a variable in redis server which acts as a wall before my mysql db as it reduces the no. of reads thereby reducing cost<br />
the redis server updates itself after every 1 minute, which can be changed according to what i set the cron job code to be. I set it to 1 minute so that the reviewer of the task can review it immediately and doesn't have to wait<br /><br/>
Next coming back to the frontend I fetched the data from the api and showed it in another route named /history<br /><br />
Also the pages are responsive< br/>

<h2>How to run the project in local environment?<br/></h2>
step 1: git clone https://github.com/7twik/TUF_task_backend.git <br/>
step 2: cd into the folder<br/>
step 3: npm install<br/>
step 4: npm run dev <br/>
