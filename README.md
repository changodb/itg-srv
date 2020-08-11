# itg-srv

App backend for [Fit Up Your Style](https://fitupyourstyle.com/) packs database.

### Installing

```
Tested on node version 12.1.0
```

From the Terminal, clone this repo onto your computer with:

```
git clone https://github.com/changodb/itg-srv
```

Move into the new directory:

```
cd itg-srv/
```

Add credentials for the database cluster -- set MONGO_URL in .env to the full URL, ie:
`mongodb+srv://user:pass@cluster.mongodb.net/itg?retryWrites=true&w=majority`

Usage once setup:
```
npm install
npm start
```

Navigate to http://localhost:3001/<route>
Note: our default route is `itg`
  
### Notes
* Please refer to [this repo](https://github.com/changodb/itg-frontend/) for front-end code and [this repo](https://github.com/lewisisgood/itg-packs-db/) for parser code.

## Authors

* **Lewis King** - [Github](https://github.com/lewisisgood)
* **Chandler Wyatt** - [Github](https://github.com/chandlerwyatt)
* **Gene Peters** - [Github](https://github.com/gene-telligent)
* **Ryan Graham** - [Github](https://github.com/ryanxgraham)
