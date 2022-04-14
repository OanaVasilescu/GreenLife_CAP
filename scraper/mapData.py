from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager


driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get()


def getData():
    try:
        administratDe = "//*[contains(text(),'Administrat de')]"
        adresaPath = "//*[contains(text(),'Adresa')]/parent::span/following-sibling::span"
        copiazaLinkButtonPath = "//*[contains(text(),'Copiaz')]/parent::div"
    except:
        pass
