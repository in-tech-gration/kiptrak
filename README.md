# Kiptrak

A tool for tracking progress of WDX-180's students

## How to run:

1. Clone the repository
2. Create a `config.env` file in the root folder containing the following:

```env
NODE_ENV=development
PORT=5000
DATA_FOLDER=data
```

3. Create a `data/` folder in the root directory and store inside content from `user/` folder from WDX-180's repo.
4. Run the following commands to launch the app on `http://localhost:5173/`:
   - `npm install`
   - `cd client && npm install`
   - `cd .. && npm run dev`
