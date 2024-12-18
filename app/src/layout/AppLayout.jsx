import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/shared/app/Navbar"
import Sidebar from "../components/shared/app/Sidebar"
import Drawer from "../components/shared/Drawer"
import { useSelector } from "react-redux"
import ReviewBox from "../components/shared/ReviewBox"
import SDK from "../SDK"

const AppLayout = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { currentProfileId } = useSelector((state) => state.settings);
  const { currentProfileReviews } = useSelector((state) => state.review);

  const handleNewClick = (setIsOpen) => {
    setIsOpen(false);
    console.log("Fai qualcosa per creare la recensione");
    // await SDK.profile.createReview(currentProfileId, { rating: 5, content: "La mia recensione di oggi" }, token);
  }

  if (location.pathname == "/app/chat") {
    return (
      <main>
        <Outlet />
      </main>
    )
  }

  return (
    <>
      <Sidebar navbar={<Navbar />}>
        <main className="flex justify-center dark:bg-bg_dark max-xl:mb-14">
          <Outlet />
          { /* Drawer Review */ }
          <Drawer type="review" showNewBtn={true} onNewClick={handleNewClick}>
              {
                currentProfileReviews.length > 0 && currentProfileReviews.map(review => (
                  <ReviewBox key={review._id} review={review} />
                ))
              }
          </Drawer>
        </main>
      </Sidebar>
    </>
  )
}

export default AppLayout