Selenium Testing in Browserstack
================================

Defines automated Selenium tests to run against the Scots LiDAR website.  Selenium tests can be coded in any language but our language of choice is Python.  

We currently have two kinds of automated tests:
- Functional Tests using Browserstack.  In these tests we can programatically define whatever interactions we like with the website and programatically parse the DOM to verify the results of the programmed interactions.  Browserstack runs these automated tests in a defined matrix of OS, OS version, browser and browser version.  The results can be viewed on the Browserstack website.
- Visual Regression Tests using Percy.  Each time the tests are run, screenshots are taken and compared with the screenshots from the previous run to check for any differences.  The interactions necessary to get to the screen we are interested in still need to be defined programatically in a similar way to the functional tests.  It is not possible to run these tests for different browser version/OS/OS version combinations as with Browserstack.  You just turn each browser on or off and Percy runs the test once against its latest version of each required Browser without simulating different OSs.

In an ideal world tests should be atomic, but due to the number of threads we have available with our current licence, minimising running time for pragmatic reasons needs to be prioritised.  For example, the initial JIRA task defined three example functional use cases.  Running these across the defined matrix of combinations resulted in approximately 100 individual tests which took 40+ minutes to run.  Combining all of the individual test conditions into a single "functional smoke test" to be run across the same matrix of combinations halved the total running time, so we moved to this approach.

Current limitations:
- The test conditions coded so far are examples of what we can do, not comprehensive functional test coverage of the website
- The tests are currently triggered manually from the command line, rather than running as part of a pipeline
- The functional tests are currently being run against the live website only, local developer testing needs further investigation.  (However, it is possible to point the percy tests at either a local deployment or the live site)

# .env file

Copy the provided .env.template file to create a .env file in the same directory

The inherited configuration points to the Live environment as the target for testing - amend as required

# Browserstack account

Navigate to the [Browserstack Account summary](https://www.browserstack.com/accounts/profile)

Log on using the credentials under 'Browserstack' in the JNCC Web Stack KeePASS file referenced [here](http://jncc-wiki/Restricted_Access_Pages/JNCC_KeePass)

Copy the Username and Access Key from the "Authentication and Security" section into the .env file created above

# Install Percy Client

From the root directory of the Scots LiDAR project:

    npm install --save-dev @percy/cli

# Setup venv

From within the browserstack directory of this project:

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

# Run the Browserstack functional tests

Running 
    
    python3 browserstack/scots_lidar_bs_tests.py
    
from within the root directory of this Scots LiDAR project should trigger the defined tests to run remotely in Browserstack

NB If you attempt this whilst anyone else is running Browserstack tests, or your own previous submission has not finished, or at the same time as you are running the Percy visual tests, it will fail due to the maximum number of threads on our licence being exceeded.

# View the results of the functional tests

Go to [Browserstack](https://www.browserstack.com/), sign in, and you will see the tests you have triggered coming through
    
Currently we are using one thread for each browser so you will see the individual tests, separated into Chrome, Firefox, Edge and Safari tests
    
NB Until the entire test run has completed, the test results are presented in a slightly confusing way..

EG If 12 tests are defined to run in Firefox, when 7 of them have run so far it will say 
"7/7 Passed" under Firefox, not "7/12 Passed" as you might expect

# Run the Percy visual tests

If you want to test against your local deployment, just go into your .env file and change the URL_UNDER_TEST from the live site URL to your local one. 

Log into [Percy](https://percy.io/login) with the Browserstack login credentials.

Under "Projects", the project "JNCC Playground" can be used or you can create a new one.

Click into the Project and go to "Project Settings"

Copy the Project Token.

Note that under "Browser Management" you can turn on or off each Browser to test against.  False negatives have been observed against Edge.  Support ticket 780450 has been raised with Browserstack to look into this.  In the meantime, either turn off Edge, or scroll down and set the Diff Sensitivity to Fully Relaxed, or be prepared to see false negatives in comparisons of screenshots from Edge

In the root directory of the Scot LiDAR project type:

    export PERCY_TOKEN=[the token you copied]
    node_modules/.bin/percy exec -- python3 browserstack/scots_lidar_visual_tests.py
    
NB If you attempt this whilst anyone else or yourself is currently running Browserstack or Percy tests, it will fail due to the maximum number of threads on our licence being exceeded.  It also appears to fail if you are viewing one of the screenshots of the previous run on the Percy web portal.

# View the results of the Percy visual tests
    
Go to the Builds section on the Percy web portal and click into the build you ahve just triggered.  Any differences with previously captured screenshots are highlighted.    
