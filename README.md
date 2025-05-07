# TimeTracker Frontend

Det här är frontend-delen av TimeTracker – en webbapplikation där användaren kan logga och se statistik över hur mycket tid som läggs på olika arbetsuppgifter under veckan.

## 🛠️ Tekniker som används

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Funktioner

- Lägga till, redigera och ta bort arbetskategorier
- Checka in och ut från arbetsuppgifter
- Se statistik över hur mycket tid som lagts på varje kategori under en vecka
- Visa statistik för nuvarande vecka och tidigare veckor (med veckoväljare)

## 📦 Kom igång

### Klona projektet

  ```bash
    git clone https://github.com/ditt-användarnamn/timetracker-frontend.git
    cd timetracker-frontend
  ```

### Installera dependencies 

```bash
  npm install
  npm install axios
```

### Backend
  Backend är en Spring Boot applikation som hanterar API-anrop och datalagring i MongoDB Atlas.
  [Backend-repo:] (https://github.com/affa24ju/timeTrackerApi.git)
  Backend behövs att köra igång först för att få funka frontend. 

### Köra programmet

```bash
  npm run dev
```
Applikationen körs på: http://localhost:5173


