import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Main() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const searchGame = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setDiscounts(data);
      })
      .catch((error) => {
        console.error(`Failed to search for game: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="main bg-transparent pt-10">
      <div className="content max-w-5xl mx-auto px-4">
        {/* Search Section */}
        <div className="search flex justify-center mb-10">
          <form
            onSubmit={searchGame}
            className="form w-full sm:w-1/2 flex flex-col items-center gap-4"
          >
            <Typography variant="h5" className="font-semibold text-white">
              Find Your Favorite Game
            </Typography>
            <TextField
              id="form-search"
              variant="outlined"
              fullWidth
              placeholder="e.g., Call of Duty"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: "rgba(255,255,255,0.87)" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.7)",
                  },
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{
                color: "rgba(255,255,255,0.87)",
                borderColor: "rgba(255,255,255,0.5)",
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.7)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
                px: 6,
                py: 1,
                fontWeight: "medium",
              }}
            >
              {loading ? (
                <CircularProgress color="inherit" size={24} />
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </div>

        {/* Results Section */}
        <div className="discounts">
          <Typography
            variant="h4"
            className="discounts__title text-3xl font-bold text-center mb-10 text-white"
          >
            Games
          </Typography>

          {loading && (
            <div className="flex justify-center items-center mt-10">
              <CircularProgress size={40} sx={{ color: "white" }} />
            </div>
          )}

          {!loading && discounts.length === 0 && searchText && (
            <p className="text-center text-gray-300">No games found.</p>
          )}

          <ul className="mt-10 grid list-none justify-center p-0 gap-y-6 gap-x-6 grid-cols-[repeat(auto-fit,_282px)] place-content-center">
            {discounts.map((game) => (
              <li key={game.gameID} className="discounts__item">
                <Card
                  sx={{
                    backgroundColor: "transparent",
                    color: "rgba(255,255,255,0.87)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "none",
                    "&:hover": { boxShadow: "0 0 10px rgba(255,255,255,0.2)" },
                    width: "100%",
                    height: 268,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 140,
                      objectFit: "cover",
                      width: "100%",
                    }}
                    image={game.thumb}
                    alt={game.external}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <div>
                      <Tooltip title={game.external}>
                        <Typography
                          variant="h6"
                          className="game__title font-semibold text-white"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            cursor: "help",
                          }}
                        >
                          {game.external}
                        </Typography>
                      </Tooltip>
                      <Typography
                        variant="body1"
                        className="game__price text-blue-400 font-bold mt-1"
                      >
                        ${game.cheapest}
                      </Typography>
                    </div>
                    <Typography variant="body2" className="game__link mt-2">
                      <a
                        href={`https://www.cheapshark.com/redirect?dealID=${game.cheapestDealID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-300"
                      >
                        Buy here!
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Main;
