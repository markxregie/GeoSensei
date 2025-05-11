const express = require("express");
const axios = require("axios");
const cors = require("cors");
const chatbotRoutes = require("./chatbot");


const app = express();
const PORT = process.env.PORT || 3002;


app.use(cors());
app.use(express.json());

const continentCountries = {
  Asia: ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY", "GE", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MY", "MV", "MN", "MM", "NP", "KP", "OM", "PK", "PH", "QA", "SA", "SG", "KR", "LK", "SY", "TW", "TJ", "TH", "TR", "TM", "AE", "UZ", "VN", "YE"],
  Africa: ["DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "DJ", "EG", "GQ", "ER", "ET", "GA", "GM", "GH", "GN", "GW", "CI", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "ZM", "ZW"],
  Europe: ["AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT", "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB", "VA"],
  "North America": ["AG", "BS", "BB", "BZ", "CA", "CR", "CU", "DM", "DO", "SV", "GD", "GT", "HT", "HN", "JM", "MX", "NI", "PA", "KN", "LC", "VC", "TT", "US"],
  "South America": ["AR", "BO", "BR", "CL", "CO", "EC", "GF", "GY", "PY", "PE", "SR", "UY", "VE"],
  Australia: ["AU", "FJ", "KI", "MH", "FM", "NR", "NZ", "PW", "PG", "WS", "SB", "TO", "TV", "VU"]
};

// Function to fetch country data with retries
const fetchCountryData = async (code, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`, { timeout: 5000 });
            if (!response.data || response.data.length === 0) throw new Error("Invalid response");

            const country = response.data[0];
            return {
                name: country.name?.common || `Unknown (${code})`,
                flag: country.flags?.svg || country.flags?.png || "",
                capital: country.capital ? country.capital[0] : "No capital found"
            };
        } catch (error) {
            console.error(`Attempt ${i + 1} failed for country ${code}:`, error.message);
            if (i === retries - 1) return { name: `Unknown (${code})`, flag: "", capital: "Unknown" };
        }
    }
};


// API route to fetch quiz data
app.get("/api/quiz/:continent", async (req, res) => {
    try {
        const { continent } = req.params;
        const countryCodes = continentCountries[continent];

        if (!countryCodes) {
            return res.status(400).json({ error: "Invalid continent" });
        }

        const correctCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
        const incorrectCodes = countryCodes
            .filter(code => code !== correctCode)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const choices = [correctCode, ...incorrectCodes].sort(() => Math.random() - 0.5);

        const countryData = {};
        await Promise.all(
            choices.map(async (code) => {
                countryData[code] = await fetchCountryData(code);
            })
        );

        res.json({
            flag: countryData[correctCode].flag,
            choices: choices.map(code => ({
                code,
                name: countryData[code].name,
                correct: code === correctCode
            }))
        });
    } catch (error) {
        console.error("Error in API:", error.message);
        res.status(500).json({ error: "Failed to fetch quiz data" });
    }
});

// API route to fetch capitals quiz data
app.get("/api/quiz/capitals/:continent", async (req, res) => {
    try {
        const { continent } = req.params;
        const countryCodes = continentCountries[continent];

        if (!countryCodes) {
            return res.status(400).json({ error: "Invalid continent" });
        }

        const correctCode = countryCodes[Math.floor(Math.random() * countryCodes.length)];
        const incorrectCodes = countryCodes
            .filter(code => code !== correctCode)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const choices = [correctCode, ...incorrectCodes].sort(() => Math.random() - 0.5);

        const countryData = {};
        await Promise.all(
            choices.map(async (code) => {
                countryData[code] = await fetchCountryData(code);
            })
        );

        res.json({
            flag: countryData[correctCode].flag,
            choices: choices.map(code => ({
                code,
                name: countryData[code].name,
                capital: countryData[code].capital,
                correct: code === correctCode
            }))
        });
    } catch (error) {
        console.error("Error in API:", error.message);
        res.status(500).json({ error: "Failed to fetch capitals quiz data" });
    }
});

app.use("/api/chatbot", chatbotRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
