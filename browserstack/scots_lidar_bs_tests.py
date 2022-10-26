from decouple import config
from dotenv import load_dotenv
import re
import time
from capabilities import browsers
from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.edge.options import Options as EdgeOptions
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from threading import Thread

load_dotenv()

BROWSERSTACK_USERNAME = config('BROWSERSTACK_USERNAME')
BROWSERSTACK_ACCESS_KEY = config('BROWSERSTACK_ACCESS_KEY')
BROWSERSTACK_URL = config('BROWSERSTACK_URL')
URL_UNDER_TEST = config('URL_UNDER_TEST')
ENVIRONMENT_UNDER_TEST = config('ENVIRONMENT_UNDER_TEST')

BUILD_NAME = "Scots LiDAR {} Testing - {}"
MAIN_PAGE_TITLE = "Scottish Remote Sensing Portal | Scottish Government"
DETAILS_PAGE_TITLE = "Scottish LiDAR Remote Sensing datasets | Scottish Government"
ACCEPT_COOKIES_BUTTON_XPATH = '//*[@id="ccc-notify-accept"]'
BROWSE_DATASETS_BUTTON_XPATH = '//*[@id="main"]/div/div[1]/a[1]'
DATASETS_HEADER_SHOWING_X_OF_Y_XPATH = '//*[@id="app"]/div[1]/div[1]/div[1]/div[1]/span'
DATASETS_LIST_XPATH = '//*[@id="app"]/div[1]/div[2]'
DATASETS_HEADER_MAP_LINK_XPATH = '//*[@id="layout-container"]/header//nav/div/div/ul/li[4]/a'
DATASETS_LIST_CLASS = 'list-item'
DATASETS_PAGE_LOAD_WAIT_TIME_SECONDS = 2
MAP_DATASET_LIST_LIDAR_PHASE2_DTM_LABEL_XPATH = '//*[@id="main"]/div[1]/div[2]/div[1]/div[1]/div[2]/div[3]/div[2]/div[2]/div[1]/div'
MAP_10KM_TILES_COLLECTION_XPATH = '//*[@id="main"]/div[1]/div[2]/div[3]/div[1]/div[3]'
MAP_LIDAR_ITEM_LIST_XPATH = '//*[@id="main"]/div[1]/div[2]/div[1]/div[2]/div[2]/div[2]'
MAP_LIDAR_BASKET_COUNT_XPATH = '//*[@id="main"]/div[1]/div[2]/div[1]/div[2]/div[3]/div[4]/span'
MAP_DATASET_ITEM_CLASS = 'dataset-list-item'
MAP_TILES_CLASS = 'leaflet-interactive'
MAP_LIDAR_PHASE2_DTM_NN55_SQUARE_TILE_INDEX = 2
MAP_LIDAR_PHASE2_DTM_NN55_SQUARE_LIST_INDEX = 1
MAP_PAGE_LOAD_WAIT_TIME_SECONDS = 5
MAP_LIDAR_PANE_DATALOAD_WAIT_TIME_SECONDS = 1
MAP_LIDAR_ITEM_TITLE_PREFIX_PHASE2_DTM = "Scotland Lidar Phase 2 DTM"
LIDAR_ITEM_BASKET_CLASS = 'product-list-item-basket'
LIDAR_ITEM_TITLE_CLASS = 'product-list-item-title'
LIDAR_SELECTED_BASKET_ITEM_CLASS = 'product-list-item-basket-in'

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
    
def perform_svg_element_compatible_click(driver, element):
    driver.execute_script("arguments[0].dispatchEvent(new MouseEvent('click', {view: window, bubbles:true, cancelable: true}))", element)

def functional_smoke_test(driver) :
   wait_xpath_elem(driver, ACCEPT_COOKIES_BUTTON_XPATH).click() 
   wait_xpath_elem(driver, BROWSE_DATASETS_BUTTON_XPATH).click()
   wait_page(driver, DETAILS_PAGE_TITLE)
   time.sleep(DATASETS_PAGE_LOAD_WAIT_TIME_SECONDS)
   datasets_header = driver.find_element(By.XPATH, DATASETS_HEADER_SHOWING_X_OF_Y_XPATH).text
   showing_x_of_y = [int(s) for s in re.findall(r'\d+', datasets_header)]
   if len(showing_x_of_y) != 2:
       fail_test(driver, "Expected datasets header <Showing x of y> did not contain 2 numbers")
       return
   showing_total_datasets = showing_x_of_y[1]
   if showing_total_datasets <= 1:
       fail_test(driver,  "Multiple datasets were expected in the Datasets tab")
       return
   if showing_x_of_y[0] != showing_total_datasets:
       fail_test(driver, "Full unfiltered datasets list should be displayed initially")
       return
   list_div = driver.find_element(By.XPATH, DATASETS_LIST_XPATH)
   list_elems = list_div.find_elements(By.CLASS_NAME, DATASETS_LIST_CLASS)
   dataset_count = len(list(list_elems))
   if dataset_count != showing_total_datasets:
       fail_test(driver, "Number of datasets in list does not match total value in header")
       return
   driver.find_element(By.XPATH, DATASETS_HEADER_MAP_LINK_XPATH).click()     
   wait_page(driver, DETAILS_PAGE_TITLE)
   wait_xpath_elem(driver, MAP_DATASET_LIST_LIDAR_PHASE2_DTM_LABEL_XPATH).click()
   time.sleep(MAP_PAGE_LOAD_WAIT_TIME_SECONDS)
   lidar_items = driver.find_element(By.XPATH, MAP_LIDAR_ITEM_LIST_XPATH)
   lidar_titles = lidar_items.find_elements(By.CLASS_NAME, LIDAR_ITEM_TITLE_CLASS)
   for lidar_title in lidar_titles:
       if MAP_LIDAR_ITEM_TITLE_PREFIX_PHASE2_DTM not in lidar_title.text:
           fail_test(driver, "Expected displayed LiDAR titles to refer to Scotland Lidar Phase 2 DTM after selecting that dataset")
           return
   tiles_10km_collection = driver.find_element(By.XPATH, MAP_10KM_TILES_COLLECTION_XPATH)
   tile_nn55 = tiles_10km_collection.find_elements(By.CLASS_NAME, MAP_TILES_CLASS)[MAP_LIDAR_PHASE2_DTM_NN55_SQUARE_TILE_INDEX]
   perform_svg_element_compatible_click(driver, tile_nn55)
   lidar_basket_count = driver.find_element(By.XPATH, MAP_LIDAR_BASKET_COUNT_XPATH).text
   if '1' not in lidar_basket_count:
       fail_test(driver, "Expected LiDAR basket to contain 1 item after clicking on NN55 10km grid square")
       return
   lidar_baskets = lidar_items.find_elements(By.CLASS_NAME, LIDAR_ITEM_BASKET_CLASS)
   if LIDAR_SELECTED_BASKET_ITEM_CLASS not in lidar_baskets[MAP_LIDAR_PHASE2_DTM_NN55_SQUARE_LIST_INDEX].get_attribute("class"):
       fail_test(driver, "LiDAR basket icon corresponding to NN55 10km grid square should be highlighted after clicking on the grid square") 
       return
   pass_test(driver, "All elements of functional smoke test succeeded!")
          

tests = [
    {
        "name": "Functional Smoke Test",
        "function": functional_smoke_test,
    },
]

def run_session(browser):
    bstack_options = {
        "userName": BROWSERSTACK_USERNAME,
        "accessKey": BROWSERSTACK_ACCESS_KEY,
    }
    bstack_options["buildName"] = BUILD_NAME.format(browser["browserName"], ENVIRONMENT_UNDER_TEST)
    for os in browser["oss"]:
        bstack_options["os"] = os["os"]
        for os_version in os["osVersions"]:
            bstack_options["osVersion"] = os_version
            options = get_browser_option(browser["browserName"].lower())
            browser_versions = browser["browserVersions"]
            for browser_version in browser_versions:
                options.browser_version = browser_version
                for test in tests:
                    try:
                        bstack_options["sessionName"] = test["name"]
                        options.set_capability('bstack:options', bstack_options)
                        driver = webdriver.Remote(command_executor=BROWSERSTACK_URL,options=options)
                        driver.maximize_window()  # The Scots LiDAR website will not load maps in Selenium's smaller default window size
                        driver.get(URL_UNDER_TEST)
                        wait_page(driver, MAIN_PAGE_TITLE)
                        test["function"](driver)
                    except NoSuchElementException:
                        fail_test(driver, "Some elements failed to load")
                    except Exception:
                        fail_test(driver, "Some exception occurred")    
                    driver.quit()
    
for browser in browsers:
  Thread(target=run_session, args=(browser,)).start()
