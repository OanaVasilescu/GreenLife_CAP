from os import urandom
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

with open('recyclingData.csv', 'a', newline='') as f:
    writer = csv.writer(f, delimiter=';')
    writer.writerow(
        ('title', 'howToCollect'))

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get(startPage)

action = ActionChains(driver)
action.move_to_element(driver.find_element(By.XPATH, '/html/body')).perform()

try:
    loadContent = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
        (By.XPATH, '//*[@id="content"]/app-material-all')))  # wait until our needed data is loaded
except TimeoutException:
    print("took too long")

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

    try:
        loadContent = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
            (By.XPATH, '//*[@id="content"]/app-material-single/h1')))
    except TimeoutException:
        print("took too long")
    titlu = driver.find_element(
        By.XPATH, '//*[@id="content"]/app-material-single/h1')
    notFound = False
    current_url = driver.current_url

    pathsNeeded = []
    if 'lenjerii' in titlu.text or 'organice' in titlu.text or 'lenjerii' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")

    elif 'hainele' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")

    elif 'scoase' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::ul")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::ul/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::ul/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::ul/following-sibling::p/following-sibling::p/following-sibling::ul")
    elif 'automoto' in current_url or 'incaltaminte' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p")
    elif 'carton' in current_url or 'plastic' in current_url or 'zinc' in current_url or 'cupru' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::ul")
    else:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::ul")
        # f"*[contains(text(),'{'Cum colec' if ceva else 'Cum se cole'}')]/following-sibling::ul")

    errorGettingElement = False
    colectingInstructions = ''
    for path in pathsNeeded:
        if errorGettingElement == False:
            try:
                colectare = driver.find_element(By.XPATH, f'//{path}')
                colectingInstructions = colectingInstructions + colectare.text
            except:
                errorGettingElement = True
                colectingInstructions = colectingInstructions + 'none'

    data = {'title': titlu.text, 'howToCollect': colectingInstructions}

    with open('recyclingData.csv', 'a', newline='') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerow(
            (data['title'], data['howToCollect']))

    try:
        driver.get(startPage)
        loadContent = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
            (By.XPATH, '//*[@id="content"]/app-material-all')))  # wait until our needed data is loaded
    except:
        print(96)


driver.close()
