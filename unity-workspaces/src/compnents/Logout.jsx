function Logout() {
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location = "/";
  };
  return (
    <>
      <div className="dash-content-wrapper logout">
        <h2>Are you sure you would like to logout?</h2>
        <button className="logout-btn btn-style" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
export default Logout;
