import React, { useState, useEffect } from "react";
import TextLoop from "react-text-loop";
import cxs from "cxs/component";
import "./App.css";
const Example = cxs("div")({
  fontSize: "24px",
  marginBottom: "5px",
  fontWeight: 600,
  textTransform: "capitalize",
  color: "#aaa",
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
  color: "#aaa",
});

const Section = cxs("div")({
  marginBottom: "50px",
  fontFamily:
    'Arial, nyt-franklin, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
});

const Base = () => (
  <Section>
    <Title>Default</Title>
    <Example>
      <TextLoop>
        {nouns &&
          nouns.map((term, index) => {
            return (
              <span>
                {adjectives[getRandomIndex()]} {nouns[getRandomIndex()]}{" "}
                {collectiveNouns[getRandomIndex()]}{" "}
                {sentenceEnds[getRandomIndex()]}
              </span>
            );
          })}
      </TextLoop>{" "}
    </Example>
  </Section>
);

const Fast = () => (
  <div
    onClick={() => {
      console.log("hi");
    }}
  >
    <Section>
      <Title>Fast transition</Title>
      <Example>
        <TextLoop interval={2000}>
          {adjectives &&
            adjectives.map((term, index) => {
              return <span>{adjectives[getRandomIndex()]}</span>;
            })}
        </TextLoop>{" "}
        <TextLoop interval={1000}>
          {nouns &&
            nouns.map((term, index) => {
              return <span>{nouns[getRandomIndex()]}</span>;
            })}
        </TextLoop>{" "}
        <TextLoop interval={900}>
          {collectiveNouns &&
            collectiveNouns.map((term, index) => {
              return <span>{collectiveNouns[getRandomIndex()]}</span>;
            })}
        </TextLoop>{" "}
        <TextLoop interval={1200}>
          {sentenceEnds &&
            sentenceEnds.map((term, index) => {
              return <span>{sentenceEnds[getRandomIndex()]}</span>;
            })}
        </TextLoop>{" "}
      </Example>
    </Section>
  </div>
);

const Smooth = () => (
  <Section>
    <Title>Smooth animation (different spring config)</Title>
    <Example>
      <TextLoop
        springConfig={{ stiffness: 70, damping: 31 }}
        adjustingSpeed={500}
      >
        {nouns &&
          nouns.map((term, index) => {
            return (
              <span>
                {adjectives[index]} {term} {collectiveNouns[index]}{" "}
              </span>
            );
          })}
      </TextLoop>{" "}
      in every category.
    </Example>
  </Section>
);

const Variable = () => (
  <Section>
    <Title>Variable interval</Title>
    <Example>
      <TextLoop interval={[3000, 1000]}>
        {nouns &&
          nouns.map((term, index) => {
            return (
              <span>
                {adjectives[index]} {term} {collectiveNouns[index]}{" "}
              </span>
            );
          })}
      </TextLoop>{" "}
      in every category.
    </Example>
  </Section>
);

const Masked = () => (
  <Section
    onClick={() => {
      console.log("hi");
    }}
  >
    <Title>Masked</Title>
    <Example>
      <TextLoop mask={true}>
        {nouns &&
          nouns.map((term, index) => {
            return (
              <span>
                {adjectives[index]} {term} {collectiveNouns[index]}{" "}
              </span>
            );
          })}
      </TextLoop>{" "}
      in every category.
    </Example>
  </Section>
);

const Controlled = () => {
  const [options, setOptions] = useState(nouns);
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    const optionsTimeout = setTimeout(() => {
      setOptions(nouns);
      console.log("change options");
    }, 10000);

    return () => {
      clearTimeout(optionsTimeout);
    };
  }, []);

  useEffect(() => {
    const intervalStartTimeout = setTimeout(() => {
      console.log("start");
      setInterval(1000);
    }, 5000);
    return () => {
      clearTimeout(intervalStartTimeout);
    };
  }, []);

  useEffect(() => {
    const intervalStopTimeout = setTimeout(() => {
      setInterval(0);
      console.log("stop");
    }, 15000);

    return () => {
      clearTimeout(intervalStopTimeout);
    };
  }, []);

  return (
    <Section
      onClick={() => {
        setInterval(0);
      }}
    >
      <Title>Controlled props (start/stop animation and change options)</Title>
      <Example>
        <TextLoop
          interval={interval}
          springConfig={{ stiffness: 70, damping: 31 }}
          adjustingSpeed={500}
          children={options}
        />{" "}
        in every category.
      </Example>
    </Section>
  );
};

const Staggered = () => (
  <Section>
    <Title>Staggered (with delay prop and custom styling)</Title>
    <Example>
      <StyledTextLoop mask={true} fade={false}>
        {nouns &&
          nouns.map((term, index) => {
            return (
              <span>
                {adjectives[index]} {term} {collectiveNouns[index]}{" "}
              </span>
            );
          })}
      </StyledTextLoop>
    </Example>
  </Section>
);

enum Sections {
  Base,
  Fast,
  Smooth,
  Variable,
  Masked,
  Controlled,
  Staggered,
}

const App = () => {
  const [activeSection, setActiveSection] = useState<Sections>(Sections.Base);

  const mapSectionToComponent = {
    [Sections.Base]: Base,
    [Sections.Fast]: Fast,
    [Sections.Smooth]: Smooth,
    [Sections.Variable]: Variable,
    [Sections.Masked]: Masked,
    [Sections.Controlled]: Controlled,
    [Sections.Staggered]: Staggered,
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
          <option value={Sections.Base}>Default</option>
          <option value={Sections.Fast}>Fast</option>
          <option value={Sections.Smooth}>Smooth</option>
          <option value={Sections.Variable}>Variable</option>
          <option value={Sections.Masked}>Masked</option>
          <option value={Sections.Controlled}>Controlled</option>
          <option value={Sections.Staggered}>Staggered</option>
        </select>
      </Section>
      <ExampleSection />
    </div>
  );
};

export default App;
