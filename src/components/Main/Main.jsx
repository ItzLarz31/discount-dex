import React, { useState, useRef, useEffect } from "react";

function Main() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  return (
    <main className="main">
      <div className="content">
        <div className="search">
          <form action="" className="form">
            <label className="form__label " htmlFor="form-search">
              Search:
            </label>
            <input
              className="form__input ml-2"
              type="text"
              id="form-search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </form>
        </div>
        <div className="discounts">
          <h2 className="discounts__title">Discounts</h2>
          <ul className="discounts__list">
            <li className="discounts__item">
              <h3 className="">Product 1</h3>
              <p>Description of Product 1</p>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Main;
