import { useState } from "react";

const Navigator = ({ filterByHero, sortByBudget, sortByCollection }) => {
  const [mark, setMark] = useState("");
  const [budget, setBudget] = useState("");
  const [collection, setCollection] = useState("");

  const markLabel = (event) => {
    const selected = event.target.id;
    const newMark = mark === selected ? "" : selected;
    setMark(newMark);
    filterByHero(newMark);
  };

  const changeBudget = (event) => {
    const selected = event.target.id;
    const newBudget = budget === selected ? "" : selected;
    setBudget(newBudget);
    sortByBudget(newBudget);
  };

  const changeCollection = (event) => {
    const selected = event.target.id;
    const newCollection = collection === selected ? "" : selected;
    setCollection(newCollection);
    sortByCollection(newCollection);
  };

  return (
    <>
      <h3>All Filters</h3>
      <hr />
      <h3>Filter by Hero</h3>
      <div className="heroesFilterContainer">
        {[
          ["ironMan", "Iron Man"],
          ["cap", "Captain America"],
          ["thor", "Thor"],
          ["hulk", "Hulk"],
          ["spider", "Spider Man"],
          ["strange", "Dr.Strange"],
          ["avengers", "Avengers"],
          ["panther", "Black Panther"],
          ["galaxy", "Guardians"],
          ["widow", "Black Widow"],
          ["Ant", "Ant Man"],
          ["capM", "Captain Marvel"],
          ["shi", "Shang-shi"],
          ["eternals", "Eternals"]
        ].map(([id, label]) => (
          <div className="FilterBox" key={id}>
            <input type="radio" id={id} onClick={markLabel} checked={mark === id} />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>

      <h3>Sort By Budget</h3>
      <div className="heroesFilterContainer">
        <div className="FilterBox">
          <input type="radio" id="high" onClick={changeBudget} checked={budget === "high"} />
          <label htmlFor="high">High to Low</label>
        </div>
        <div className="FilterBox">
          <input type="radio" id="low" onClick={changeBudget} checked={budget === "low"} />
          <label htmlFor="low">Low to High</label>
        </div>
      </div>

      <h3>Sort By Collections</h3>
      <div className="heroesFilterContainer">
        <div className="FilterBox">
          <input type="radio" id="high1" onClick={changeCollection} checked={collection === "high1"} />
          <label htmlFor="high1">High to Low</label>
        </div>
        <div className="FilterBox">
          <input type="radio" id="low1" onClick={changeCollection} checked={collection === "low1"} />
          <label htmlFor="low1">Low to High</label>
        </div>
      </div>
    </>
  );
};

export default Navigator;
