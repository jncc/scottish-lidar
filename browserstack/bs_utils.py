from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.safari.options import Options as SafariOptions
from selenium.webdriver.edge.options import Options as EdgeOptions

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
