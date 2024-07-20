/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.css";

import avg from "../../assets/reactions/avg.png";
import avgFill from "../../assets/reactions/avgFill.png";
import excellent from "../../assets/reactions/excellent.png";
import excellentFill from "../../assets/reactions/excellentFill.png";
import good from "../../assets/reactions/good.png";
import goodFill from "../../assets/reactions/goodFill.png";
import poor from "../../assets/reactions/poor.png";
import poorFill from "../../assets/reactions/poorFill.png";
import worst from "../../assets/reactions/worst.png";
import worstFill from "../../assets/reactions/worstFill.png";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const REC_ITEMS = [
  [worst, worstFill],
  [poor, poorFill],
  [avg, avgFill],
  [good, goodFill],
  [excellent, excellentFill],
];

const FeedBackQuestions: { [key: string]: any } = {
  "User Interaction": [
    "Find myself using this app frequently.",
    "I am likely to recommend this app to others.",
    "I enjoy using this app.",
    "I am motivated to continue using this app.",
    "This app keeps my attention well.",
  ],
  Accessibility: [
    "Learning how to use this app is easy.",
    "Navigating this app is easy.",
    "This app rarely crashes or freezes.",
    "This app loads quickly.",
  ],
  Design: [
    "This app’s design is visually appealing.",
    "The text on this app is easy to read.",
    "This app’s layout is well-organized.",
  ],
  "Information Quality": [
    "This information in this app is accurate.",
    "The information in this app is up-to-date.",
    "The information in this app is revealed to my need.",
    "The information in this app is easy to understand.",
    "The information in this app is trustworthy.",
    "The information in this app is well-referenced.",
    "The information in this app is comprehensive.",
  ],
  "Subjective quality Assessment": [
    "I am likely to recommended this app to other.",
    "I expect to use this app frequently.",
    "I would be willing to pay for this app.",
    "Overall, I rate this app as.",
  ],
  "Application-specific questions": [
    {
      head: "Awareness",
      body: "This app is likely to increase awareness of the importance of managing Diabetes and Maturity Onset Diabetes of the Young (MODY).",
    },
    {
      head: "Knowledge",
      body: "This app is likely to increase knowledge and understand of Diabetes, MODY and its management.",
    },
    {
      head: "Attitudes",
      body: "This app is likely to change attitudes towards self management Diabetes and MODY effectively.",
    },
    {
      head: "Intention to Change",
      body: "This app is likely to increase motivation and willingness to manage Diabetes and MODY effectively.",
    },
    {
      head: "Self-Management",
      body: "This app’s educational module and tools are likely to help users effectively manage their Diabetes and MODY.",
    },
    {
      head: "Help Seeking",
      body: "This app is likely to encourage users to seek further help from healthcare professionals when needed.",
    },
  ],
};

interface IReactComp {
  onClick?: (e: any) => void;
  selected?: 0 | 1 | 2 | 3 | 4 | 5;
  index?: number;
}

const ReactionComp: FC<IReactComp> = ({ onClick, selected, index }) => {
  const onPress = (val: number) => {
    const newObj: any = {};
    newObj[`${index}`] = val;
    onClick && onClick(newObj);
  };
  return (
    <div
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        display: "flex",
      }}
    >
      {REC_ITEMS.map((e, i) => (
        <div
          style={{
            minWidth: "19%",
            marginRight: ".5%",
            marginLeft: ".5%",
          }}
          onClick={() => onClick && onPress(i + 1)}
        >
          <img
            style={styles.reactionImg}
            src={selected === i + 1 ? e[1] : e[0]}
          />
        </div>
      ))}
    </div>
  );
};
function AnswersView() {
  const RenderItem: FC<{ item: any; index: number }> = ({ item, index }) => {
    const DATA: string[] | { head: string; body: string }[] =
      FeedBackQuestions[item];
    const [answers, setAnswers] = useState<any>({});

    const { state } = useLocation();
    console.log(state);
    useEffect(() => {
      state && setAnswers(JSON.parse(state.answers));
    }, [state]);

    return (
      <div
        style={{
          minWidth: (window.innerWidth * 40) / 100,
          marginRight: 20,
          overflowX: "scroll",
          maxHeight: "90%",
        }}
        className="details_box"
      >
        <div
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderColor: "rgba(0, 11, 33, 0.10)",
          }}
        >
          <p>{item} </p>
          <p>
            {"<  "}
            <span style={{ fontSize: 20, color: "#0075FF" }}>{`${index + 1}/ ${
              Object.keys(FeedBackQuestions).length
            }`}</span>
            {"  >"}
          </p>
        </div>
        <div>
          {DATA.map((e, i) => {
            const IsText = typeof e === "string";
            const selectedObj = answers[item];
            const selectedNumber = selectedObj ? selectedObj[`${i + 1}`] : 0;
            return (
              <div key={i + JSON.stringify(e)}>
                {IsText ? (
                  <p>{`${i + 1}.  ${e}`}</p>
                ) : (
                  <>
                    <p>{e.head} </p>
                    <p style={{ marginBottom: 10, fontStyle: "italic" }}>
                      {e.body}
                    </p>
                  </>
                )}
                <ReactionComp index={i + 1} selected={selectedNumber} />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        overflow: "scroll",
        height: "100%",
      }}
    >
      {Object.keys(FeedBackQuestions).map((e, i) => (
        <RenderItem index={i} item={e} key={e + i} />
      ))}
    </div>
  );
}

export default AnswersView;
const styles = {
  itemContainer: {},
  reactionImg: {
    height: 40,
    width: 40,
  },
};
