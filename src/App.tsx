import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "./check.svg";
import TextLoop from "react-text-loop";
import cxs from "cxs/component";
import "./App.css";
const Example = cxs("div")({
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
  const getRandomIndex = () => Math.floor(Math.random() * 15);
  const [options, setOptions] = useState([
    `${adjectives[getRandomIndex()]} ${nouns[getRandomIndex()]} ${
      collectiveNouns[getRandomIndex()]
    } ${sentenceEnds[getRandomIndex()]}`,
    `${adjectives[getRandomIndex()]} ${nouns[getRandomIndex()]} ${
      collectiveNouns[getRandomIndex()]
    } ${sentenceEnds[getRandomIndex()]}`,
    `${adjectives[getRandomIndex()]} ${nouns[getRandomIndex()]} ${
      collectiveNouns[getRandomIndex()]
    } ${sentenceEnds[getRandomIndex()]}`,
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [interval, setInterval] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const intervalStartTimeout = setTimeout(() => {
      setIsLoaded(true);
      setInterval(1200);
      setOptions([
        `${adjectives[getRandomIndex()]} ${nouns[getRandomIndex()]} ${
          collectiveNouns[getRandomIndex()]
        } ${sentenceEnds[getRandomIndex()]}`,
        `${adjectives[getRandomIndex()]} ${nouns[getRandomIndex()]} ${
          collectiveNouns[getRandomIndex()]
        } ${sentenceEnds[getRandomIndex()]}`,
        `${adjectives[getRandomIndex()]} ${nouns[getRandomIndex()]} ${
          collectiveNouns[getRandomIndex()]
        } ${sentenceEnds[getRandomIndex()]}`,
      ]);
    }, 0);
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
        event.preventDefault();
        setIsDone(true);
        setIsExpired(false);
        setInterval(0);
      }}
    >
      <Title>Controlled props (start/stop animation and change options)</Title>
      {isLoaded && (
        <Example>
          <TextLoop interval={interval} fade delay={1000} children={options} />
          {/* <TextLoop
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
          <TextLoop interval={interval} children={sentenceEnds} />{" "} */}
        </Example>
      )}
      <div>
        {Boolean(isDone) && (
          <>
            <h3>
              <Logo /> Headline chosen!
            </h3>
          </>
        )}
      </div>
      <div>
        {Boolean(isExpired) && (
          <h3>
            <Logo /> Boss chose this headline!
          </h3>
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
  const [activeSection, setActiveSection] = useState<Sections>(
    Sections.Controlled
  );

  const mapSectionToComponent = {
    [Sections.Controlled]: Controlled,
  };

  const ExampleSection = mapSectionToComponent[activeSection];
  return (
    <div>
      <Section>
        <Title>Examples</Title>
        <select
          onChange={(e) => {
            setActiveSection(parseInt(e.target.value, 10));
          }}
        >
          <option value={Sections.Controlled}>Controlled</option>
        </select>
      </Section>
      <ExampleSection />
    </div>
  );
};

export default App;
