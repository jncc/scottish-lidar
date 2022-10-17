from decouple import config
from dotenv import load_dotenv
import re
import time
from capabilities import capabilities
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from threading import Thread

load_dotenv()

BROWSERSTACK_USERNAME = config('BROWSERSTACK_USERNAME')
BROWSERSTACK_ACCESS_KEY = config('BROWSERSTACK_ACCESS_KEY')
BROWSERSTACK_URL = config('BROWSERSTACK_URL')

BUILD_NAME = "Scots LiDAR automated testing"
URL_UNDER_TEST = "https://remotesensingdata.gov.scot/"
EXPECTED_MAIN_PAGE_TITLE = "Scottish Remote Sensing Portal | Scottish Government"
EXPECTED_DATASETS_PAGE_TITLE = "Scottish LiDAR Remote Sensing datasets | Scottish Government"
ACCEPT_COOKIES_BUTTON_XPATH = '//*[@id="ccc-notify-accept"]'
BROWSE_DATASETS_BUTTON_XPATH = '//*[@id="main"]/div/div[1]/a'
DATASETS_HEADER_SHOWING_X_OF_Y_XPATH = '//*[@id="app"]/div[1]/div[1]/div[1]/div[1]/span'
DATASETS_LIST_XPATH = '//*[@id="app"]/div[1]/div[2]'
DATASETS_LIST_CLASS = 'list-item'

def get_browser_option(browser):
    switcher = {
        "chrome": ChromeOptions(),
        "firefox": FirefoxOptions(),
        "edge": EdgeOptions(),
        "safari": SafariOptions(),
    }
    return switcher.get(browser, ChromeOptions())
    
def set_status(driver, status, reason):
    driver.execute_script(
            'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"' + status + '", "reason": "' + reason + '"}}')

def fail_test(driver, reason):
    set_status(driver, "failed", reason)	
            
def pass_test(driver, reason):
    set_status(driver, "passed", reason)
    
def wait_page(driver, title):	
    WebDriverWait(driver, 10).until(EC.title_contains(title))
    
def wait_xpath_elem(driver, path):	
    return WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.XPATH, path)))
    
def test_multiple_datasets_available(driver) :
   driver.get(URL_UNDER_TEST)
   wait_page(driver, EXPECTED_MAIN_PAGE_TITLE)
   wait_xpath_elem(driver, ACCEPT_COOKIES_BUTTON_XPATH).click() 
   wait_xpath_elem(driver, BROWSE_DATASETS_BUTTON_XPATH).click()
   wait_page(driver, EXPECTED_DATASETS_PAGE_TITLE)
   time.sleep(2.5)
   datasets_header = driver.find_element(By.XPATH, DATASETS_HEADER_SHOWING_X_OF_Y_XPATH).text
   showing_x_of_y = [int(s) for s in re.findall(r'\d+', datasets_header)]
   if len(showing_x_of_y) != 2:
       fail_test(driver, "Expected datasets header <Showing x of y> did not contain 2 numbers")
   else: 
       showing_total_datasets = showing_x_of_y[1]
       if showing_total_datasets <= 1:
           fail_test(driver,  "Multiple datasets were expected in the Datasets tab")
       elif showing_x_of_y[0] != showing_total_datasets:
              fail_test(driver, "Full unfiltered datasets list should be displayed initially")
       else: 
           list_div = driver.find_element(By.XPATH, DATASETS_LIST_XPATH)
           list_elems = list_div.find_elements(By.CLASS_NAME, DATASETS_LIST_CLASS)
           dataset_count = len(list(list_elems))
           if dataset_count != showing_total_datasets:
                  fail_test(driver, "Number of datasets in list does not match total value in header")
           else: 
               pass_test(driver, "Multiple datasets available!")        

tests = [
    {
        "name": "Test Multiple Datasets Available",
        "function": test_multiple_datasets_available,
    },
]

def run_session(cap):
    bstack_options = {
        "userName": BROWSERSTACK_USERNAME,
        "accessKey": BROWSERSTACK_ACCESS_KEY,
        "buildName": BUILD_NAME,
        "os": cap["os"],
        "osVersion": cap["osVersion"],
    }
    options = get_browser_option(cap["browserName"].lower())
    options.browser_version = cap["browserVersion"]
    for test in tests:
        try:
            bstack_options["sessionName"] = test["name"]
            options.set_capability('bstack:options', bstack_options)
            driver = webdriver.Remote(command_executor=BROWSERSTACK_URL,options=options)
            test["function"](driver)
        except NoSuchElementException:
            fail_test(driver, "Some elements failed to load")
        except Exception:
            fail_test(driver, "Some exception occurred")
        driver.quit()
    
for cap in capabilities:
  Thread(target=run_session, args=(cap,)).start()
