import React, { useEffect } from "react";
import ResponsiveDrawer from "./Bars/ResponsiveDrawer";
function Home() {
  let loadData = async () => {
    let token = sessionStorage.setItem("token", "");
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <div className="home-sidebar">
        <aside>
          <ResponsiveDrawer />
        </aside>
      </div>
    </>
  );
}

export default Home;
