import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "./check.svg";
import TextLoop from "react-text-loop";
import cxs from "cxs/component";
import "./App.css";

const HeadlineGroup = cxs("div")({
  fontSize: "34px",
  marginBottom: "5px",
  fontWeight: 600,
  textTransform: "capitalize",
  color: "#00",
  display: "block",
  cursor: "pointer",
});

const StyledTextLoop = cxs(TextLoop)({
  display: "block",
});

const getRandomIndex = () => Math.floor(Math.random() * 15);

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
    'Arial, nyt-franklin, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
});

// const Fast = () => (
//   <div
//     onClick={() => {
//       console.log("hi");
//     }}
//   >
//     <Section>
//       <Title>Fast transition</Title>
//       <Example>
//         <TextLoop interval={2000}>
//           {adjectives &&
//             adjectives.map((term, index) => {
//               return <span>{adjectives[getRandomIndex()]}</span>;
//             })}
//         </TextLoop>{" "}
//         <TextLoop interval={1000}>
//           {nouns &&
//             nouns.map((term, index) => {
//               return <span>{nouns[getRandomIndex()]}</span>;
//             })}
//         </TextLoop>{" "}
//         <TextLoop interval={900}>
//           {collectiveNouns &&
//             collectiveNouns.map((term, index) => {
//               return <span>{collectiveNouns[getRandomIndex()]}</span>;
//             })}
//         </TextLoop>{" "}
//         <TextLoop interval={1200}>
//           {sentenceEnds &&
//             sentenceEnds.map((term, index) => {
//               return <span>{sentenceEnds[getRandomIndex()]}</span>;
//             })}
//         </TextLoop>{" "}
//       </Example>
//     </Section>
//   </div>
// );

const Controlled = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [interval, setInterval] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

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

  return (
    <Section
      onClick={(event) => {
        /* when user chooses headline stop the clock */
        setIsDone(true);
        setIsExpired(false);
        setInterval(0);
      }}
    >
      {!isLoaded && <p>OMG here he comes...</p>}
      {isLoaded && (
        <HeadlineGroup>
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
            <h3>✅ Headline chosen!</h3>
          </>
        )}
      </div>
      <div>
        {Boolean(isExpired) && Boolean(!isDone) && (
          <h3>🤷‍♂️ Times up! This is your headline.</h3>
        )}
      </div>
    </Section>
  );
};

enum Sections {
  Fast,
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
