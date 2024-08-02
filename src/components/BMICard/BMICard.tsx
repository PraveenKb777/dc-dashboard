/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import "./index.css";
import dayjs from "dayjs";
import { TResultsData } from "../DetailsView/DetailsView";

export const BMIItem: FC<{ label: string; value?: any; unit?: string }> = ({
  label,
  value,
  unit,
}) => {
  if (!value) {
    return null;
  }
  return (
    <p className="bmi_card_item">
      {label} <span className="bmi_card_value">: {value}</span> {"  "}{" "}
      <span style={{ fontSize: 10 }}>{unit ? "(" + unit + ")" : null}</span>
    </p>
  );
};

const fetchCategory = (val: number) => {
  let cat;
  if (val < 18.5) {
    cat = "Underweight";
  } else if (val >= 18.5 && val <= 24.9) {
    cat = "Normal";
  } else if (val >= 25 && val <= 29.9) {
    cat = "Pre-obesity";
  } else {
    cat = "Obesity";
  }

  return cat;
};

const findDrfGrade = (val: number) => {
  let cat: string;

  if (val < 30) {
    cat = "Low";
  } else if (val >= 30 && val < 50) {
    cat = "Moderate";
  } else {
    cat = "High";
  }

  return cat;
};
const findBodyGrade = (val: number, gender: string = "male") => {
  let cat: string;

  if (gender === "male") {
    if (val < 0.9) {
      cat = "Low";
    } else if (val >= 0.9 && val < 0.95) {
      cat = "Moderate";
    } else {
      cat = "High Risk";
    }
  } else {
    if (val < 0.8) {
      cat = "Low";
    } else if (val > 0.8 && val < 0.85) {
      cat = "Moderate";
    } else {
      cat = "High Risk";
    }
  }

  return cat;
};

const findModyLevel = (val: number) => {
  let cat: string;

  if (val <= 30) {
    cat = "Low";
  } else if (val >= 31 && val < 61) {
    cat = "Moderate";
  } else {
    cat = "High";
  }

  return cat;
};

const BMICard: FC<{ item: TResultsData; onClick?: () => void }> = ({
  item,
  onClick,
}) => {
  return (
    <div
      onClick={onClick && onClick}
      className="details_box box-shadow"
      style={{ marginBottom: 20, cursor: onClick ? "pointer" : undefined }}
    >
      <div className="bmi_card_top_main">
        <BMIItem label="Name" value={item.name} />
        <BMIItem label="Created By" value={item.user_name} />
        <div style={{ display: "flex" }}>
          {item.gender ? (
            <p className="details_box" style={{ marginRight: 10 }}>
              {item.gender.toLocaleUpperCase()}
            </p>
          ) : null}
          <p className="details_box">
            {dayjs(item.created_at).format("hh:mm a")}
          </p>
        </div>
      </div>
      <div className="bmi_card_seperator" />
      <div className="bmi_card_bottom_main">
        <BMIItem label="Age" value={item.age} />
        {item.age ? <div className="bmi_card_seperator_vertical" /> : null}

        <BMIItem label="Height" value={item.height_cm} unit="cm" />
        <BMIItem label="Waist" value={item.waist_cm} unit="cm" />
        <BMIItem label="Total Energy" value={item.energy_kcal} unit="kacl" />
        <div className="bmi_card_seperator_vertical" />
        <BMIItem label="Carbohydrate" value={item.carbohydrate_g} unit="gm" />
        <BMIItem label="Weight" value={item.weight_kg} unit="kg" />
        <BMIItem label="Hip" value={item.hip_cm} unit="cm" />
        <BMIItem label="DRF Score" value={item.drf_score} />
        <div className="bmi_card_seperator_vertical" />
        <BMIItem label="Protein" value={item.protein_g} unit="gm" />
        {item.mody_score ? null : (
          <BMIItem
            label="Category"
            value={item.bmi_score ? fetchCategory(item.bmi_score) : undefined}
          />
        )}

        <BMIItem label="MODY Score" value={item.mody_score} />
        <BMIItem
          label="Risk level"
          value={
            item.whr_score
              ? findBodyGrade(item.whr_score, item.gender)
              : undefined
          }
        />
        <BMIItem
          label="Risk Level"
          value={item.drf_score ? findDrfGrade(item.drf_score) : item.drf_score}
        />
        {item.drf_score ? null : (
          <div className="bmi_card_seperator_vertical" />
        )}
        <BMIItem label="Fat" value={item.fat_g} unit="gm" />
        {item.fiber_g ? <div className="bmi_card_seperator_vertical" /> : null}
        <BMIItem label="Fiber" value={item.fiber_g} unit="gm" />
        <BMIItem label="BMI Score" value={item.bmi_score} />
        <BMIItem label="WHR Score" value={item.whr_score} />
        {item.mody_score ? (
          <div className="bmi_card_seperator_vertical" />
        ) : null}
        <BMIItem
          label="Risk Level"
          value={item.mody_score ? findModyLevel(item.mody_score) : undefined}
        />
      </div>
    </div>
  );
};

export default BMICard;
