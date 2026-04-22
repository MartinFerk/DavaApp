# WorkWave 🌊

Spletna aplikacija za upravljanje delovnih terminov in skupin. Namenjena podjetjem kjer admin razporeja delo med voznike ali delavce.

🔗 **Live demo:** [workwave.space](https://workwave.space)

---

## Tehnologije

**Frontend:** React, React Router, Vercel Analytics  
**Backend:** Node.js, Express.js  
**Baza:** MongoDB Atlas  
**Avtentikacija:** JWT (JSON Web Tokens)  
**Varnost:** bcrypt  
**Email:** Resend API  
**Deployment:** Vercel  

---

## Funkcionalnosti

### 👤 Uporabniki
- Registracija z emailom, uporabniškim imenom in geslom
- Gesla hashirana z bcrypt
- Prijava vrne JWT token (velja 8 ur)
- Dva tipa: **Admin** in **Voznik**

### 👥 Skupine
- Admin ustvari skupino in doda člane
- Vsak user vidi skupine kjer je član ali admin
- Admin lahko ureja in briše skupine

### 📋 Termini
- Admin ustvari termin (stranka, čas, prevzem, cilj, voznik)
- Voznik v dropdownu vidi samo člane svojih skupin
- Ob dodelitvi termina voznik dobi **email obvestilo**
- Admin lahko ureja in briše termine
- Voznik označi termin kot opravljeno

---

## Avtor

Martin Ferk
