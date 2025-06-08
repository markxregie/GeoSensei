const express = require("express");
const axios = require("axios");
const cors = require("cors");
const chatbotRoutes = require("./chatbot");
const { db } = require("./db");  // Import SQLite connection
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

// No MSSQL poolPromise initialization needed for SQLite

app.use(cors());
app.use(express.json());

// Serve static files from public folder
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/chatbot", chatbotRoutes);

// Store access token in memory (for demo purposes)
let mapillaryAccessToken = null;
let mapillaryTokenExpiry = null;

// Endpoint to redirect user to Mapillary authorization URL
app.get("/api/mapillary/auth", (req, res) => {
    const clientId = "24211086625146458";
    const redirectUri = encodeURIComponent("http://localhost:3002/api/mapillary/callback");
    const authUrl = `https://www.mapillary.com/connect?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=public`;
    res.redirect(authUrl);
});

app.get("/api/mapillary/callback", async (req, res) => {
  const code = req.query.code;
  console.log("Received authorization code:", code);
  const clientId = "24211086625146458";
  const clientSecret = "MLY|24211086625146458|efe4dd32abaff2377c1d17a97de69912";
  const redirectUri = "http://localhost:3002/api/mapillary/callback";  // Do NOT encode here

  if (!code) {
    return res.status(400).send("Authorization code not provided");
  }

  try {
    const tokenUrl = "https://graph.mapillary.com/token";

  const body = {
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    client_id: clientId
  };

  const response = await axios.post(tokenUrl, body, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `OAuth ${clientSecret}`
    }
  });

    mapillaryAccessToken = response.data.access_token;
    mapillaryTokenExpiry = Date.now() + response.data.expires_in * 1000;

    console.log("Obtained access token:", mapillaryAccessToken);
    res.send("Authorization successful. You can close this window.");
  } catch (error) {
    console.error("Error exchanging authorization code for token:", error.response?.data || error.message);
    res.status(500).send("Failed to exchange authorization code for token");
  }
});


app.get("/api/mapillary/token", (req, res) => {
    console.log("Serving Mapillary access token:", mapillaryAccessToken ? "Present" : "Missing or expired");
    if (!mapillaryAccessToken || Date.now() >= mapillaryTokenExpiry) {
        console.log("Access token missing or expired");
        return res.status(401).json({ error: "Access token not available or expired. Please reauthorize." });
    }
    res.json({ accessToken: mapillaryAccessToken });
});

// New endpoint to get flags and options by continent
app.get("/api/flags/:continentName", (req, res) => {
    const continentName = req.params.continentName;

    // Get continent id
    const continentQuery = `SELECT id FROM continents WHERE continent_name = ?`;
    db.get(continentQuery, [continentName], (err, continentRow) => {
        if (err) {
            console.error("Error fetching continent:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!continentRow) {
            return res.status(404).json({ error: "Continent not found" });
        }
        const continentId = continentRow.id;

        // Get countries in the continent
        const countriesQuery = `SELECT id, country_name, flag_image FROM countries WHERE continent_id = ?`;
        db.all(countriesQuery, [continentId], (err, countriesInContinent) => {
            if (err) {
                console.error("Error fetching countries in continent:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (countriesInContinent.length === 0) {
                return res.status(404).json({ error: "No countries found in continent" });
            }

            // Select one correct answer randomly
            const correctAnswer = countriesInContinent[Math.floor(Math.random() * countriesInContinent.length)];

            // Get random countries from other continents for options
            const optionsQuery = `
                SELECT id, country_name FROM countries WHERE id != ? ORDER BY RANDOM() LIMIT 3
            `;
            db.all(optionsQuery, [correctAnswer.id], (err, randomOptions) => {
                if (err) {
                    console.error("Error fetching random options:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }

                // Combine correct answer with random options
                const options = randomOptions.map(opt => opt.country_name);
                options.push(correctAnswer.country_name);

                // Shuffle options
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }

                res.json({
                    correctAnswer: {
                        country_name: correctAnswer.country_name,
                        flag_image: correctAnswer.flag_image
                    },
                    options: options
                });
            });
        });
    });
});

app.get("/api/flags/all/:continentName", (req, res) => {
    const continentName = req.params.continentName;

    // Get continent id
    const continentQuery = `SELECT id FROM continents WHERE continent_name = ?`;
    db.get(continentQuery, [continentName], (err, continentRow) => {
        if (err) {
            console.error("Error fetching continent:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (!continentRow) {
            return res.status(404).json({ error: "Continent not found" });
        }
        const continentId = continentRow.id;

        // Get countries in the continent including capital
        const countriesQuery = `SELECT id, country_name, capital, flag_image FROM countries WHERE continent_id = ?`;
        db.all(countriesQuery, [continentId], (err, countriesInContinent) => {
            if (err) {
                console.error("Error fetching countries in continent:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (countriesInContinent.length === 0) {
                return res.status(404).json({ error: "No countries found in continent" });
            }

            // For each country, generate options (3 random other capitals + correct capital)
            const results = [];
            let processedCount = 0;

            countriesInContinent.forEach(country => {
                const optionsQuery = `
                    SELECT capital FROM countries WHERE id != ? ORDER BY RANDOM() LIMIT 3
                `;
                db.all(optionsQuery, [country.id], (err, randomOptions) => {
                    if (err) {
                        console.error("Error fetching random options:", err);
                        return res.status(500).json({ error: "Internal server error" });
                    }

                    const options = randomOptions.map(opt => opt.capital);
                    options.push(country.capital);

                    // Shuffle options
                    for (let i = options.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [options[i], options[j]] = [options[j], options[i]];
                    }

                    results.push({
                        correctAnswer: {
                            country_name: country.country_name,
                            capital: country.capital,
                            flag_image: country.flag_image
                        },
                        options: options
                    });

                    processedCount++;
                    if (processedCount === countriesInContinent.length) {
                        res.json(results);
                    }
                });
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
