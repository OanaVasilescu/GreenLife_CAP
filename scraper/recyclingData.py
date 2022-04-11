from bs4 import BeautifulSoup, SoupStrainer
import requests
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support import expected_conditions as EC
from lxml import html
import csv

websiteRoot = 'https://hartareciclarii.ro/ce-si-cum-reciclez'
startPage = f'{websiteRoot}/#/category/all'

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(startPage)

action = ActionChains(driver)
action.move_to_element(driver.find_element(By.XPATH, '/html/body')).perform()

try:
    loadContent = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
        (By.XPATH, '//*[@id="content"]/app-material-all')))  # wait until our needed data is loaded
except TimeoutException:
    print("took too long")

page_content = driver.page_source
soup = BeautifulSoup(page_content, 'lxml')

linkTextsElements = driver.find_element(
    By.XPATH, '//*[@id="content"]/app-material-all').find_elements(By.XPATH, '//*[@id="content"]/app-material-all/app-letter-display/span')

# productTypeText.click()
# print(productType.prettify())

texts = []
for linkTextsElement in linkTextsElements:
    texts.append(linkTextsElement.text)

for text in texts:
    span = WebDriverWait(driver, 20).until(EC.element_to_be_clickable(
        (By.XPATH, f"//*[@id='content']/app-material-all/app-letter-display/span[contains(text(),'{text}')]")))
    driver.execute_script("arguments[0].click();", span)

    try:
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
            (By.XPATH, '//*[@id="content"]/app-material-single')))  # wait until our needed data is loaded
    except:
        print(83)
    action = ActionChains(driver)
    action.move_to_element(driver.find_element(
        By.XPATH, '//*[@id="main"]/app-root')).perform()
    action.move_to_element(driver.find_element(
        By.XPATH, '//*[@id="primary"]')).perform()
    action.move_to_element(driver.find_element(
        By.XPATH, '//*[@id="content"]')).perform()
    action.move_to_element(driver.find_element(
        By.XPATH, '//*[@id="content"]/app-material-single')).perform()

    chronobiology_content = driver.page_source
    chronobiology_soup = BeautifulSoup(chronobiology_content, 'lxml')
    debug = chronobiology_soup.find('app-root').find('content')

    print(debug)

    driver.get(startPage)
    try:
        loadContent = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
            (By.XPATH, '//*[@id="content"]/app-material-all')))  # wait until our needed data is loaded
    except:
        print(96)


driver.close()
