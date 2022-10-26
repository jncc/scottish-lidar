Selenium Testing in Browserstack
================================

Defines automated tests to run against the Scots LiDAR website using Selenium.  Selenium tests can be coded in any language but our language of choice is Python.  Runs these automated tests in a defined matrix of OS, OS version, browser and browser version combinations using Browserstack.  The results can be viewed on the Browserstack website.

In an ideal world tests should be atomic, but due to the number of threads we have available with our current licence, minimising running time for pragmatic reasons needs to be prioritised.  For example, the initial JIRA task defined three example functional use cases.  Running these across the defined matrix of combinations resulted in approximately 100 individual tests which took 40+ minutes to run.  Combining all of the individual test conditions into a single "functional smoke test" to be run across the same matrix of combinations halved the total running time, so we moved to this approach.

Current limitations:
- The test conditions coded so far are examples of what we can do, not comprehensive functional test coverage of the website
- The tests are currently triggered manually from the command line, rather than running as part of a pipeline
- The tests are running against an externally visible website - local developer testing has not been investigated
- Additional visual testing based on snapshots using Percy still needs to be implemented

# .env file

Copy the provided .env.template file to create a .env file in the same directory

The inherited configuration points to the Live environment as the target for testing - amend as required

# Browserstack account

Navigate to the [Browserstack Account summary](https://www.browserstack.com/accounts/profile)

Log on using the credentials under 'Browserstack' in the JNCC Web Stack KeePASS file referenced [here](http://jncc-wiki/Restricted_Access_Pages/JNCC_KeePass)

Copy the Username and Access Key from the "Authentication and Security" section into the .env file created above

# Setup venv

From within the browserstack directory of this project:

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

# Run the tests

Running 
    
    python3 scots_lidar_bs_tests.py
    
from within the browserstack directory of this project should trigger the defined tests to run remotely in Browserstack

# View the results

Go to [Browserstack](https://www.browserstack.com/), sign in, and you will see the tests you have triggered coming through
    
Currently we are using one thread for each browser so you will see the individual tests, separated into Chrome, Firefox, Edge and Safari tests
    
NB Until the entire test run has completed, the test results are presented in a slightly confusing way..
EG If 12 tests are defined to run in Firefox, when 7 of them have run so far it will say 
"7/7 Passed" under Firefox, not "7/12 Passed" as you might expect
