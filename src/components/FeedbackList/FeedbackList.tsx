 
import { useEffect, useState } from "react";
import auth from "../../util/auth";

import customParse from "dayjs/plugin/customParseFormat";

import dayjs from "dayjs";
import { SingleArrow } from "../../assets/SVG";
import {
  IRestData,
  RenderPagenattion,
  TOrderBy,
} from "../DetailsView/DetailsView";
import { BMIItem } from "../BMICard/BMICard";
import { Link } from "react-router-dom";
dayjs.extend(customParse);

interface IFeedbackResults {
  id: string;
  answers: '{"User Interaction":{"1":1,"2":3,"3":2,"4":4,"5":5},"Accessibility":{"1":3,"2":2,"3":4,"4":2},"Design":{"1":1,"2":4,"3":2},"Information Quality":{"1":4,"2":2,"3":3,"4":3,"5":3,"6":5,"7":5},"Subjective quality Assessment":{"1":3,"2":2,"3":3,"4":5},"Application-specific questions":{"1":5,"2":3,"3":2,"4":1,"5":5,"6":5}}';
  created_at: Date;
  user_name: string;
  user_age: number;
  user_email: string;
  user_gender: string;
  feedback_id: string;
}

interface IFeedbacResponse extends IRestData {
  result: IFeedbackResults[];
}

const FeedbackList = () => {
  const [order_by, setOrder_by] = useState<TOrderBy>("desc");
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [page, setPage] = useState(1);
  const [resultData, setResultData] = useState<IRestData>();
  const [list, setList] = useState<IFeedbackResults[]>([]);
  useEffect(() => {
    getFeedBack();
  }, []);
  const getFeedBack = async () => {
    const res = await auth.get<IFeedbacResponse>("/admin/feedback");
    const {
      count,
      currentPage,
      nextPage,
      prevPage,
      result,
      total,
      totalPages,
    } = await res.data;
    setResultData({
      count,
      currentPage,
      nextPage,
      prevPage,
      total,
      totalPages,
    });
    setList(result);
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <div
        className="details_view_header_main details_box box-shadow"
        style={{ marginBottom: 20 }}
      >
        <p className="details_view_header_heading">{""}</p>
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
        </div>
      </div>
      <div className="details_view_items_main_cont feed_back_list_cont">
        {list.map((e) => {
          return (
            <div
              className="details_box feedback_item_cont box-shadow"
              key={e.id}
            >
              <div className="feed_back_item_variables">
                <BMIItem label={"Name"} value={e.user_name} />
                <div style={{ height: 10 }} />
                <BMIItem label={"Age"} value={e.user_age} />
                <div style={{ height: 10 }} />
                <BMIItem label={"Email"} value={e.user_email} />
              </div>
              <div className="feed_back_item_gender_know_more_cont">
                <div className="details_box">
                  <p>{e.user_gender.toLocaleUpperCase()}</p>
                </div>
                <div style={{ height: 10 }} />
                <Link to={"answers"} state={{ answers: e.answers }}>
                  <div className="details_box feed_back_view_more_cont">
                    <p>View more</p>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
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

export default FeedbackList;
