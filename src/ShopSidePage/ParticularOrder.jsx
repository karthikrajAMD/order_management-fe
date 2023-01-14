import React, { useContext } from "react";
import SidebarDashboard from "../Bars/SidebarDashboard";
import { Context } from "../Context";
function ParticularOrder(list) {
  console.log(list);
  console.log({ list });
  const [sideShow, setSideShow] = useContext(Context);
  const name = "Orders";
  return (
    <main className={sideShow ? "space-toggle" : null}>
      <SidebarDashboard name={name} role={"admin"} />
    </main>
  );
}

export default ParticularOrder;
