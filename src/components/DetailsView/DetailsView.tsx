import dayjs from "dayjs";
import customParse from "dayjs/plugin/customParseFormat";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { SingleArrow, TripleArrow } from "../../assets/SVG";
import auth from "../../util/auth";
import BMICard from "../BMICard/BMICard";
import "./index.css";
import { useSidebar } from "../../context/sideBar";
export type TBMIResData = {
  name: string;
  height_cm: number;
  weight_kg: number;
  bmi_score: number;
  created_at: Date;
  user_name: string;
  bmi_data_id: string;
};

export type TWHRResData = {
  id: string;
  name: string;
  waist_cm: number;
  hip_cm: number;
  whr_score: number;
  gender: string;
  created_at: Date;
  user_name: string;
  whr_data_id: string;
};

export type TMODYResData = {
  id: string;
  name: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  bmi_score: number;
  family_history: number;
  parent_history: number;
  hba1c: number;
  auto_anitbodie: number;
  ketoacidosis: number;
  mody_score: number;
  complications: number;
  created_at: Date;
  user_name: string;
  mody_data_id: string;
};

export type TDRFResData = {
  id: string;
  name: string;
  age: number;
  gender: string;
  waist_cm: number;
  physical_activity: number;
  family_history: number;
  drf_score: number;
  created_at: Date;
  user_name: string;
  drf_data_id: string;
};

export type TCMPResData = {
  carbohydrate_g: number;
  created_at: Date;
  energy_kcal: number;
  fat_g: number;
  fiber_g: number;
  cmp_data_id: string;
  protein_g: number;
};
export interface IRestData {
  count: number;
  total: number;
  currentPage: number;
  nextPage: null | number;
  prevPage: null | number;
  totalPages: number;
}
export interface IYADRResults {
  id: string;
  name: string;
  age: number;
  bmi: number; // Body Mass Index
  whr: number; // Waist-Hip Ratio
  generation_diabetes: number; // No family history / Either parent / Both parents
  parent_diabetes: number; // Possibly binary (0/1) if a parent has diabetes
  random_blood_glucose: number; // mg/dL
  bp_sys: number; // Systolic BP
  bp_dia: number; // Diastolic BP
  physical_activity: number; // Coded from score table
  yadr_score: number; // Final calculated score
  created_at: string; // ISO date string
}

export type TResultsData = TBMIResData &
  TWHRResData &
  TMODYResData &
  TDRFResData &
  TCMPResData&IYADRResults

interface IResponseData extends IRestData {
  success: boolean;
  result: TResultsData[];
}

export const PagenationItem: FC<{
  value: string | number;
  isArrow?: boolean;
  isSelected?: boolean;
  onClick?: (page: number) => void;
}> = ({ value, isArrow = false, isSelected = false, onClick }) => {
  return (
    <div className="pagenation_item_main">
      {isArrow ? <SingleArrow style={{ marginLeft: 10 }} /> : null}
      <div
        style={{
          background: isSelected ? "#fff" : "transparent",
          aspectRatio: 1,
          width: 30,
          fontSize: 16,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          borderRadius: 5,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#fff",
          color: isSelected ? "#000" : "#fff",
          marginLeft: 10,
          cursor: "pointer",
          transition: "all .5s",
        }}
        onClick={() => onClick && onClick(Number(value))}
      >
        <p>{value}</p>
      </div>
    </div>
  );
};

export const RenderPagenattion: FC<{
  total: number;
  max?: number;
  onClick?: (page: number) => void;
  curPage?: number;
}> = ({ total, max = 8, onClick, curPage = 0 }) => {
  const itemsList: ReactNode[] = [];

  if (total <= max) {
    Array(total)
      .fill(0)
      .map((_, i) => {
        itemsList.push(
          <PagenationItem
            value={i + 1}
            key={i}
            isArrow={i !== 0}
            onClick={onClick}
            isSelected={curPage === i + 1}
          />
        );
      });
  }

  if (total > max) {
    Array(7)
      .fill(0)
      .map((_, i) => {
        itemsList.push(
          <PagenationItem
            key={i}
            value={i + 1}
            isArrow={i !== 0}
            onClick={onClick}
            isSelected={curPage === i + 1}
          />
        );
      });
    if (curPage > 7) {
      itemsList.push(<TripleArrow style={{ marginLeft: 10 }} />);
      itemsList.push(
        <PagenationItem value={curPage} onClick={onClick} isSelected />
      );
    }
    itemsList.push(<TripleArrow style={{ marginLeft: 10 }} />);
    itemsList.push(
      <PagenationItem
        value={total}
        onClick={onClick}
        isSelected={curPage === total}
      />
    );
  }

  return itemsList;
};

dayjs.extend(customParse);
export type TOrderBy = "desc" | "asc";
type TRoute = "bmi" | "whr" | "mody" | "drf" | "cmp";
const DetailsView = () => {
  const [order_by, setOrder_by] = useState<TOrderBy>("desc");
  const [route, setRoute] = useState<TRoute>("bmi");
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [page, setPage] = useState(1);
  const [list, setList] = useState<TResultsData[]>([]);
  const [resultData, setResultData] = useState<IRestData>();
  const { openSidebar } = useSidebar();
  const fetchData = useCallback(async () => {
    try {
      const url = `/admin/${route}?limit=20&order_by=${order_by}&page=${page}&date=${date}`;
      const res = await auth.get<IResponseData>(url);
      const {
        count,
        currentPage,
        nextPage,
        prevPage,
        result,
        total,
        totalPages,
      } = await res.data;
      setList(result);
      console.log(result);
      setResultData({
        count,
        currentPage,
        nextPage,
        prevPage,
        total,
        totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  }, [date, order_by, page, route]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearState = () => {
    setOrder_by("desc");
    setPage(1);
    setDate(dayjs().format("DD/MM/YYYY"));
  };

  useEffect(() => {
    clearState();
  }, [route]);

  return (
    <div className="details_view_main_cont">
      <div
        className="details_view_header_main details_box box-shadow"
        style={{ marginBottom: 20 }}
      >
        <p className="details_view_header_heading">{route.toUpperCase()}</p>
        <div className="details_view_header_right_main">
          <input
            type="date"
            className="details_box"
            style={{ marginRight: 10 }}
            onChange={(e) =>
              setDate(dayjs(e.target.value).format("DD/MM/YYYY"))
            }
            max={dayjs().format("YYYY-MM-DD")}
            value={dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD")}
          />
          <select
            name="orderBy"
            value={order_by}
            onChange={(e) => setOrder_by(e.target.value as TOrderBy)}
            id="order_by"
            style={{ marginRight: 10 }}
            className="details_box"
          >
            <option value="desc">Ascending</option>
            <option value="asc">Decending</option>
          </select>
          <select
            name="route_with"
            value={route}
            onChange={(e) => setRoute(e.target.value as TRoute)}
            id="route_with"
            style={{ marginRight: 10 }}
            className="details_box"
          >
            <option value="bmi">BMI</option>
            <option value="whr">WHR</option>
            <option value="mody">MODY</option>
            <option value="drf">DRF</option>
            <option value="cmp">CMP</option>
            <option value="yadr">YADR</option>
          </select>
          <CSVLink
            className="details_box download_btn"
            data={list}
            target="_blank"
            filename={`${Date.now()}`}
          >
            DownloadMe
          </CSVLink>
        </div>
      </div>
      <div className="details_view_items_main_cont">
        {list.map((e) => (
          <BMICard
            item={e}
            onClick={
              e.cmp_data_id ? () => openSidebar(e.cmp_data_id) : undefined
            }
            key={
              e.bmi_data_id ||
              e.mody_data_id ||
              e.drf_data_id ||
              e.whr_data_id ||
              e.cmp_data_id
            }
          />
        ))}
      </div>
      {resultData?.totalPages ? (
        <div className="details_view-pagenation-main">
          <div className="details_view_pagenation">
            <RenderPagenattion
              total={resultData?.totalPages || 0}
              onClick={setPage}
              curPage={page}
            />
          </div>
          <div className="pagenation_next_prev_main">
            {resultData.prevPage && (
              <div
                className="pagenation_arrow_cont pagenationRotate"
                onClick={() => setPage((e) => e - 1)}
              >
                <SingleArrow fill="black" id="indiv" width={30} height={30} />
              </div>
            )}
            {resultData.nextPage ? (
              <div
                className="pagenation_arrow_cont"
                onClick={() => setPage((e) => e + 1)}
              >
                <SingleArrow fill="black" id="indiv" width={30} height={30} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default DetailsView;
