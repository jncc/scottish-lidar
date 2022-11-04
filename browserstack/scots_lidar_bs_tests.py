from decouple import config
from dotenv import load_dotenv
import bs_utils
import re
import time
from capabilities import browsers
import scots_lidar_automated_testing_constants as SL
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from threading import Thread

load_dotenv()

BROWSERSTACK_USERNAME = config('BROWSERSTACK_USERNAME')
BROWSERSTACK_ACCESS_KEY = config('BROWSERSTACK_ACCESS_KEY')
BROWSERSTACK_URL = config('BROWSERSTACK_URL')
URL_UNDER_TEST = config('URL_UNDER_TEST')
ENVIRONMENT_UNDER_TEST = config('ENVIRONMENT_UNDER_TEST')



def functional_smoke_test(driver) :
   bs_utils.wait_xpath_elem(driver, SL.ACCEPT_COOKIES_BUTTON_XPATH).click() 
   bs_utils.wait_xpath_elem(driver, SL.BROWSE_DATASETS_BUTTON_XPATH).click()
   bs_utils.wait_page(driver, SL.DETAILS_PAGE_TITLE)
   time.sleep(SL.DATASETS_PAGE_LOAD_WAIT_TIME_SECONDS)
   datasets_header = driver.find_element(By.XPATH, SL.DATASETS_HEADER_SHOWING_X_OF_Y_XPATH).text
   showing_x_of_y = [int(s) for s in re.findall(r'\d+', datasets_header)]
   if len(showing_x_of_y) != 2:
       bs_utils.fail_test(driver, "Expected datasets header <Showing x of y> did not contain 2 numbers")
       return
   showing_total_datasets = showing_x_of_y[1]
   if showing_total_datasets <= 1:
       bs_utils.fail_test(driver,  "Multiple datasets were expected in the Datasets tab")
       return
   if showing_x_of_y[0] != showing_total_datasets:
       bs_utils.fail_test(driver, "Full unfiltered datasets list should be displayed initially")
       return
   list_div = driver.find_element(By.XPATH, SL.DATASETS_LIST_XPATH)
   list_elems = list_div.find_elements(By.CLASS_NAME, SL.DATASETS_LIST_CLASS)
   dataset_count = len(list(list_elems))
   if dataset_count != showing_total_datasets:
       bs_utils.fail_test(driver, "Number of datasets in list does not match total value in header")
       return
   driver.find_element(By.XPATH, SL.DATASETS_HEADER_MAP_LINK_XPATH).click()     
   bs_utils.wait_page(driver, SL.DETAILS_PAGE_TITLE)
   bs_utils.wait_xpath_elem(driver, SL.MAP_DATASET_LIST_LIDAR_PHASE2_DTM_LABEL_XPATH).click()
   time.sleep(SL.MAP_PAGE_LOAD_WAIT_TIME_SECONDS)
   lidar_items = driver.find_element(By.XPATH, SL.MAP_LIDAR_ITEM_LIST_XPATH)
   lidar_titles = lidar_items.find_elements(By.CLASS_NAME, SL.LIDAR_ITEM_TITLE_CLASS)
   for lidar_title in lidar_titles:
       if SL.MAP_LIDAR_ITEM_TITLE_PREFIX_PHASE2_DTM not in lidar_title.text:
           bs_utils.fail_test(driver, "Expected displayed LiDAR titles to refer to Scotland Lidar Phase 2 DTM after selecting that dataset")
           return
   tiles_10km_collection = driver.find_element(By.XPATH, SL.MAP_10KM_TILES_COLLECTION_XPATH)
   tile_nn55 = tiles_10km_collection.find_elements(By.CLASS_NAME, SL.MAP_TILES_CLASS)[SL.MAP_LIDAR_PHASE2_DTM_NN55_SQUARE_TILE_INDEX]
   bs_utils.perform_svg_element_compatible_click(driver, tile_nn55)
   lidar_basket_count = driver.find_element(By.XPATH, SL.MAP_LIDAR_BASKET_COUNT_XPATH).text
   if '1' not in lidar_basket_count:
       bs_utils.fail_test(driver, "Expected LiDAR basket to contain 1 item after clicking on NN55 10km grid square")
       return
   lidar_baskets = lidar_items.find_elements(By.CLASS_NAME, SL.LIDAR_ITEM_BASKET_CLASS)
   if SL.LIDAR_SELECTED_BASKET_ITEM_CLASS not in lidar_baskets[SL.MAP_LIDAR_PHASE2_DTM_NN55_SQUARE_LIST_INDEX].get_attribute("class"):
       bs_utils.fail_test(driver, "LiDAR basket icon corresponding to NN55 10km grid square should be highlighted after clicking on the grid square") 
       return
   bs_utils.pass_test(driver, "All elements of functional smoke test succeeded!")
          

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
    bstack_options["buildName"] = SL.BUILD_NAME.format(browser["browserName"], ENVIRONMENT_UNDER_TEST)
    for os in browser["oss"]:
        bstack_options["os"] = os["os"]
        for os_version in os["osVersions"]:
            bstack_options["osVersion"] = os_version
            options = bs_utils.get_browser_option(browser["browserName"].lower())
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
                        bs_utils.wait_page(driver, SL.MAIN_PAGE_TITLE)
                        test["function"](driver)
                    except NoSuchElementException:
                        bs_utils.fail_test(driver, "Some elements failed to load")
                    except Exception:
                        bs_utils.fail_test(driver, "Some exception occurred")    
                    driver.quit()
    
for browser in browsers:
  Thread(target=run_session, args=(browser,)).start()
