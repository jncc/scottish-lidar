from decouple import config
from dotenv import load_dotenv
import bs_utils
import scots_lidar_automated_testing_constants as SL
import time
from selenium.webdriver import Firefox, FirefoxOptions
from percy import percy_snapshot

load_dotenv()

URL_UNDER_TEST = config('URL_UNDER_TEST')

# It looks like we're only running it for Firefox here
# In fact it will run across all browsers defined by the Percy project settings in the UI portal
# This is based on their own code example of how to kick the whole thing off
ff_options = FirefoxOptions()
ff_options.add_argument('-headless')
browser = Firefox(options=ff_options)

browser.get(URL_UNDER_TEST)
bs_utils.wait_page(browser, SL.MAIN_PAGE_TITLE)
percy_snapshot(browser, 'Landing page with Cookies notice')

bs_utils.wait_xpath_elem(browser, SL.ACCEPT_COOKIES_BUTTON_XPATH).click() 
percy_snapshot(browser, 'Home page after accepting cookies')

bs_utils.wait_xpath_elem(browser, SL.BROWSE_DATASETS_BUTTON_XPATH).click()
bs_utils.wait_page(browser, SL.DETAILS_PAGE_TITLE)
time.sleep(SL.DATASETS_PAGE_LOAD_WAIT_TIME_SECONDS)
percy_snapshot(browser, 'Datasets Page')

bs_utils.wait_xpath_elem(browser, SL.DATASETS_HEADER_MAP_LINK_XPATH).click()
bs_utils.wait_page(browser, SL.DETAILS_PAGE_TITLE)
time.sleep(SL.MAP_PAGE_LOAD_VISUAL_WAIT_TIME_SECONDS)
percy_snapshot(browser, 'Map Page')

bs_utils.wait_xpath_elem(browser, SL.MAP_ZOOM_IN_BUTTON_XPATH).click()
time.sleep(SL.MAP_ZOOM_WAIT_TIME_SECONDS)
percy_snapshot(browser, 'Map Page Zoomed In')

browser.quit()
