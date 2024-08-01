// src/Sidebar.tsx
import React, { useEffect, useRef, useState } from "react";
import "./index.css"; // Add your CSS styles here
import { useSidebar } from "./sideBar";

const MEALS_HEADING = [
  { head: "Early Morning", time: "6 - 7 AM" },
  { head: "Breakfast", time: "8 - 9 AM" },
  { head: "Mid Morning", time: "11 AM" },
  { head: "lunch", time: "1 - 2 PM" },
  { head: "Tea Time", time: "4 - 5 PM" },
  { head: "Dinner", time: "7 - 8 PM" },
  { head: "Bed Time", time: "9 - 10 PM" },
];

const Sidebar: React.FC = () => {
  const { isOpen, closeSidebar, data, load } = useSidebar();
  const [totals, setTotals] = useState({
    energy_kcal: 0,
    carbohydrate_g: 0,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
  });

  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
    let energy_kcal = 0;
    let carbohydrate_g = 0;
    let protein_g = 0;
    let fat_g = 0;
    let fiber_g = 0;

    if (data) {
      for (let i = 0; i <= MEALS_HEADING.length; i++) {
        for (const subItems of data[i] || []) {
          energy_kcal += subItems?.energy_kcal || 0;
          carbohydrate_g += subItems?.carbohydrate_g || 0;
          protein_g += subItems?.protein_g || 0;
          fat_g += subItems?.fat_g || 0;
          fiber_g += subItems?.fiber_g || 0;
        }
      }
    }

    setTotals({
      carbohydrate_g: +parseFloat(carbohydrate_g + "").toFixed(2),
      energy_kcal: +parseFloat(energy_kcal + "").toFixed(2),
      fat_g: +parseFloat(fat_g + "").toFixed(2),
      fiber_g: +parseFloat(fiber_g + "").toFixed(2),
      protein_g: +parseFloat(protein_g + "").toFixed(2),
    });
  }, [data]);

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeSidebar} />}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <button onClick={closeSidebar} className="close-btn">
          X
        </button>
        {load ? (
          <div className="center-sidebar">Loading...</div>
        ) : data === undefined ? (
          <div className="center-sidebar">No Data</div>
        ) : (
          <div className="side-bar-main" ref={divRef}>
            <div style={{ flex: 1, backgroundColor: "#fff" }}>
              <div style={{ padding: 16 }}>
                {MEALS_HEADING.map((e, i) => {
                  return (
                    <div
                      key={e.head + i}
                      style={{
                        borderWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.20)",
                        borderRadius: 5,
                        marginTop: 5,
                        marginBottom: 5,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              backgroundColor: "#000",
                              textAlign: "center",
                              height: 40,
                              width: 40,
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "#fff",
                              alignContent: "center",
                              borderRadius: 100,
                            }}
                          >
                            {i + 1}
                          </p>
                          <p
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "#000",
                              marginLeft: 16,
                            }}
                          >
                            {e.head}
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <p
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              color: "#000",
                              padding: 5,
                              borderWidth: 1,
                              borderColor: "#9D9D9D",
                              textAlign: "center",
                              marginRight: 10,
                              width: 80,
                              borderStyle: "solid",
                            }}
                          >
                            {e.time}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          height: 1,
                          width: "100%",
                          marginTop: 10,
                          backgroundColor: "rgba(0, 0, 0, 0.20)",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            color: "#000",
                            width: "40%",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Items
                        </p>
                        <div
                          style={{
                            color: "#000",
                            width: "30%",
                            fontSize: 16,
                            fontWeight: "bold",
                          }}
                        >
                          Qty
                        </div>
                        <div
                          style={{
                            color: "#000",
                            width: "30%",
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "right",
                          }}
                        >
                          Kcal
                        </div>
                      </div>
                      {data
                        ? data[i].map((foodItem) =>
                            foodItem ? (
                              <div
                                key={foodItem.id + "list items"}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    width: "40%",
                                  }}
                                >
                                  {foodItem.name}
                                </p>
                                <p
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    width: "30%",
                                    textAlign: "left",
                                  }}
                                >
                                  {foodItem.qty}
                                </p>
                                <p
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    width: "30%",
                                    textAlign: "right",
                                  }}
                                >
                                  {foodItem.energy_kcal}
                                </p>
                              </div>
                            ) : null
                          )
                        : null}
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  borderWidth: 1,
                  borderColor: "rgba(0, 0, 0, 0.20)",
                  borderRadius: 5,
                  marginTop: 5,
                  marginBottom: 5,
                  padding: 16,
                  margin: 16,
                }}
              >
                <p
                  style={{
                    color: "#000",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  Total Nutritional Content
                </p>
                <div
                  style={{
                    height: 1,
                    width: "100%",
                    marginTop: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.20)",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      width: "40%",
                      color: "#000",
                    }}
                  >
                    Energy
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",

                      textAlign: "right",
                    }}
                  >
                    {totals.energy_kcal} Kacl
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      width: "40%",
                      color: "#000",
                    }}
                  >
                    Carbohydrate
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",

                      textAlign: "right",
                    }}
                  >
                    {totals.carbohydrate_g} gm
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      width: "40%",
                      color: "#000",
                    }}
                  >
                    Protein
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",

                      textAlign: "right",
                    }}
                  >
                    {totals.protein_g} gm
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      width: "40%",
                      color: "#000",
                    }}
                  >
                    Total fat
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",

                      textAlign: "right",
                    }}
                  >
                    {totals.fat_g} gm
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      width: "40%",
                      color: "#000",
                    }}
                  >
                    Total fiber
                  </p>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",

                      textAlign: "right",
                    }}
                  >
                    {totals.fiber_g} gm
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
