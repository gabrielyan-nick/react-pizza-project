import { useState, useRef, useEffect, memo } from "react";
import { CSSTransition } from "react-transition-group";
import "../Sort/sort.scss";

const Sort = memo(function Sort({ items, onSelectSort, activeSortType }) {
  const [isOpen, setOpen] = useState(false);
  const nodeRef = useRef(null);
  const sortRef = useRef(null);
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  function handleClick(e) {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(sortRef.current)) {
      setOpen(false);
    }
  }

  function onSelectSortItem(item) {
    onSelectSort(item);
    setOpen(false);
  }

  function openPopup() {
    setOpen((isOpen) => !isOpen);
  }

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label" onClick={openPopup}>
        <svg
          style={{
            transform: `rotate(${isOpen ? 0 : 180}deg)`,
            transition: "all .3s",
          }}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{activeLabel}</span>
      </div>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="sort__popup"
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        <div ref={nodeRef} className="sort__popup">
          <ul>
            {items &&
              items.map((item, i) => {
                return (
                  <li
                    key={i}
                    className={`${item.name === activeLabel ? "active" : ""}`}
                    onClick={() => onSelectSortItem(item.type)}
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </div>
      </CSSTransition>
    </div>
  );
});

export default Sort;
