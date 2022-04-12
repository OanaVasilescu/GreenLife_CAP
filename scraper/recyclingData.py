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
    if 'lenjerii' not in titlu.text or 'organice' not in titlu.text:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/following-sibling::ul")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = 'None'
            notFound = True
    else:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/following-sibling::p")
            colectingInstructions = colectare.text
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p")
            colectingInstructions = colectingInstructions + colectare.text
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p/following-sibling::p")
            colectingInstructions = colectingInstructions + colectare.text
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
            colectingInstructions = colectingInstructions + colectare.text
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
            colectingInstructions = colectingInstructions + colectare.text
            notFound = False

        except:
            colectingInstructions = 'None'
            notFound = True

    if notFound:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum colec')]/parent::*/following-sibling::ul")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = "None"
            notFound = True
        try:
            if 'Carton' not in titlu.text or 'aluminiu' not in titlu.text:
                colectare = driver.find_element(
                    By.XPATH, "//*[contains(text(),'Cum colec')]/parent::*/following-sibling::ul/following-sibling::ul")
                colectingInstructions = colectingInstructions + colectare.text
        except:
            print("nothiiing")
    if notFound:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum se col')]/following-sibling::p")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = 'None'
            notFound = True
        try:
            if "conserve" not in titlu.text:
                colectare = driver.find_element(
                    By.XPATH, "//*[contains(text(),'Cum se col')]/following-sibling::p/following-sibling::p")
                colectingInstructions = colectingInstructions + colectare.text
        except:
            print("do nothing")

    if notFound:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum se col')]/following-sibling::ul")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = 'None'
            notFound = True

    if notFound:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum se col')]/parent::*/following-sibling::p")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = 'None'
            notFound = True
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'Cum se col')]/parent::*/following-sibling::p/following-sibling::p")
            colectingInstructions = colectingInstructions + colectare.text
        except:
            print("do nothing again")

    if notFound:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'cum col')]/following-sibling::ul")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = 'None'
            notFound = True

    if notFound:
        try:
            colectare = driver.find_element(
                By.XPATH, "//*[contains(text(),'cum col')]/parent::strong/parent::p/following-sibling::ul")
            colectingInstructions = colectare.text
            notFound = False
        except:
            colectingInstructions = 'None'
            notFound = True

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
