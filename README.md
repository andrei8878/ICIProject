
# **CogniPlay** 🧠


---


![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-Python%20%7C%20Flask-blue?style=for-the-badge&logo=python)
![Tech](https://img.shields.io/badge/Tech-JavaScript-yellow?style=for-the-badge&logo=javascript)

---

### 📝 Descriere Proiect

Acest proiect vizeaza implementarea digitala a celebrului **test neuropsihologic Corsi Block Tapping Test**.  
Obiectivul principal este crearea unei aplicatii web accesibile care sa evalueze **memoria vizuo-spatiala**.

![Preview](https://i.imgur.com/KTYC1ch.jpeg)
![Preview](https://i.imgur.com/Bi9wlUs.png)
![Preview](https://i.imgur.com/BHxyTMR.jpeg)

---

## 🎯 Obiective principale

1. **Automatizarea testarii.**  
   🔹 Generarea de secvente aleatorii de aprindere a celulelor pentru a preveni memorarea mecanica de catre pacient.

2. **Monitorizarea performantei.**  
   🔹 Calcul automat al scorului:  
    - Lungimea secventei  
    - Numarul de incercari  
    - Scor total  
    - Cel mai bun scor obtinut  
    - Timpul de reactie  
    - Timpul total  
    - Sistem de *rating*

3. **Afisarea dinamica a rezultatelor.**  



---

### 🛠 Tech Stack

Solutia a fost construita utilizand urmatoarele tehnologii:

| Componenta | Tehnologie | Descriere |
| :--- | :--- | :--- |
| **Backend** | `[Python / Flask]` | API-ul principal si logica. |
| **Frontend** | `[HTML / CSS / JavaScript]` | Interfata cu utilizatorul. |
| **Database (pseudo)** | `[Fisier CSV]` | Stocarea persistenta a datelor. |



---


### 🚀 Instalare și Rulare

Urmează pașii de mai jos pentru a rula proiectul local.

**Pași:**

1. **Clonează repository-ul**
    ```bash
    git clone https://github.com/andrei8878/ICIProject.git
    cd ICIProject
    ```

2. **Crearea unui environment virtual**
    ```bash
    # instaleaza virtualenv daca nu este deja instalat:
    pip install virtualenv

    # creeaza un environment numit venv:
    python -m venv venv

    # activeaza mediul virtual:
    venv\Scripts\activate
    ```

3. **Instalarea pachetelor**
    ```bash
    pip install -r requirements.txt
    ```

4. **Rularea aplicatiei**
    ```bash
    python app.py
    ```
    ➡️ Apoi acceseaza aplicatia in browser la adresa: `http://localhost:5000`



### 👤 Autor

**Barau Andrei Cristian**
* GitHub: [@andrei8878](https://github.com/andrei8878)

---

> *Acest proiect a fost dezvoltat in scop educational/cercetare.*