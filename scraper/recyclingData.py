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
        ('title', 'howToCollect', 'recyclingRestrictions', 'recyclingInstructions'))

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
    noRecyclingPaths = []
    recyclePaths = []
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

    elif 'hainele' in current_url or 'optica' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p")
        if 'hainele' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p")
            pathsNeeded.append(
                "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p")
            pathsNeeded.append(
                "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
            pathsNeeded.append(
                "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")

    elif 'mari' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/parent::*/following-sibling::ul")

    elif 'baterii' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'DEEE este reciclabil')]")
        pathsNeeded.append(
            "*[contains(text(),'DEEE este reciclabil')]/following-sibling::ul")

    elif 'led' in current_url or 'mici' in current_url or 'mobila' in current_url or 'paleti' in current_url or 'rumegus' in current_url or 'ulei-auto' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::ul")
        if 'led' in current_url or 'mici' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum colec')]/parent::*/following-sibling::ul/following-sibling::ul")

    elif 'scoase' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::ul")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::ul/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::ul/following-sibling::p/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/parent::*/following-sibling::p/following-sibling::ul/following-sibling::p/following-sibling::p/following-sibling::ul")

    elif 'anvelope' in current_url or 'alama' in current_url or 'moloz' in current_url or 'conserve' in current_url or 'capace' in current_url or 'folie-de-aluminiu' in current_url or 'polistiren' in current_url or 'medicamente' in current_url or 'parbrize' in current_url or 'faciale' in current_url or 'demolari' in current_url or 'vopsea' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum se colec')]/following-sibling::p")
        if not 'conserve' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum se colec')]/following-sibling::p/following-sibling::p")
        if 'faciale' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum se colec')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
        if 'demolari' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum se colec')]/following-sibling::p/following-sibling::p/following-sibling::p")
        if 'vopsea' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum se colec')]/following-sibling::ul")

    elif 'de-apa' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum se colec')]/following-sibling::ul")

    elif 'acumulatori' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum se colec')]/parent::*/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum se colec')]/parent::*/following-sibling::p/following-sibling::p")

    elif 'automoto' in current_url or 'incaltaminte' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p")
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::p/following-sibling::p")
    elif 'carton' in current_url or 'plastic' in current_url or 'zinc' in current_url or 'cupru' in current_url or 'doze' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'um colec')]/parent::*/following-sibling::ul")
    elif 'productie' in current_url:
        pathsNeeded.append(
            "*[contains(text(),'Cum se colec')]/following-sibling::ul")
    else:
        pathsNeeded.append(
            "*[contains(text(),'Cum colec')]/following-sibling::ul")
        if 'telefoane' in current_url:
            pathsNeeded.append(
                "*[contains(text(),'Cum colec')]/following-sibling::ul/following-sibling::ul")

    noRecyclingPaths.append(
        "*[contains(text(),'Nu se')]/parent::*/following-sibling::*")

    if 'abs' in current_url or 'alama' in current_url or 'led' in current_url:
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/following-sibling::p")
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/following-sibling::p/following-sibling::p")
        if 'alama' in current_url:
            recyclePaths.append(
                "*[contains(text(),'se recicleaz')]/following-sibling::p/following-sibling::p/following-sibling::p")
            recyclePaths.append(
                "*[contains(text(),'se recicleaz')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
            recyclePaths.append(
                "*[contains(text(),'se recicleaz')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")
            recyclePaths.append(
                "*[contains(text(),'se recicleaz')]/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p/following-sibling::p")

    elif 'anvelope' in current_url:
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/following-sibling::p")
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/following-sibling::ul")
    else:
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/parent::*/following-sibling::p")
        if 'acumulatori' in current_url:
            recyclePaths.append(
                "*[contains(text(),'se recicleaz')]/parent::*/following-sibling::ol")
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/parent::*/following-sibling::p/following-sibling::p")
        recyclePaths.append(
            "*[contains(text(),'se recicleaz')]/parent::*/following-sibling::p/following-sibling::p/following-sibling::p")

    errorGettingElement = False
    colectingInstructions = ''
    for path in pathsNeeded:
        if errorGettingElement == False:
            try:
                colectare = driver.find_element(By.XPATH, f'//{path}')
                colectingInstructions = colectingInstructions + colectare.text
            except:
                errorGettingElement = True

    colectingInstructions1 = colectingInstructions.replace('\n', '  \\n  ')
    colectingInstructions2 = colectingInstructions1.replace(';', ' && ')

    errorGettingElement = False
    noColectingInstructions = ''
    for path in noRecyclingPaths:
        if errorGettingElement == False:
            try:
                noRec = driver.find_element(By.XPATH, f'//{path}')
                noColectingInstructions = noColectingInstructions + noRec.text
            except:
                errorGettingElement = True

    noColectingInstructions = noColectingInstructions.replace("\n", " \\n  ")
    noColectingInstructions = noColectingInstructions.replace(";", " && ")

    recInstructions = ''
    errorGettingElement = False
    for path in recyclePaths:
        if errorGettingElement == False:
            try:
                noRec = driver.find_element(By.XPATH, f'//{path}')
                recInstructions = recInstructions + noRec.text
            except:
                errorGettingElement = True

    recInstructions = recInstructions.replace("\n", " \\n  ")
    recInstructions = recInstructions.replace(";", " && ")

    data = {'title': titlu.text, 'howToCollect': colectingInstructions2,
            "recyclingRestrictions": noColectingInstructions, 'recyclingInstructions': recInstructions}

    with open('recyclingData.csv', 'a', newline='') as f:
        writer = csv.writer(f, delimiter=';')
        writer.writerow(
            (data['title'], data['howToCollect'], data['recyclingRestrictions'], data['recyclingInstructions']))

    try:
        driver.get(startPage)
        loadContent = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(
            (By.XPATH, '//*[@id="content"]/app-material-all')))  # wait until our needed data is loaded
    except:
        print(96)


driver.close()
