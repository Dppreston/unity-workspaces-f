function NavigationButtons({
  navMenuContent,
  childTitle,
  handleMenuSubSelection,
}) {
  return (
    <>
      {navMenuContent.map((content) => (
        <button
          className="nav-btn"
          key={content.id}
          value={content.title}
          onClick={(e) => {
            childTitle(e.currentTarget.value);
            handleMenuSubSelection(e);
          }}
        >
          <h3 className="nav-title">{content.title}</h3>
          <i className={content.icon}> </i>
        </button>
      ))}
    </>
  );
}
export default NavigationButtons;
