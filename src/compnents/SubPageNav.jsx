function SubPageNav({ subNavContent, childNav }) {
  return (
    <>
      <div className="sub-nav-cont">
        {subNavContent?.map((buttons) => (
          <button
            className="sub-nav-btn alt-nav-buttons"
            key={buttons.id}
            onClick={(e) => {
              childNav(buttons.title);
            }}
          >
            {buttons.title}
          </button>
        ))}
      </div>
    </>
  );
}
export default SubPageNav;
