import React, { useState, useEffect } from "react";
import TextLoop from "react-text-loop";
import cxs from "cxs/component";
import "./App.css";

const HeadlineGroup = cxs("div")({
  fontSize: "34px",
  marginBottom: "5px",
  fontWeight: 600,
  textTransform: "capitalize",
  wordBreak: "break-all",
  color: "#00",
  display: "block",
  cursor: "pointer",
});

const adjectives = [
  "yummy",
  "star-eyed",
  "small",
  "furry",
  "huge",
  "obscure",
  "popular",
  "lumpy",
  "sneaky",
  "micro",
  "funky",
  "shy",
  "bold",
  "spicy",
  "tired",
];

const nouns = [
  "stonk",
  "cheetah",
  "cloud",
  "crypto",
  "smoothie",
  "poetry",
  "spider",
  "puppy",
  "boomer",
  "coffee",
  "bagel",
  "meme",
  "margarita",
  "astrologer",
  "burrito",
];

const collectiveNouns = [
  "run",
  "gathering",
  "walk",
  "email",
  "flock",
  "galaxy",
  "march",
  "billboard",
  "group",
  "flock",
  "group",
  "warning",
  "wave",
  "push",
  "canidates",
];

const sentenceEnds = [
  "shocks the world",
  "wins award",
  "considers a Senate run",
  "turns toward the future",
  "sounds alarm",
  "takes a bow",
  "is must see TV",
  "ruins just about everything",
  "fall asleep",
  "meets Guy Fieri",
  "panders to the crowd",
  "wonders at the cosmos",
  "meets and takes a nap",
  "goes viral",
  "takes Manhattan",
];
const Title = cxs("div")({
  marginBottom: "5px",
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "uppercase",
  color: "#000",
});

const Section = cxs("div")({
  marginBottom: "50px",
  fontFamily:
    'nyt-cheltenham, nyt-franklin, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
});

const Controlled = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [interval, setInterval] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  // currently not getting sentence words randomly, going through by array order
  const getRandomIndex = () => Math.floor(Math.random() * 15);

  useEffect(() => {
    const intervalStartTimeout = setTimeout(() => {
      setIsLoaded(true);
      setInterval(1200);
    }, 1000);
    return () => {
      clearTimeout(intervalStartTimeout);
    };
  }, []);

  useEffect(() => {
    const intervalStopTimeout = setTimeout(() => {
      setInterval(0);
      setIsExpired(true);
    }, 15000);

    return () => {
      clearTimeout(intervalStopTimeout);
    };
  }, []);

  useEffect(() => {
    // look for articles from created headline,
    // right now just based on noun
    if (isDone || isExpired) {
      const basicQuery =
        document.getElementById("headline").children[1].textContent;

      fetch(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURI(
          basicQuery
        )}&api-key=XwGASDofkYRU61tz4qzrlLgj2UZD14Wi`
      )
        .then((response) => response.json())
        .then((data) => {
          setRelatedArticles(data.response.docs);
        });
    }
  }, [isDone, isExpired]);

  return (
    <>
      <Section
        onClick={(event) => {
          /* when user chooses headline stop the clock */
          setIsDone(true);
          setIsExpired(false);
          setInterval(0);
        }}
      >
        {!isLoaded && <h1>🗞 Headline Deadline</h1>}

        {isLoaded && (
          <HeadlineGroup id="headline">
            {Boolean(isDone) && <span>✅</span>}{" "}
            <TextLoop
              interval={interval}
              delay={!isDone ? 1000 : 0}
              children={adjectives}
            />{" "}
            <TextLoop
              interval={interval}
              delay={!isDone ? 1200 : 0}
              children={nouns}
            />{" "}
            <TextLoop
              interval={interval}
              fade
              delay={!isDone ? 1900 : 0}
              children={collectiveNouns}
            />{" "}
            <TextLoop interval={interval} children={sentenceEnds} />{" "}
          </HeadlineGroup>
        )}
        <div>
          {Boolean(isDone) && (
            <>
              <h3>Your Headline chosen!</h3>
            </>
          )}
          <div>
            {Boolean(isExpired) && Boolean(!isDone) && (
              <h3>🤷‍♂️ Times up! This is your headline.</h3>
            )}
          </div>
          {(isDone || isExpired) && relatedArticles && (
            <h4>Headlines and Related Articles</h4>
          )}
          {(isDone || isExpired) &&
            relatedArticles &&
            relatedArticles.map((article) => {
              return (
                <p>
                  <a target="_blank" href={article.web_url}>
                    {article.headline.main}
                  </a>
                </p>
              );
            })}
        </div>
      </Section>
      {Boolean(isDone) && (
        <>
          <hr /> <h3>Co-Worker Leaderboard</h3>
          <ol>
            <li>
              Muppets take Mordor <span>⬆️ ⬇️</span>
            </li>
            <li>
              Stonks take wild turn <span>⬆️ ⬇️</span>
            </li>
            <li>
              Chicken Soup for the Swole <span>⬆️ ⬇️</span>
            </li>
            <li>
              Daylight Savings Time lost at Sea <span>⬆️ ⬇️</span>
            </li>
          </ol>
        </>
      )}{" "}
    </>
  );
};

enum Sections {
  Controlled,
}

const App = () => {
  /* could try other sections here */
  const mapSectionToComponent = {
    [Sections.Controlled]: Controlled,
  };

  const Headlines = mapSectionToComponent[Sections.Controlled];
  return (
    <div>
      <Headlines />
    </div>
  );
};

export default App;
