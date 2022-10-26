Selenium Testing in Browserstack
================================

Defines automated tests to run against the Scots LiDAR website using Selenium.  Selenium tests can be coded in any language but our language of choice is Python.  Runs these automated tests in a defined matrix of OS, OS version, browser and browser version combinations using Browserstack.  The results can be viewed on the Browserstack website.

In an ideal world tests should be atomic, but due to the number of threads we have available with our current licence, minimising running time for pragmatic reasons needs to be prioritised.  For example, the initial JIRA task defined three functional use cases.  Running these across the defined matrix of combinations resulted in approximately 100 individual tests which took 40+ minutes to run.  Combining all of the individual test conditions into a single "functional smoke test" to be run against across the same matrix of combinations halved the total running time, so we moved to this approach.

Current limitations:
- The test conditions coded so far are examples of what we can do, not complete functional test coverage of the website
- The tests are currently triggered manually from the command line, rather than running as part of a pipeline
- The tests are running against an externally visible website - local developer testing has not been investigated
- Additional visual testing based on snapshots using Percy still needs to be implemented 

# Browserstack account

    You will need a Browserstack account to run the tests - please speak to Jon Parsons
    Create a .env file in the browserstack directory of this project based on the provided .env.template file 
    Insert your username and access key into your .env file

# Setup venv

    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt

# Run the tests

    Running 
    python3 scots_lidar_bs_tests.py
    from within the browserstack directory of this project will trigger the tests to run remotely in Browserstack

# View the results

    Sign into [Browserstack](www.browsterstack.com), and you will see the tests you have triggered coming through
    Currently we are using one thread for each browser so you will see the individual tests, 
    separated into Chrome, Firefox, Edge and Safari tests
    NB Until the entire test run has completed, the test results are presented in a slightly confusing way..
    EG If 12 tests are defined to run in Firefox, when 7 of them have run so far it will say 
    "7/7 Passed" under Firefox, not "7/12 Passed" as you might expect
