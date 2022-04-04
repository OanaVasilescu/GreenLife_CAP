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


def goThroughPage(link):
    # link.click()
    # try:
    #     WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
    #         (By.XPATH, '//*[@id="content"]/app-material-single/h1')))
    # except TimeoutException:
    #     print("took too long")

    # driver.get('https://hartareciclarii.ro/ce-si-cum-reciclez/#/category/all')
    # try:
    #     WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
    #         (By.XPATH, '//*[@id="content"]/app-material-single/h1')))  # wait until our needed data is loaded
    # except TimeoutException:
    #     print("took too long")
    # titlu = driver.find_element(
    #     By.XPATH, '//*[@id="content"]/app-material-single/h1')
    # print(titlu.text)
    return


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

links = driver.find_element(
    By.XPATH, '//*[@id="content"]/app-material-all').find_elements(By.XPATH, '//*[@id="content"]/app-material-all/app-letter-display/span')
# productTypeText.click()
# print(productType.prettify())


for link in links:
    print('navigating to: ' + link)
    driver.get(link)
    # do stuff within that page here...
    # driver.execute_script("window.history.go(-1)")
    driver.back()
